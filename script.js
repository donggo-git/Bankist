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
  if (!entry.isIntersecting) nav.classList.add('sticky')
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
  console.log(entries)
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