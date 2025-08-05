import { StationName } from "./Stations";

const NO_TIME = null;

export enum Heading {
    NORTH = 1,
    SOUTH = -1
}

class Train {
    private static readonly NUM_STATIONS = 29;
    private static readonly STATION_NAME_TO_INDEX: { [K in StationName]: number } = {
        "San Francisco": 0,
        "22nd Street": 1,
        "Bayshore": 2,
        "South San Francisco": 3,
        "San Bruno": 4,
        "Millbrae": 5,
        "Broadway": 6,
        "Burlingame": 7,
        "San Mateo": 8,
        "Hayward Park": 9,
        "Hillsdale": 10,
        "Belmont": 11,
        "San Carlos": 12,
        "Redwood City": 13,
        "Menlo Park": 14,
        "Palo Alto": 15,
        "Stanford": 16,
        "California Avenue": 17,
        "San Antonio": 18,
        "Mountain View": 19,
        "Sunnyvale": 20,
        "Lawrence": 21,
        "Santa Clara": 22,
        "College Park": 23,
        "San Jose Diridon": 24,
        "Tamien": 25,
        "Capitol": 26,
        "Blossom Hill": 27,
        "Morgan Hill": 28,
        "San Martin": 29,
        "Gilroy": 30
    }

    private number: number;
    private expectedTimes: (string | typeof NO_TIME)[];

    constructor(num: number, times: (string | typeof NO_TIME)[]) {
        if (times.length !== Train.NUM_STATIONS)
            throw new Error("Invalid number of times");
        this.number = num;
        this.expectedTimes = times;
    }

    public getNumber(): number {
        return this.number;
    }

    public getHeading(): Heading {
        if (this.number % 2 === 0) {
            return Heading.SOUTH;
        } else {
            return Heading.NORTH;
        }
    }

    public getExpectedArrivalTime(stationName: StationName): string | typeof NO_TIME {
        const index = Train.STATION_NAME_TO_INDEX[stationName];
        return this.expectedTimes[index];
    }

    public toString(): string {
        return `Train ${this.number}`;
    }
}

