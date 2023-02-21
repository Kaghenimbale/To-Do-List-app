const renderToDo = () => {
  const listItems = document.getElementById('list-items');

  const newData = [
    {
      description: 'Wash Car',
      completed: false,
      index: 0,
    },

    {
      description: 'Clean Clothes',
      completed: false,
      index: 1,
    },

    {
      description: 'Running',
      completed: false,
      index: 2,
    },
    {
      description: 'Travel',
      completed: false,
      index: 2,
    },
  ];

  listItems.innerHTML = '';
  newData.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'Item';

    const listItem = `
    <div class="description">
    <span class="material-symbols-outlined">check_box_outline_blank</span>
    <h2>${item.description}</h2>
    </div>
    <button class="btn-dot"><span class="material-symbols-outlined">more_vert</span></button>
    `;

    li.innerHTML = listItem;

    listItems.appendChild(li);
  });
};

export default renderToDo;
