import { useState, useRef } from 'react'
import { useLocalStorage } from 'react-use'
import { ListItem } from '@mui/material';
import TotalSpending from '../components/TotalSpending';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [customCategory, setCustomCategory] = useLocalStorage('customCategory', []);

  const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);

  const category = useRef();
  const description = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    if (!category.current.value || !description.current.value) {
      alert('Please fill out all fields.');
      return;
    }

    const newCategory = {
      category: category.current.value,
      description: description.current.value,
    }
    console.log('New Category:', newCategory);
    setCustomCategory([...customCategory, newCategory]);

  }


  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" ref={category} />
        <br />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={description} />
        <br />
        <button type="submit">Save New Category</button>
      </form>

      <TotalSpending data={spendingData} />

    </>


  )
}

export default Dashboard;