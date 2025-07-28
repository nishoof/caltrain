export class PositionHandler {
    private static instance: PositionHandler | null = null;
    private lastKnownPosition: GeolocationPosition | null;
    private positionListener: ((cityName: string) => void) | null = null;

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

    public getLastKnownPosition(): GeolocationPosition | null {
        return this.lastKnownPosition;
    }

    public setPositionListener(listener: (cityName: string) => void) {
        this.positionListener = listener;
    }

    private updateSuccess(position: GeolocationPosition) {
        console.log(position.toJSON());
        this.lastKnownPosition = position;
        if (this.positionListener) {
            const cityName = position.coords.latitude + ", " + position.coords.longitude; // TODO: actual city name logic
            this.positionListener(cityName);
            console.log(`City name updated: ${cityName}`);
        }
    }

    private updateError(error: GeolocationPositionError) {
        console.error("Geolocation error:", error);
        if (this.positionListener) {
            this.positionListener("Unknown location");
        }
    }
}
