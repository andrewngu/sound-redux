export function offsetLeft(el) {
    let x = el.offsetLeft;
    while(el.offsetParent) {
        x += el.offsetParent.offsetLeft;
        el = el.offsetParent;
    }
    return x;
}
