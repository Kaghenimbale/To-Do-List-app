import renderToDo from './display.js';

const form = document.getElementById('form');

const addToDo = (e) => {
  const newData = JSON.parse(localStorage.getItem('data') || '[]');
  e.preventDefault();
  const InputValue = document.querySelector('#input-list').value;

  const dataObj = {
    description: InputValue,
    completed: false,
    index: newData.length,
  };

  newData.push(dataObj);
  localStorage.setItem('data', JSON.stringify(newData));
  renderToDo();
  form.reset();
};

export default addToDo;
