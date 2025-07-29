import { getStationCoords, StationName, WEEKDAY_STATIONS } from "./Stations";

export class PositionHandler {
    private static instance: PositionHandler | null = null;
    private positionListener: ((positionHandler: PositionHandler) => void) | null = null;

    private lastKnownPosition: GeolocationPosition | null;
    private closestStation: { name: StationName; distance: number } | null = null;

    constructor() {
        console.log("PositionHandler initialized");

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

    public setPositionListener(listener: ((positionHandler: PositionHandler) => void) | null) {
        this.positionListener = listener;
    }

    public getLastKnownPosition(): GeolocationPosition | null {
        return this.lastKnownPosition;
    }

    public getClosestStation(): { name: StationName; distance: number } | null {
        return this.closestStation;
    }

    private updateClosestStation() {
        if (!this.lastKnownPosition) {
            console.warn("No last known position available.");
            return;
        }
        const userCoords = this.lastKnownPosition.coords;
        let minDistance = Infinity;
        let closestStation: StationName = StationName.SAN_FRANCISCO;
        for (const stationName of WEEKDAY_STATIONS) {
            const stationCoords = getStationCoords(stationName);
            const distance = this.distance(userCoords.latitude, userCoords.longitude, stationCoords.latitude, stationCoords.longitude);
            console.log(`Distance from ${stationName} is ${distance} miles`);
            if (distance < minDistance) {
                minDistance = distance;
                closestStation = stationName;
            }
        }
        console.log(`Closest station is ${closestStation} at a distance of ${minDistance} miles`);
        this.closestStation = { name: closestStation, distance: minDistance };
    }

    private updateSuccess(position: GeolocationPosition) {
        console.log(`Position updated: ${position.coords.latitude}, ${position.coords.longitude} at ${new Date(position.timestamp).toLocaleTimeString()} (${position.timestamp})`);
        this.lastKnownPosition = position;
        this.updateClosestStation();
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
}
