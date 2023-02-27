import './index.css';

const form = document.getElementById('form');
const listItems = document.getElementById('list-items');
const newData = JSON.parse(localStorage.getItem('data') || '[]');

class Task {
  constructor(newData) {
    this.newData = newData;
  }

  update() {
    const btnitems = document.querySelectorAll('#dot');
    const Input = document.createElement('input');
    const checkboxes = document.querySelectorAll('#checkbox');
    Input.className = 'InputUpdate';

    checkboxes.forEach((checkboxe) => {
      checkboxe.addEventListener('click', (e) => {
        e.target.innerText = 'done';
        e.target.style.color = 'blue';
        newData.forEach((item) => {
          if (item.index === +e.target.dataset.id) {
            item.completed = true;

            localStorage.setItem('data', JSON.stringify(newData));
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

          const newget = [...newData];
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
