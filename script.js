'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')
///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};



const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//handle open modal for two btns
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookie for improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
header.prepend(message)

//style
message.style.backgroundColor = '#37383d'
message.style.width = '120%'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'


message.style.backgroundColor = '#37383d';
message.style.width = '126.3rem';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect()

  //scrolling\
  //old school way
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  })
  //new way
  section1.scrollIntoView({ behavior: 'smooth' })
})
//Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})




tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  //Guard clause
  if (!clicked) return
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  //active content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})

//Menu fade animation
const handleHover = (e, opacity) => {
  const link = e.target
  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(sb => {
      if (sb !== link) sb.style.opacity = opacity
    })
    logo.style.opacity = opacity
  }
}

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5)
})

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1)
})

//sticky navigation
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting && window.innerWidth > 1000) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`
})
headerObserver.observe(header)

//Reveal section
const sections = document.querySelectorAll('.section')

const revalSection = (entries, observer) => {
  const [entry] = entries
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revalSection, {
  root: null,
  threshold: 0.15
})
sections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})
//Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]')

const loadImg = (entries, observer) => {
  const [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})
imgTarget.forEach(section => imgObserver.observe(section))

//slider
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')
console.log(slides)
let currentSlide = 0
let maxSlide = slides.length

slides.forEach((slide, index) => {
  slide.style.transform = `transformX(${100 * (index)}%)`
})

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button> `)
  })
}
createDots()

const activateDot = (slide) => {
  const dots = document.querySelectorAll('.dots__dot')
  dots.forEach(dot => {
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active')
}
activateDot(0)
//go to slide when user click next or previous button
const goToSlide = (currentSlide) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`
  })
  activateDot(currentSlide)
}
//handle when user click next btn
const nextSlide = function () {
  console.log('hello')
  if (currentSlide == maxSlide - 1) currentSlide = 0
  else currentSlide++
  goToSlide(currentSlide)
}
//handle when user click previous btn
const previousSlide = function () {
  if (currentSlide == 0) currentSlide = maxSlide - 1
  else currentSlide--
  goToSlide(currentSlide)
}

btnRight.addEventListener('click', () => nextSlide())
btnLeft.addEventListener('click', () => previousSlide())

slider.style.overflow = 'hidden'

slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${100 * index}%)`
})
//handle when user type arrow btn to change slide
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') previousSlide()
  if (e.key === 'ArrowRight') nextSlide()
})
//handle when user click dot to change slide
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide)
  }
})
//responsive
//responsive nav

const burgerContainer = document.querySelector('.burger__container')
const navLinks = document.querySelector('.nav__links')
const navModal = document.querySelector('.nav__modal')
const navCloseBtn = document.querySelector('.nav__closebtn')
//open nav
burgerContainer.addEventListener('click', function () {
  navLinks.style.transform = 'translateX(0)'
  navModal.style.display = 'block'
  navModal.style.opacity = '1'
})
//close nav
navCloseBtn.addEventListener('click', function () {
  navLinks.style.transform = 'translateX(-100%)'
  navModal.style.opacity = '0'
  navModal.style.display = 'none'
})