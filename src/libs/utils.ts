export function formatTime(time: number) {
    const hours = Math.floor(time / 3600);
    const mins = Math.floor(time / 60 % 60);
    const secs = time % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}