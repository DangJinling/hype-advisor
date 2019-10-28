export function transformDateStr(dateStr) {
    const d = new Date(dateStr);
    const str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return str;
}