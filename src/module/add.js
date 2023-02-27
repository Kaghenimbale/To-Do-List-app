import { UI } from './display.js'
export const renderDomContentDb = () => {
    const newData = JSON.parse(localStorage.getItem('data') || '[]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const InputValue = document.querySelector('#input-list').value;
        
      const dataObj = {
        description: InputValue,
        completed: false,
        index: newData.length,
      };

      const userINterface = new UI(dataObj);
      userINterface.add();
  
      form.reset();
    });
}
