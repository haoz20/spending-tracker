import { useState, useRef, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { ListItem, speedDialActionClasses } from '@mui/material';
import TotalSpending from '../components/TotalSpending';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [customCategory, setCustomCategory] = useLocalStorage('customCategory', []);

  const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);

  const category = useRef();
  const description = useRef();

  useEffect(() => {
          const sortedData = [...spendingData].sort((a, b) => new Date(b.date) - new Date(a.date));
          setSpendingData(sortedData);
      }, []);

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