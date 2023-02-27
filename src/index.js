import './index.css';
// import { renderDomContentDb } from './module/add.js';

const form = document.getElementById('form');
const listItems = document.getElementById('list-items');
const data = 'data';

class Task {
  constructor (newData){
    this.newData = newData;
  }
  delete(){
    const newData = JSON.parse(localStorage.getItem(data) || '[]');
    const newdata = [...newData];
    console.log(newdata);
    const btns = document.querySelectorAll('#delete');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.parentElement.dataset.id;
        const element = e.target.parentElement;
        const index = newdata.findIndex((item) => item.index === +id);
        if (index > -1) {
          newdata.splice(index, 1);
          localStorage.setItem('data', JSON.stringify(newData));
          console.log(newdata);
          this.read();
        }
      });
    });
  }
  update(){
    const btnitems = document.querySelectorAll('#dot');
    const Input = document.createElement('input');
    Input.className ='InputUpdate';
    const newData = JSON.parse(localStorage.getItem(data) || '[]');

    btnitems.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const btntdot = e.target.parentElement;
        const deletebtn = btntdot.nextElementSibling;
        const formTarget = btntdot.previousElementSibling.children[2];
        const h2 = formTarget.previousElementSibling;

        deletebtn.style.backgroundColor = 'rgba(255, 247, 0, 0.109)'
        btntdot.classList.add('hidden');
        deletebtn.classList.remove('hidden');
        formTarget.style.display = 'flex';
        h2.classList.add('hidden');

        formTarget.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = e.target.querySelector('input');
          const value = input.value;
          const itemIndex = input.dataset.parentindex;

          const newget = [...newData];
          formTarget.style.display = 'none';
          btntdot.classList.remove('hidden');
          deletebtn.classList.add('hidden');
          h2.classList.remove('hidden');

          newget.filter((data) => {
            if(data.index === +itemIndex){
              const item = newget[itemIndex];
              item.description = value
              localStorage.setItem('data', JSON.stringify(newget));
              this.read();
            }
          })
        });
      });
    });
    // this.delete();
  };

  read() {
    listItems.innerHTML = '';
    const newData = JSON.parse(localStorage.getItem(data) || '[]');
    newData.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'Item';
        
    const listItem = `
    <div class="description">
    <span id='checkbox' data-id=${item.index} class="material-symbols-outlined">check_box_outline_blank</span>
    <h2 id='underlined'>${item.description}</h2>
    <form class="newForm">
    <input class='InputUpdate' type="input" name="description" data-parentIndex="${item.index}" value="${item.description}"/>
    </form>
    </div>
    <button class="btn-dot" id="dot" data-id=${item.index}><span class="material-symbols-outlined">more_vert</span></button>
    <button class="btn-dot hidden" id="delete" data-id=${item.index}><span class="material-symbols-outlined">delete</span></button>
    `;
        
    li.innerHTML = listItem;
        
    listItems.appendChild(li);
  });
  this.update();
  this.delete();
  };

  create(dataObj) {
    this.newData.push(dataObj);
    localStorage.setItem(data, JSON.stringify(this.newData));
    this.read();
    // this.update();
    // this.delete();
  };
};

const renderDomContentDb = () => {
  const newData = JSON.parse(localStorage.getItem(data) || '[]');
  const task = new Task(newData);

  task.read();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const InputValue = document.querySelector('#input-list').value;
      
    let dataObj = {
      description: InputValue,
      completed: false,
      index: newData.length,
    };

    task.create(dataObj);
    form.reset();
    dataObj = '';
  });
}

window.addEventListener('load', renderDomContentDb);
