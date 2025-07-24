import { useState, useRef } from 'react'
import SpendingTable from './components/SpendingTable'
import { useLocalStorage } from 'react-use'

function App() {
  const [count, setCount] = useState(0);
  const [customCategory, setCustomCategory] = useLocalStorage('customCategory', []);

  const category = useRef();
  const description = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
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
      <button>Daily</button>
      <button>Weekly</button>
      <button>Monthly</button>
      <SpendingTable></SpendingTable>
    </>

  )
}

export default App
