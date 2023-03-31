'use strict';

// Set current year in the copyright
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile naviagtion
console.log(currentYear);
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

// Smooth scrolling animation

const allLinks = document.querySelectorAll('a:link');
console.log(allLinks);
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    //Scroll to other link
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});
///////////////////////////////////////////////////////////
//  Sticky Navigation
//specify (what needs to happen and options)
//entries - an array of entries, and there is going to be one entries for each threshold value.
const sectionHeroEl = document.querySelector('.section-hero');
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    // ent.intersecting is a boolean value
    if (!ent.isIntersecting) {
      document.body.classList.add('sticky');
    } else if (ent.isIntersecting) {
      document.body.classList.remove('sticky');
    }
  },
  {
    //In the viewport, null means the viewport
    root: null,
    // 0 means that we will have an event as soon as 0% of the hero section is inside of the viewport
    threshold: 0,
    rootMargin: '-80px', //should be px, rems or % dont work, this was the reason to set the height manually
  }
);

// the element we want to observe - hero section, because we want to make the navigation sticky as soon as this section moves out of the viewport
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
