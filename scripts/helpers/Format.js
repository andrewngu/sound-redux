export function formatSongTitle(s) {
    if (!s) {
        return '';
    }

    const arr = s.replace('–', '-').split(' - ');

    return arr[arr.length - 1].split(' (')[0];
}
