const debounce = (fn) => {
  let queued
  return function (...args) {
    if (queued) {
      window.cancelAnimationFrame(queued)
    }

    queued = window.requestAnimationFrame(fn.bind(fn, ...args))
  }
}

const scrollHandler = () => {
  const { scrollY } = window;

  document.documentElement.dataset.scroll = scrollY;

  if (scrollY > 85) { document.getElementsByClassName('header')[0].classList.add('detached') }
  if (scrollY < 85) { document.getElementsByClassName('header')[0].classList.remove('detached') }
}

document.addEventListener('scroll', debounce(scrollHandler), { passive: true });
scrollHandler();
