const modal = document.querySelector('#modal');

function eventToggle(element) {
  element.addEventListener('click', () => {
    modal.classList.toggle('hide');
  });
}

eventToggle(document.querySelector('#page-home main a'));
eventToggle(document.querySelector('#modal .header a'));