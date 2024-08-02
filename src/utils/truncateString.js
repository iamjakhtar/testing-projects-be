export function truncateString(str, length) {
    if (str.length > length) {
        return str.substr(0, length) + "...";
    }
    return str;
}