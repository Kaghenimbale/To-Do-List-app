import './index.css';

const form = document.getElementById('form');
const listItems = document.getElementById('list-items');
const newData = JSON.parse(localStorage.getItem('data') || '[]');

class Task {
  constructor(newData) {
    this.newData = newData;
  }

  read() {
    listItems.innerHTML = '';
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
  }

  create(dataObj) {
    this.newData.push(dataObj);
    localStorage.setItem('data', JSON.stringify(this.newData));
    this.read();
  }
}

const renderDomContentDb = () => {
  const task = new Task(newData);

  task.read();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const InputValue = document.querySelector('#input-list').value;

    const dataObj = {
      description: InputValue,
      completed: false,
      index: newData.length,
    };

    task.create(dataObj);
    form.reset();
  });
};

window.addEventListener('load', renderDomContentDb);
