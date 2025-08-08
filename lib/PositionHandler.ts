import { Heading, Schedule, Train } from "./Schedule";
import { serverLog } from "./ServerLogger";
import { getStationCoords, LOCAL_STATIONS, StationName } from "./Stations";

export class PositionHandler {
    private static readonly RADIUS_AT_STATION_MILES = 0.25;
    private static readonly RADIUS_NEAR_STATION_MILES = 0.75;

    private static instance: PositionHandler | null = null;
    private positionListener: ((positionHandler: PositionHandler) => void) | null = null;
    private trainListener: ((train: string) => void) | null = null;
    private nextStationListener: ((nextStation: { name: StationName, eta: string } | null) => void) | null = null;

    private lastKnownPosition: GeolocationPosition | null;
    private lastKnownStation: StationName | null = null;
    private closestStation: { name: StationName; distance: number } | null = null;
    private train: Train | null = null;

    constructor() {
        serverLog("PositionHandler initialized");

        this.lastKnownPosition = null;

        const success = this.updateSuccess.bind(this);
        const error = this.updateError.bind(this);
        const options = { enableHighAccuracy: true };
        navigator.geolocation.watchPosition(success, error, options);
    }

    public static getInstance(): PositionHandler {
        if (PositionHandler.instance === null) {
            PositionHandler.instance = new PositionHandler();
        }
        return PositionHandler.instance;
    }

    public getLastKnownPosition(): GeolocationPosition | null {
        return this.lastKnownPosition;
    }

    public getClosestStation(): { name: StationName; distance: number } | null {
        return this.closestStation;
    }

    public setPositionListener(listener: ((positionHandler: PositionHandler) => void) | null) {
        this.positionListener = listener;
    }

    public setTrainListener(listener: ((train: string) => void) | null) {
        this.trainListener = listener;
    }

    public setNextStationListener(listener: ((nextStation: { name: StationName, eta: string } | null) => void) | null) {
        this.nextStationListener = listener;
    }

    private updateClosestStation() {
        if (!this.lastKnownPosition) {
            console.warn("No last known position available.");
            return;
        }
        const userCoords = this.lastKnownPosition.coords;
        let minDistance = Infinity;
        let closestStation: StationName = StationName.SAN_FRANCISCO;
        for (const stationName of LOCAL_STATIONS) {
            const stationCoords = getStationCoords(stationName);
            const distance = this.distance(userCoords.latitude, userCoords.longitude, stationCoords.latitude, stationCoords.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                closestStation = stationName;
            }
        }
        serverLog(`Closest station is ${closestStation} at a distance of ${minDistance} miles`);
        this.closestStation = { name: closestStation, distance: minDistance };
    }

    private updateTrain() {
        if (!this.lastKnownPosition || !this.closestStation)
            return;
        const closestStation = this.closestStation.name;
        const distance = this.closestStation.distance;
        if (distance < PositionHandler.RADIUS_AT_STATION_MILES) {
            serverLog(`You are at the ${closestStation} station.`);
            this.lastKnownStation = closestStation;
        } else if (distance < PositionHandler.RADIUS_NEAR_STATION_MILES && this.lastKnownStation === closestStation) {
            // At one point, the user was at this station, but now they are further away
            // So they are likely on a train departing from this station
            serverLog(`You are on a train departing from ${closestStation}.`);
            const oldLat = getStationCoords(this.lastKnownStation).latitude;
            const newLat = this.lastKnownPosition.coords.latitude;
            const heading = this.getHeading(oldLat, newLat);
            const timeUnix = this.lastKnownPosition.timestamp;
            const timeHHMM = this.unixTimestampToHHMM(timeUnix);
            const train = Schedule.getTrainByDepartTimeAndHeading(timeHHMM, closestStation, heading);
            if (train) {
                this.train = train;
            }
            if (train && this.trainListener) {
                this.trainListener(train.toString());
                serverLog(train.toString());
            }
        } else if (distance < PositionHandler.RADIUS_NEAR_STATION_MILES && this.lastKnownStation !== closestStation) {
            // The user is close to a station, but not at the one they were last known to be at
            // So they are likely on a train arriving at this station
            serverLog(`You are likely on a train arriving at ${closestStation}.`);
        }
    }

    private updateNextStation() {
        if (!this.nextStationListener)
            return;
        if (!this.lastKnownStation || !this.train) {
            this.nextStationListener(null);
            return;
        }
        const nextStationName = this.train.getNextStation(this.lastKnownStation);
        if (!nextStationName) {
            this.nextStationListener(null);
            return;
        }
        const nextStationEta = this.train.getExpectedArrivalTime(nextStationName);
        if (!nextStationEta) {
            throw new Error(`No ETA found for ${this.train.toString()} ${nextStationName}`);
        }
        const nextStationEtaDisplayable = this.hhmmToDisplayTime(nextStationEta);
        this.nextStationListener({ name: nextStationName, eta: nextStationEtaDisplayable });
    }

    private updateSuccess(position: GeolocationPosition) {
        serverLog(`Position updated: ${position.coords.latitude}, ${position.coords.longitude} at ${new Date(position.timestamp).toLocaleTimeString()} (${position.timestamp})`);
        this.lastKnownPosition = position;
        this.updateClosestStation();
        this.updateTrain();
        this.updateNextStation();
        if (this.positionListener) {
            this.positionListener(this);
        }
    }

    private updateError(error: GeolocationPositionError) {
        console.warn("Geolocation error:", error);
        if (this.positionListener) {
            this.positionListener(this);
        }
    }

    /**
    * Calculates the distance between two latitude/longitude points using the Haversine formula.
    * @param lat1 Latitude of the first point
    * @param lon1 Longitude of the first point
    * @param lat2 Latitude of the second point
    * @param lon2 Longitude of the second point
    * @returns Distance in miles
    */
    private distance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 3958.8; // Radius of the earth in miles
        // Convert latitude and longitude differences from degrees to radians
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);

        // Apply the Haversine formula
        const a = Math.sin(dLat / 2) ** 2
            + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2))
            * Math.sin(dLon / 2) ** 2;

        // Calculate the angular distance in radians
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Multiply by Earth's radius to get the distance in miles
        const distance = R * c;
        return distance;
    }

    /**
     * Converts degrees to radians.
     * @param deg Value in degrees
     * @returns Value in radians
     */
    private deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }

    /**
     * Converts a UNIX timestamp to a HH:MM string in Pacific Time.
     * @param timestamp UNIX timestamp in milliseconds
     */
    private unixTimestampToHHMM(timestamp: number): string {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            timeZone: "America/Los_Angeles",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };
        return date.toLocaleTimeString("en-US", options);
    }

    /**
     * Converts a time string from HH:MM format to a display-friendly format.
     * For example, "14:30" becomes "2:30pm" and "00:02" becomes "12:02am".
     * @param time Time in HH:MM format
     * @returns Display-friendly time string
     */
    private hhmmToDisplayTime(time: string): string {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours < 12 ? "am" : "pm";
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes}${period}`;
    }

    /**
     * Calculates the user's heading based on their last known positions.
     * @param lat1 Latitude of the first (old) position
     * @param lat2 Latitude of the second (new) position
     * @returns The user's heading (NORTH or SOUTH)
     */
    private getHeading(lat1: number, lat2: number): Heading {
        // Just need to know if they're going north or south
        if (lat2 > lat1) {
            return Heading.NORTH;
        } else {
            return Heading.SOUTH;
        }
    }
}
