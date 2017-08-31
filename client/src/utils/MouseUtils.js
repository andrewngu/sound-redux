export function offsetLeft(element) {
  let el = element;
  let x = el.offsetLeft;

  while (el.offsetParent) {
    x += el.offsetParent.offsetLeft;
    el = el.offsetParent;
  }

  return x;
}
