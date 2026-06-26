// Reference-counted body scroll lock so an open modal + drawer don't fight
// over `document.body.style.overflow`.
let locks = 0;

export function lockScroll() {
  locks += 1;
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) document.body.style.overflow = "";
}
