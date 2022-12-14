import { getInputLines } from '../utils';

export const run = () => {
    const input = getInputLines(4);

    let fullOverlaps = 0;
    let overlaps = 0;

    for (const item of input) {
        if (!item) continue;

        const [first,second] = item.split(',');
        const [firstStart, firstEnd] = first.split('-').map(Number);
        const [secondStart, secondEnd] = second.split('-').map(Number);

        if (
            (firstStart >= secondStart && firstEnd <= secondEnd) ||
            (secondStart >= firstStart && secondEnd <= firstEnd)
        ) {
            fullOverlaps++;
            overlaps++;
        } else if (
            (firstStart >= secondStart && firstStart <= secondEnd && firstEnd >= secondEnd) ||
            (secondStart >= firstStart && secondStart <= firstEnd && secondEnd >= firstEnd)
        ) {
            overlaps++;
        }
    }

    console.log('num:', fullOverlaps);
    console.log('overlaps:', overlaps);
}