export class Schedule {
    private static readonly trains: Train[] = [
        // NORTHBOUND
        new Train(101, ["06:01", "05:55", "05:50", "05:45", "05:42", "05:39", "05:35", "05:32", "05:30", "05:27", "05:24", "05:22", "05:18", "05:13", "05:10", "05:07", "05:04", "05:01", "04:57", "04:54", "04:49", NO_TIME, "04:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(103, ["06:26", "06:20", "06:15", "06:10", "06:07", "06:04", "06:00", "05:57", "05:55", "05:52", "05:49", "05:47", "05:43", "05:38", "05:35", "05:32", "05:29", "05:26", "05:22", "05:19", "05:14", NO_TIME, "05:08", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(401, ["06:53", "06:47", NO_TIME, "06:39", NO_TIME, "06:33", NO_TIME, "06:28", NO_TIME, "06:25", NO_TIME, NO_TIME, NO_TIME, "06:18", "06:13", "06:10", "06:07", "06:04", "06:01", "05:57", "05:54", NO_TIME, "05:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(105, ["07:16", "07:10", "07:05", "07:00", "06:57", "06:54", "06:50", "06:47", "06:45", "06:42", "06:39", "06:37", "06:33", "06:28", "06:25", "06:22", "06:19", "06:16", "06:12", "06:09", "06:04", NO_TIME, "05:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(503, ["07:22", "07:16", NO_TIME, "07:09", NO_TIME, "07:04", NO_TIME, "06:59", NO_TIME, "06:56", NO_TIME, NO_TIME, "06:49", NO_TIME, "06:43", NO_TIME, NO_TIME, NO_TIME, "06:36", "06:32", NO_TIME, NO_TIME, "06:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(107, ["07:46", "07:40", "07:35", "07:30", "07:27", "07:24", "07:20", "07:17", "07:15", "07:12", "07:09", "07:07", "07:03", "06:58", "06:55", "06:52", "06:49", "06:46", "06:42", "06:39", "06:34", NO_TIME, "06:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(805, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "06:40", "06:35", "06:29", "06:23", "06:10", "06:04", "05:52"]),
        new Train(405, ["07:53", "07:47", NO_TIME, "07:39", NO_TIME, "07:33", NO_TIME, "07:28", NO_TIME, "07:25", NO_TIME, NO_TIME, "07:18", "07:13", "07:10", "07:07", "07:04", "07:01", "06:57", "06:54", "06:49", NO_TIME, "06:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(109, ["08:16", "08:10", "08:05", "08:00", "07:57", "07:54", "07:50", "07:47", "07:45", "07:42", "07:39", "07:37", "07:33", "07:28", "07:25", "07:22", "07:19", "07:16", "07:12", "07:09", "07:04", NO_TIME, "06:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(807, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "07:19", "07:14", "07:08", "07:02", "06:49", "06:43", "06:31"]),
        new Train(507, ["08:22", "08:16", NO_TIME, "08:09", NO_TIME, "08:04", NO_TIME, "07:59", NO_TIME, "07:56", NO_TIME, NO_TIME, "07:49", NO_TIME, "07:43", NO_TIME, NO_TIME, NO_TIME, "07:36", "07:32", NO_TIME, NO_TIME, "07:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(111, ["08:46", "08:40", "08:35", "08:30", "08:27", "08:24", "08:20", "08:17", "08:15", "08:12", "08:09", "08:07", "08:03", "07:58", "07:55", "07:52", "07:49", "07:46", "07:42", "07:39", "07:34", NO_TIME, "07:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(809, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "07:40", "07:35", "07:29", "07:23", "07:10", "07:04", "06:52"]),
        new Train(409, ["08:53", "08:47", NO_TIME, "08:39", NO_TIME, "08:33", NO_TIME, "08:28", NO_TIME, "08:25", NO_TIME, NO_TIME, "08:18", "08:13", "08:10", "08:07", "08:04", "08:01", "07:57", "07:54", "07:49", NO_TIME, "07:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(113, ["09:16", "09:10", "09:05", "09:00", "08:57", "08:54", "08:50", "08:47", "08:45", "08:43", "08:39", "08:37", "08:34", "08:28", "08:25", "08:22", "08:19", "08:16", "08:12", "08:09", "08:04", "08:01", "07:53", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(811, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "08:19", "08:14", "08:08", "08:02", "07:49", "07:43", "07:31"]),
        new Train(511, ["09:22", "09:16", NO_TIME, "09:09", NO_TIME, "09:04", NO_TIME, "08:59", NO_TIME, "08:56", NO_TIME, NO_TIME, "08:49", NO_TIME, "08:43", NO_TIME, NO_TIME, NO_TIME, "08:36", "08:32", NO_TIME, NO_TIME, "08:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(115, ["09:46", "09:40", "09:35", "09:30", "09:27", "09:24", "09:20", "09:17", "09:15", "09:12", "09:09", "09:07", "09:03", "08:58", "08:55", "08:52", "08:49", "08:46", "08:42", "08:39", "08:34", NO_TIME, "08:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(413, ["09:53", "09:47", NO_TIME, "09:39", NO_TIME, "09:33", NO_TIME, "09:28", NO_TIME, "09:25", NO_TIME, NO_TIME, "09:18", "09:13", "09:10", "09:07", "09:04", "09:01", "08:57", "08:54", "08:49", NO_TIME, "08:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(117, ["10:16", "10:10", "10:05", "10:00", "09:57", "09:54", "09:50", "09:47", "09:45", "09:42", "09:39", "09:37", "09:33", "09:28", "09:25", "09:22", "09:19", "09:16", "09:12", "09:09", "09:04", NO_TIME, "08:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(119, ["10:46", "10:40", "10:35", "10:30", "10:27", "10:24", "10:20", "10:17", "10:15", "10:12", "10:09", "10:07", "10:03", "09:58", "09:55", "09:52", "09:49", "09:46", "09:42", "09:39", "09:34", NO_TIME, "09:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(121, ["11:16", "11:10", "11:05", "11:00", "10:57", "10:54", "10:50", "10:47", "10:45", "10:42", "10:39", "10:37", "10:33", "10:28", "10:25", "10:22", "10:19", "10:16", "10:12", "10:09", "10:04", NO_TIME, "09:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(123, ["11:46", "11:40", "11:35", "11:30", "11:27", "11:24", "11:20", "11:17", "11:15", "11:12", "11:09", "11:07", "11:03", "10:58", "10:55", "10:52", "10:49", "10:46", "10:42", "10:39", "10:34", NO_TIME, "10:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(125, ["12:16", "12:10", "12:05", "12:00", "11:57", "11:54", "11:50", "11:47", "11:45", "11:42", "11:39", "11:37", "11:33", "11:28", "11:25", "11:22", "11:19", "11:16", "11:12", "11:09", "11:04", NO_TIME, "10:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(127, ["12:46", "12:40", "12:35", "12:30", "12:27", "12:24", "12:20", "12:17", "12:15", "12:12", "12:09", "12:07", "12:03", "11:58", "11:55", "11:52", "11:49", "11:46", "11:42", "11:39", "11:34", NO_TIME, "11:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(129, ["13:16", "13:10", "13:05", "13:00", "12:57", "12:54", "12:50", "12:47", "12:45", "12:42", "12:39", "12:37", "12:33", "12:28", "12:25", "12:22", "12:19", "12:16", "12:12", "12:09", "12:04", NO_TIME, "11:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(131, ["13:46", "13:40", "13:35", "13:30", "13:27", "13:24", "13:20", "13:17", "13:15", "13:12", "13:09", "13:07", "13:03", "12:58", "12:55", "12:52", "12:49", "12:46", "12:42", "12:39", "12:34", NO_TIME, "12:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(133, ["14:16", "14:10", "14:05", "14:00", "13:57", "13:54", "13:50", "13:47", "13:45", "13:42", "13:39", "13:37", "13:33", "13:28", "13:25", "13:22", "13:19", "13:16", "13:12", "13:09", "13:04", NO_TIME, "12:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(135, ["14:46", "14:40", "14:35", "14:30", "14:27", "14:24", "14:20", "14:17", "14:15", "14:12", "14:09", "14:07", "14:03", "13:58", "13:55", "13:52", "13:49", "13:46", "13:42", "13:39", "13:34", NO_TIME, "13:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(137, ["15:16", "15:10", "15:05", "15:00", "14:57", "14:54", "14:50", "14:47", "14:45", "14:42", "14:39", "14:37", "14:33", "14:28", "14:25", "14:22", "14:19", "14:16", "14:12", "14:09", "14:04", NO_TIME, "13:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(139, ["15:46", "15:40", "15:35", "15:30", "15:27", "15:24", "15:20", "15:17", "15:15", "15:12", "15:09", "15:07", "15:03", "14:58", "14:55", "14:52", "14:49", "14:46", "14:42", "14:39", "14:34", NO_TIME, "14:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(141, ["16:16", "16:10", "16:05", "16:00", "15:57", "15:54", "15:50", "15:47", "15:45", "15:43", "15:39", "15:37", "15:34", "15:28", "15:25", "15:22", "15:19", "15:16", "15:12", "15:09", "15:04", "15:01", "14:53", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(515, ["16:22", "16:16", NO_TIME, "16:09", NO_TIME, "16:04", NO_TIME, "15:59", NO_TIME, "15:56", NO_TIME, NO_TIME, "15:49", NO_TIME, "15:43", NO_TIME, NO_TIME, NO_TIME, "15:36", "15:32", NO_TIME, NO_TIME, "15:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(143, ["16:46", "16:40", "16:35", "16:30", "16:27", "16:24", "16:20", "16:17", "16:15", "16:12", "16:09", "16:07", "16:03", "15:58", "15:55", "15:52", "15:49", "15:46", "15:42", "15:39", "15:34", NO_TIME, "15:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(417, ["16:53", "16:47", NO_TIME, "16:39", NO_TIME, "16:33", NO_TIME, "16:28", NO_TIME, "16:25", NO_TIME, NO_TIME, "16:18", "16:13", "16:10", "16:07", "16:04", "16:01", "15:57", "15:54", "15:49", NO_TIME, "15:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(145, ["17:16", "17:10", "17:05", "17:00", "16:57", "16:54", "16:50", "16:47", "16:45", "16:42", "16:39", "16:37", "16:33", "16:28", "16:25", "16:22", "16:19", "16:16", "16:12", "16:09", "16:04", NO_TIME, "15:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(519, ["17:22", "17:16", NO_TIME, "17:09", NO_TIME, "17:04", NO_TIME, "16:59", NO_TIME, "16:56", NO_TIME, NO_TIME, "16:49", NO_TIME, "16:43", NO_TIME, NO_TIME, NO_TIME, "16:36", "16:32", NO_TIME, NO_TIME, "16:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(147, ["17:46", "17:40", "17:35", "17:30", "17:27", "17:24", "17:20", "17:17", "17:15", "17:12", "17:09", "17:07", "17:03", "16:58", "16:55", "16:52", "16:49", "16:46", "16:42", "16:39", "16:34", NO_TIME, "16:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(421, ["17:53", "17:47", NO_TIME, "17:39", NO_TIME, "17:33", NO_TIME, "17:28", NO_TIME, "17:25", NO_TIME, NO_TIME, "17:18", "17:13", "17:10", "17:07", "17:04", "17:01", "16:57", "16:54", "16:49", NO_TIME, "16:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(149, ["18:16", "18:10", "18:05", "18:00", "17:57", "17:54", "17:50", "17:47", "17:45", "17:42", "17:39", "17:37", "17:33", "17:28", "17:25", "17:22", "17:19", "17:16", "17:12", "17:09", "17:04", NO_TIME, "16:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(523, ["18:22", "18:16", NO_TIME, "18:09", NO_TIME, "18:04", NO_TIME, "17:59", NO_TIME, "17:56", NO_TIME, NO_TIME, "17:49", NO_TIME, "17:43", NO_TIME, NO_TIME, NO_TIME, "17:36", "17:32", NO_TIME, NO_TIME, "17:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(151, ["18:46", "18:40", "18:35", "18:30", "18:27", "18:24", "18:20", "18:17", "18:15", "18:12", "18:09", "18:07", "18:03", "17:58", "17:55", "17:52", "17:49", "17:46", "17:42", "17:39", "17:34", NO_TIME, "17:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(425, ["18:53", "18:47", NO_TIME, "18:39", NO_TIME, "18:33", NO_TIME, "18:28", NO_TIME, "18:25", NO_TIME, NO_TIME, "18:18", "18:13", "18:10", "18:07", "18:04", "18:01", "17:57", "17:54", "17:49", NO_TIME, "17:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(153, ["19:16", "19:10", "19:05", "19:00", "18:57", "18:54", "18:50", "18:47", "18:45", "18:42", "18:39", "18:37", "18:33", "18:28", "18:25", "18:22", "18:19", "18:16", "18:12", "18:09", "18:04", NO_TIME, "17:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(527, ["19:22", "19:16", NO_TIME, "19:09", NO_TIME, "19:04", NO_TIME, "18:59", NO_TIME, "18:56", NO_TIME, NO_TIME, "18:49", NO_TIME, "18:43", NO_TIME, NO_TIME, NO_TIME, "18:36", "18:32", NO_TIME, NO_TIME, "18:22", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(155, ["19:46", "19:40", "19:35", "19:30", "19:27", "19:24", "19:20", "19:17", "19:15", "19:12", "19:09", "19:07", "19:03", "18:58", "18:55", "18:52", "18:49", "18:46", "18:42", "18:39", "18:34", NO_TIME, "18:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(429, ["19:53", "19:47", NO_TIME, "19:39", NO_TIME, "19:33", NO_TIME, "19:28", NO_TIME, "19:25", NO_TIME, NO_TIME, "19:18", "19:13", "19:10", "19:07", "19:04", "19:01", "18:57", "18:54", "18:49", NO_TIME, "18:43", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(157, ["20:16", "20:10", "20:05", "20:00", "19:57", "19:54", "19:50", "19:47", "19:45", "19:42", "19:39", "19:37", "19:33", "19:28", "19:25", "19:22", "19:19", "19:16", "19:12", "19:09", "19:04", NO_TIME, "18:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(159, ["20:46", "20:40", "20:35", "20:30", "20:27", "20:24", "20:20", "20:17", "20:15", "20:12", "20:09", "20:07", "20:03", "19:58", "19:55", "19:52", "19:49", "19:46", "19:42", "19:39", "19:34", NO_TIME, "19:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(161, ["21:16", "21:10", "21:05", "21:00", "20:57", "20:54", "20:50", "20:47", "20:45", "20:42", "20:39", "20:37", "20:33", "20:28", "20:25", "20:22", "20:19", "20:16", "20:12", "20:09", "20:04", NO_TIME, "19:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(163, ["21:46", "21:40", "21:35", "21:30", "21:27", "21:24", "21:20", "21:17", "21:15", "21:12", "21:09", "21:07", "21:03", "20:58", "20:55", "20:52", "20:49", "20:46", "20:42", "20:39", "20:34", NO_TIME, "20:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(165, ["22:16", "22:10", "22:05", "22:00", "21:57", "21:54", "21:50", "21:47", "21:45", "21:42", "21:39", "21:37", "21:33", "21:28", "21:25", "21:22", "21:19", "21:16", "21:12", "21:09", "21:04", NO_TIME, "20:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(167, ["22:46", "22:40", "22:35", "22:30", "22:27", "22:24", "22:20", "22:17", "22:15", "22:12", "22:09", "22:07", "22:03", "21:58", "21:55", "21:52", "21:49", "21:46", "21:42", "21:39", "21:34", NO_TIME, "21:28", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(169, ["23:16", "23:10", "23:05", "23:00", "22:57", "22:54", "22:50", "22:47", "22:45", "22:42", "22:39", "22:37", "22:33", "22:28", "22:25", "22:22", "22:19", "22:16", "22:12", "22:09", "22:04", NO_TIME, "21:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(171, ["23:48", "23:42", "23:37", "23:32", "23:29", "23:26", "23:22", "23:19", "23:17", "23:14", "23:11", "23:09", "23:05", "23:00", "22:57", "22:54", "22:51", "22:48", "22:44", "22:41", "22:36", NO_TIME, "22:30", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),
        new Train(173, ["00:48", "00:42", "00:37", "00:32", "00:29", "00:26", "00:22", "00:19", "00:17", "00:14", "00:11", "00:09", "00:05", "00:00", "23:57", "23:54", "23:51", "23:48", "23:44", "23:41", "23:36", NO_TIME, "23:30", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, null]),

        // SOUTHBOUND
        new Train(102, ["04:55", "05:00", "05:04", "05:10", "05:13", "05:16", "05:20", "05:23", "05:25", "05:27", "05:31", "05:33", "05:37", "05:41", "05:44", "05:47", "05:51", "05:54", "05:58", "06:01", "06:06", NO_TIME, "06:12", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(104, ["05:30", "05:35", "05:39", "05:46", "05:49", "05:52", "05:56", "05:59", "06:02", "06:05", "06:09", "06:12", "06:16", "06:20", "06:24", "06:27", "06:31", "06:34", "06:38", "06:41", "06:46", NO_TIME, "06:52", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(502, ["06:20", "06:24", NO_TIME, "06:32", NO_TIME, "06:38", NO_TIME, "06:43", NO_TIME, "06:46", NO_TIME, NO_TIME, "06:53", NO_TIME, "06:59", NO_TIME, NO_TIME, "07:06", "07:09", NO_TIME, NO_TIME, NO_TIME, "07:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(106, ["06:25", "06:30", "06:34", "06:40", "06:43", "06:46", "06:50", "06:53", "06:55", "06:57", "07:01", "07:03", "07:07", "07:11", "07:14", "07:17", "07:21", "07:24", "07:28", "07:31", "07:36", NO_TIME, "07:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(404, ["06:48", "06:53", NO_TIME, "07:01", NO_TIME, "07:07", NO_TIME, "07:12", NO_TIME, "07:15", NO_TIME, NO_TIME, "07:22", "07:26", "07:29", "07:32", "07:36", "07:39", "07:43", "07:46", "07:51", NO_TIME, "07:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(108, ["06:55", "07:00", "07:04", "07:10", "07:13", "07:16", "07:20", "07:23", "07:25", "07:27", "07:31", "07:33", "07:37", "07:41", "07:44", "07:47", "07:51", "07:54", "07:58", "08:01", "08:06", "08:08", "08:14", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(506, ["07:20", "07:24", NO_TIME, "07:32", NO_TIME, "07:38", NO_TIME, "07:43", NO_TIME, "07:46", NO_TIME, NO_TIME, "07:53", NO_TIME, "07:59", NO_TIME, NO_TIME, "08:06", "08:09", NO_TIME, NO_TIME, NO_TIME, "08:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(110, ["07:25", "07:30", "07:34", "07:40", "07:43", "07:46", "07:50", "07:53", "07:55", "07:57", "08:01", "08:03", "08:07", "08:11", "08:14", "08:17", "08:21", "08:24", "08:28", "08:31", "08:36", NO_TIME, "08:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(408, ["07:48", "07:53", NO_TIME, "08:01", NO_TIME, "08:07", NO_TIME, "08:12", NO_TIME, "08:15", NO_TIME, NO_TIME, "08:22", "08:26", "08:29", "08:32", "08:36", "08:39", "08:43", "08:46", "08:51", NO_TIME, "08:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(112, ["07:55", "08:00", "08:04", "08:10", "08:13", "08:16", "08:20", "08:23", "08:25", "08:27", "08:31", "08:33", "08:37", "08:41", "08:44", "08:47", "08:51", "08:54", "08:58", "09:01", "09:06", NO_TIME, "09:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(510, ["08:20", "08:24", NO_TIME, "08:32", NO_TIME, "08:38", NO_TIME, "08:43", NO_TIME, "08:46", NO_TIME, NO_TIME, "08:53", NO_TIME, "08:59", NO_TIME, NO_TIME, "09:06", "09:09", NO_TIME, NO_TIME, NO_TIME, "09:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(114, ["08:25", "08:30", "08:34", "08:40", "08:43", "08:46", "08:50", "08:53", "08:55", "08:57", "09:01", "09:03", "09:07", "09:11", "09:14", "09:17", "09:21", "09:24", "09:28", "09:31", "09:36", NO_TIME, "09:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(412, ["08:48", "08:53", NO_TIME, "09:01", NO_TIME, "09:07", NO_TIME, "09:12", NO_TIME, "09:15", NO_TIME, NO_TIME, "09:22", "09:26", "09:29", "09:32", "09:36", "09:39", "09:43", "09:46", "09:51", NO_TIME, "09:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(116, ["08:55", "09:00", "09:04", "09:10", "09:13", "09:16", "09:20", "09:23", "09:25", "09:27", "09:31", "09:33", "09:37", "09:41", "09:44", "09:47", "09:51", "09:54", "09:58", "10:01", "10:06", NO_TIME, "10:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(118, ["09:25", "09:30", "09:34", "09:40", "09:43", "09:46", "09:50", "09:53", "09:55", "09:57", "10:01", "10:03", "10:07", "10:11", "10:14", "10:17", "10:21", "10:24", "10:28", "10:31", "10:36", NO_TIME, "10:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(120, ["09:55", "10:00", "10:04", "10:10", "10:13", "10:16", "10:20", "10:23", "10:25", "10:27", "10:31", "10:33", "10:37", "10:41", "10:44", "10:47", "10:51", "10:54", "10:58", "11:01", "11:06", NO_TIME, "11:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(122, ["10:25", "10:30", "10:34", "10:40", "10:43", "10:46", "10:50", "10:53", "10:55", "10:57", "11:01", "11:03", "11:07", "11:11", "11:14", "11:17", "11:21", "11:24", "11:28", "11:31", "11:36", NO_TIME, "11:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(124, ["10:55", "11:00", "11:04", "11:10", "11:13", "11:16", "11:20", "11:23", "11:25", "11:27", "11:31", "11:33", "11:37", "11:41", "11:44", "11:47", "11:51", "11:54", "11:58", "12:01", "12:06", NO_TIME, "12:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(126, ["11:25", "11:30", "11:34", "11:40", "11:43", "11:46", "11:50", "11:53", "11:55", "11:57", "12:01", "12:03", "12:07", "12:11", "12:14", "12:17", "12:21", "12:24", "12:28", "12:31", "12:36", NO_TIME, "12:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(128, ["11:55", "12:00", "12:04", "12:10", "12:13", "12:16", "12:20", "12:23", "12:25", "12:27", "12:31", "12:33", "12:37", "12:41", "12:44", "12:47", "12:51", "12:54", "12:58", "13:01", "13:06", NO_TIME, "13:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(130, ["12:25", "12:30", "12:34", "12:40", "12:43", "12:46", "12:50", "12:53", "12:55", "12:57", "13:01", "13:03", "13:07", "13:11", "13:14", "13:17", "13:21", "13:24", "13:28", "13:31", "13:36", NO_TIME, "13:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(132, ["12:55", "13:00", "13:04", "13:10", "13:13", "13:16", "13:20", "13:23", "13:25", "13:27", "13:31", "13:33", "13:37", "13:41", "13:44", "13:47", "13:51", "13:54", "13:58", "14:01", "14:06", NO_TIME, "14:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(134, ["13:25", "13:30", "13:34", "13:40", "13:43", "13:46", "13:50", "13:53", "13:55", "13:57", "14:01", "14:03", "14:07", "14:11", "14:14", "14:17", "14:21", "14:24", "14:28", "14:31", "14:36", NO_TIME, "14:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(136, ["13:55", "14:00", "14:04", "14:10", "14:13", "14:16", "14:20", "14:23", "14:25", "14:27", "14:31", "14:33", "14:37", "14:41", "14:44", "14:47", "14:51", "14:54", "14:58", "15:01", "15:06", NO_TIME, "15:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(138, ["14:25", "14:30", "14:34", "14:40", "14:43", "14:46", "14:50", "14:53", "14:55", "14:57", "15:01", "15:03", "15:07", "15:11", "15:14", "15:17", "15:21", "15:24", "15:28", "15:31", "15:36", NO_TIME, "15:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(140, ["14:55", "15:00", "15:04", "15:10", "15:13", "15:16", "15:20", "15:23", "15:25", "15:27", "15:31", "15:33", "15:37", "15:41", "15:44", "15:47", "15:51", "15:54", "15:58", "16:01", "16:06", "16:08", "16:14", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(514, ["15:20", "15:24", NO_TIME, "15:32", NO_TIME, "15:38", NO_TIME, "15:43", NO_TIME, "15:46", NO_TIME, NO_TIME, "15:53", NO_TIME, "15:59", NO_TIME, NO_TIME, "16:06", "16:09", NO_TIME, NO_TIME, NO_TIME, "16:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(814, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "16:23", "16:28", "16:34", "16:40", "16:53", "17:00", "17:11"]),
        new Train(142, ["15:25", "15:30", "15:34", "15:40", "15:43", "15:46", "15:50", "15:53", "15:55", "15:57", "16:01", "16:03", "16:07", "16:11", "16:14", "16:17", "16:21", "16:24", "16:28", "16:31", "16:36", NO_TIME, "16:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(416, ["15:48", "15:53", NO_TIME, "16:01", NO_TIME, "16:07", NO_TIME, "16:12", NO_TIME, "16:15", NO_TIME, NO_TIME, "16:22", "16:26", "16:29", "16:32", "16:36", "16:39", "16:43", "16:46", "16:51", NO_TIME, "16:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(816, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "17:01", "17:06", "17:12", "17:18", "17:31", "17:38", "17:49"]),
        new Train(144, ["15:55", "16:00", "16:04", "16:10", "16:13", "16:16", "16:20", "16:23", "16:25", "16:27", "16:31", "16:33", "16:37", "16:41", "16:44", "16:47", "16:51", "16:54", "16:58", "17:01", "17:06", NO_TIME, "17:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(518, ["16:20", "16:24", NO_TIME, "16:32", NO_TIME, "16:38", NO_TIME, "16:43", NO_TIME, "16:46", NO_TIME, NO_TIME, "16:53", NO_TIME, "16:59", NO_TIME, NO_TIME, "17:06", "17:09", NO_TIME, NO_TIME, NO_TIME, "17:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(146, ["16:25", "16:30", "16:34", "16:40", "16:43", "16:46", "16:50", "16:53", "16:55", "16:57", "17:01", "17:03", "17:07", "17:11", "17:14", "17:17", "17:21", "17:24", "17:28", "17:31", "17:36", NO_TIME, "17:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(420, ["16:48", "16:53", NO_TIME, "17:01", NO_TIME, "17:07", NO_TIME, "17:12", NO_TIME, "17:15", NO_TIME, NO_TIME, "17:22", "17:26", "17:29", "17:32", "17:36", "17:39", "17:43", "17:46", "17:51", NO_TIME, "17:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(820, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "18:01", "18:06", "18:12", "18:18", "18:31", "18:38", "18:49"]),
        new Train(148, ["16:55", "17:00", "17:04", "17:10", "17:13", "17:16", "17:20", "17:23", "17:25", "17:27", "17:31", "17:33", "17:37", "17:41", "17:44", "17:47", "17:51", "17:54", "17:58", "18:01", "18:06", NO_TIME, "18:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(522, ["17:20", "17:24", NO_TIME, "17:32", NO_TIME, "17:38", NO_TIME, "17:43", NO_TIME, "17:46", NO_TIME, NO_TIME, "17:53", NO_TIME, "17:59", NO_TIME, NO_TIME, "18:06", "18:09", NO_TIME, NO_TIME, NO_TIME, "18:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(822, [NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, "18:23", "18:28", "18:34", "18:40", "18:53", "19:00", "19:11"]),
        new Train(150, ["17:25", "17:30", "17:34", "17:40", "17:43", "17:46", "17:50", "17:53", "17:55", "17:57", "18:01", "18:03", "18:07", "18:11", "18:14", "18:17", "18:21", "18:24", "18:28", "18:31", "18:36", NO_TIME, "18:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(424, ["17:48", "17:53", NO_TIME, "18:01", NO_TIME, "18:07", NO_TIME, "18:12", NO_TIME, "18:15", NO_TIME, NO_TIME, "18:22", "18:26", "18:29", "18:32", "18:36", "18:39", "18:43", "18:46", "18:51", NO_TIME, "18:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(152, ["17:55", "18:00", "18:04", "18:10", "18:13", "18:16", "18:20", "18:23", "18:25", "18:27", "18:31", "18:33", "18:37", "18:41", "18:44", "18:47", "18:51", "18:54", "18:58", "19:01", "19:06", NO_TIME, "19:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(526, ["18:20", "18:24", NO_TIME, "18:32", NO_TIME, "18:38", NO_TIME, "18:43", NO_TIME, "18:46", NO_TIME, NO_TIME, "18:53", NO_TIME, "18:59", NO_TIME, NO_TIME, "19:06", "19:09", NO_TIME, NO_TIME, NO_TIME, "19:20", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(154, ["18:25", "18:30", "18:34", "18:40", "18:43", "18:46", "18:50", "18:53", "18:55", "18:57", "19:01", "19:03", "19:07", "19:11", "19:14", "19:17", "19:21", "19:24", "19:28", "19:31", "19:36", NO_TIME, "19:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(428, ["18:48", "18:53", NO_TIME, "19:01", NO_TIME, "19:07", NO_TIME, "19:12", NO_TIME, "19:15", NO_TIME, NO_TIME, "19:22", "19:26", "19:29", "19:32", "19:36", "19:39", "19:43", "19:46", "19:51", NO_TIME, "19:58", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(156, ["18:55", "19:00", "19:04", "19:10", "19:13", "19:16", "19:20", "19:23", "19:25", "19:27", "19:31", "19:33", "19:37", "19:41", "19:44", "19:47", "19:51", "19:54", "19:58", "20:01", "20:06", NO_TIME, "20:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(158, ["19:25", "19:30", "19:34", "19:40", "19:43", "19:46", "19:50", "19:53", "19:55", "19:57", "20:01", "20:03", "20:07", "20:11", "20:14", "20:17", "20:21", "20:24", "20:28", "20:31", "20:36", NO_TIME, "20:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(160, ["19:55", "20:00", "20:04", "20:10", "20:13", "20:16", "20:20", "20:23", "20:25", "20:27", "20:31", "20:33", "20:37", "20:41", "20:44", "20:47", "20:51", "20:54", "20:58", "21:01", "21:06", NO_TIME, "21:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(162, ["20:25", "20:30", "20:34", "20:40", "20:43", "20:46", "20:50", "20:53", "20:55", "20:57", "21:01", "21:03", "21:07", "21:11", "21:14", "21:17", "21:21", "21:24", "21:28", "21:31", "21:36", NO_TIME, "21:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(164, ["20:55", "21:00", "21:04", "21:10", "21:13", "21:16", "21:20", "21:23", "21:25", "21:27", "21:31", "21:33", "21:37", "21:41", "21:44", "21:47", "21:51", "21:54", "21:58", "22:01", "22:06", NO_TIME, "22:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(166, ["21:25", "21:30", "21:34", "21:40", "21:43", "21:46", "21:50", "21:53", "21:55", "21:57", "22:01", "22:03", "22:07", "22:11", "22:14", "22:17", "22:21", "22:24", "22:28", "22:31", "22:36", NO_TIME, "22:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(168, ["21:55", "22:00", "22:04", "22:10", "22:13", "22:16", "22:20", "22:23", "22:25", "22:27", "22:31", "22:33", "22:37", "22:41", "22:44", "22:47", "22:51", "22:54", "22:58", "23:01", "23:06", NO_TIME, "23:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(170, ["22:25", "22:30", "22:34", "22:40", "22:43", "22:46", "22:50", "22:53", "22:55", "22:57", "23:01", "23:03", "23:07", "23:11", "23:14", "23:17", "23:21", "23:24", "23:28", "23:31", "23:36", NO_TIME, "23:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(172, ["22:55", "23:00", "23:04", "23:10", "23:13", "23:16", "23:20", "23:23", "23:25", "23:27", "23:31", "23:33", "23:37", "23:41", "23:44", "23:47", "23:51", "23:54", "23:58", "00:01", "00:06", NO_TIME, "00:13", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(174, ["23:25", "23:30", "23:34", "23:40", "23:43", "23:46", "23:50", "23:53", "23:55", "23:57", "00:01", "00:03", "00:07", "00:11", "00:14", "00:17", "00:21", "00:24", "00:28", "00:31", "00:36", NO_TIME, "00:42", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME]),
        new Train(176, ["00:05", "00:10", "00:14", "00:20", "00:23", "00:26", "00:30", "00:33", "00:35", "00:37", "00:41", "00:43", "00:47", "00:51", "00:54", "00:57", "01:01", "01:04", "01:08", "01:11", "01:16", NO_TIME, "01:23", NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME, NO_TIME])
    ];

    /**
     * Retrieves the expected arrival time of a specific train at a given station.
     * @throws Error if the train with the specified number is not found.
     */
    public static getExpectedArrivalTime(trainNumber: number, stationName: StationName): string | typeof NO_TIME {
        const train = this.trains.find(t => t.getNumber() === trainNumber);
        if (!train)
            throw new Error(`Train number ${trainNumber} not found`);

        const time = train.getExpectedArrivalTime(stationName);
        return time;
    }

    public static getTrainByDepartTimeAndHeading(departTime: string, stationName: StationName, heading: Heading): Train | null {
        return this.trains.find(train => train.getExpectedArrivalTime(stationName) === departTime && train.getHeading() === heading) || null;
    }
}
