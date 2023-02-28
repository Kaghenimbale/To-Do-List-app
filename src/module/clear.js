const reload = document.querySelector('.icon');

const reloadDom = () => {
  reload.addEventListener('click', (e) => {
    e.target.classList.toggle('icon-reload');
    window.location.reload();
  });
};

export default reloadDom;
