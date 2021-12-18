const careerTitleEl = document.getElementById('career-title');
const yearEventEls = document.getElementsByClassName('year-event');

const debounce = (fn) => {
  let queued
  return function (...args) {
    if (queued) {
      window.cancelAnimationFrame(queued)
    }

    queued = window.requestAnimationFrame(fn.bind(fn, ...args))
  }
}

const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    // console.log("isInViewPort, comparing")
    // console.log("rect.top >= 0", rect.top)
    // console.log("rect.left >= 0", rect.left)
    // console.log("rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)", rect.bottom, window.innerHeight || document.documentElement.clientHeight)
    // console.log("rect.right <= (window.innerWidth || document.documentElement.clientWidth)", rect.right, (window.innerWidth || document.documentElement.clientWidth))
    return (
        rect.top >= -200 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const isYearInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    console.log('top : ', rect.top);
    console.log('document.ClientHeight : ', document.documentElement.clientHeight)
    return (rect.top + 100) <= document.documentElement.clientHeight
}


const scrollHandler = () => {
  const { scrollY } = window;

  document.documentElement.dataset.scroll = scrollY;

  if (scrollY > 85) { document.getElementsByClassName('header')[0].classList.add('detached') }
  if (scrollY < 85) { document.getElementsByClassName('header')[0].classList.remove('detached') }
  if (isInViewport(careerTitleEl)) { careerTitleEl.classList.add('slide-in-left') }

  // Sliding year event from right or left
  isYearInViewport(yearEventEls[0])
  for (const yearEventEl of yearEventEls) {
    if (isYearInViewport(yearEventEl)) {
      if (yearEventEl.classList.contains('rtl')) {
        yearEventEl.classList.add('slide-in-right')
      } else {
        yearEventEl.classList.add('slide-in-left')
      }
    }
  }
}

document.addEventListener('scroll', debounce(scrollHandler), { passive: true });
scrollHandler();
