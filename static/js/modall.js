const modal2 = document.querySelector('#myModal2');
const modalBtn2 = document.querySelector('#modalBtn2');
const closeBtn2 = document.querySelector('.close');

// Events
modalBtn2.addEventListener('click', openModal);
closeBtn2.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal2.style.display = 'block';
}

// Close
function closeModal() {
  modal2.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal2) {
    modal2.style.display = 'none';
  }
}  
