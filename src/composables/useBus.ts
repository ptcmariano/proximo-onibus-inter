import { busLines, type BusLine } from '../data/lines';

export function useBus() {
    const getLineById = (id: string): BusLine | undefined => {
        return busLines.find(line => line.id === id);
    };

    const getDayType = (date: Date): 'weekdays' | 'saturdays' | 'sundays' => {
        const day = date.getDay();
        if (day === 0) return 'sundays'; // Dom
        if (day === 6) return 'saturdays'; // Sab
        return 'weekdays';
    };

    // Convert HH:MM to minutes since midnight
    const timeToMinutes = (timeString: string) => {
        const [h, m] = timeString.split(':').map(Number);
        if (h === undefined || m === undefined) return 0;
        return h * 60 + m;
    };

    const getNextBusTime = (lineId: string, now: Date = new Date()): { time: string, minutesLeft: number } | null => {
        const line = getLineById(lineId);
        if (!line) return null;

        const dayType = getDayType(now);
        const schedule = line.schedule[dayType];

        if (!schedule || schedule.length === 0) return null;

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const nextBus = schedule.find(t => timeToMinutes(t.time) >= currentMinutes);

        if (!nextBus) return null;

        return {
            time: nextBus.time,
            minutesLeft: timeToMinutes(nextBus.time) - currentMinutes
        };
    };

    return {
        busLines,
        getLineById,
        getDayType,
        getNextBusTime
    };
}
