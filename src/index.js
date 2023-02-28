import './index.css';
import reloadDom from './module/clear.js';

const form = document.getElementById('form');
const listItems = document.getElementById('list-items');
const clearSelected = document.querySelector('.clear');

class Task {
  constructor(newData) {
    this.newData = newData;
  }

  delete() {
    const btns = document.querySelectorAll('#delete');

    btns.forEach((btn) => {
      const newData = this.getStoredData();

      btn.addEventListener('click', (e) => {
        const { id } = e.target.parentElement.dataset;
        const indexItem = newData.findIndex((item) => item.index === +id);

        if (indexItem > -1) {
          newData.splice(indexItem, 1);

          newData.forEach((item, indexItem) => {
            item.index = indexItem;
          });

          localStorage.setItem('data', JSON.stringify(newData));
          this.read();
        }
      });
    });
  }

  getStoredData() {
    const newData = JSON.parse(localStorage.getItem('data') || '[]');
    this.newData = newData;
    return newData;
  }

  Clear() {
    clearSelected.addEventListener('click', () => {
      const newdata = this.getStoredData().filter((data) => !data.completed);

      newdata.forEach((item, index) => {
        item.index = index;
      });

      localStorage.setItem('data', JSON.stringify(newdata));
      // window.location.reload();
      this.read();
    });
  }

  update() {
    const btnitems = document.querySelectorAll('#dot');
    const Input = document.createElement('input');
    const checkboxes = document.querySelectorAll('#checkbox');
    Input.className = 'InputUpdate';
    const newdata = this.getStoredData();

    checkboxes.forEach((checkboxe) => {
      checkboxe.addEventListener('change', (e) => {
        this.getStoredData().forEach((item) => {
          if (item.index === +e.target.dataset.id) {
            item.completed = true;
            const index = newdata.findIndex((item) => item.index === +e.target.dataset.id);
            newdata[index].completed = true;

            localStorage.setItem('data', JSON.stringify(newdata));
          }
        });
        e.target.nextElementSibling.style.textDecoration = '2px black line-through';
      });
    });

    btnitems.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const btntdot = e.target.parentElement;
        const deletebtn = btntdot.nextElementSibling;
        const formTarget = btntdot.previousElementSibling.children[2];
        const h2 = formTarget.previousElementSibling;

        btntdot.classList.add('hidden');
        deletebtn.classList.remove('hidden');
        deletebtn.style.color = 'red';
        formTarget.style.display = 'flex';
        h2.classList.add('hidden');

        formTarget.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = e.target.querySelector('input');
          const { value } = input;
          const itemIndex = input.dataset.parentindex;

          const newget = [...this.getStoredData()];
          formTarget.style.display = 'none';
          btntdot.classList.remove('hidden');
          deletebtn.classList.add('hidden');
          h2.classList.remove('hidden');

          newget.filter((data) => {
            if (data.index === +itemIndex) {
              const item = newget[itemIndex];
              item.description = value;
              localStorage.setItem('data', JSON.stringify(newget));
              this.read();
            }
            return newget;
          });
        });
      });
    });
  }

  read() {
    const newData = this.getStoredData();

    listItems.innerHTML = '';
    newData.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'Item';

      const listItem = `
    <div class="description">
    <input type="checkbox" name="checkbox" id="checkbox" data-id=${item.index}>
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
    this.Clear();
  }

  create(dataObj) {
    dataObj.index = this.newData.length;
    this.newData.push(dataObj);
    localStorage.setItem('data', JSON.stringify(this.newData));
    this.read();
  }
}

const renderDomContentDb = () => {
  const newData = JSON.parse(localStorage.getItem('data') || '[]');
  const task = new Task(newData);
  reloadDom();
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
