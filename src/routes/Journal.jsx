import { useState, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import SpendingTable from '../components/SpendingTable'
import spendingCategory from '../data/spending_category.json';

function Journal() {

    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
    const [customCategory, setCustomCategory] = useLocalStorage('customCategory', []);
    const [lastId, setLastId] = useLocalStorage('lastId', 0);

    const amount = useRef();
    const category = useRef();
    const date = useRef();

    const today = new Date().toISOString().split('T')[0];
    console.log(today);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!amount.current.value || !category.current.value || !date.current.value) {
            alert('Please fill out all fields.');
            return;
        }

        const newRecord = {
            spending_id: lastId + 1,
            amount: parseInt(amount.current.value),
            category: category.current.value,
            date: date.current.value,
        }
        console.log('New Record:', newRecord);
        setSpendingData([...spendingData, newRecord]);
        setLastId(lastId + 1);
        amount.current.value = '';
        category.current.value = '';
        date.current.value = today; // Reset date to
    };

    const onDeleteItem = (index) => {
        const updatedData = [...spendingData]; // Create a shallow copy of the array
        updatedData.splice(index, 1); // Remove the item at the specified index
        setSpendingData(updatedData); // Update state with the modified array
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Amount: </label>
                <input type="number" ref={amount} />
                <label htmlFor="category">Category: </label>
                <select name="category" id="category" ref={category} defaultValue={""}>
                    <option value={""}>
                        Select a category
                    </option>
                    {spendingCategory.map((item, index) => (
                        <option key={index} value={item.category}>{item.category}</option>
                    ))}
                    <option disabled>Custom Category</option>
                    {customCategory.map((item, index) => (
                        <option key={index} value={item.category}>{item.category}</option>
                    ))}
                </select>
                <label htmlFor="date">Date: </label>
                <input type="date" ref={date} defaultValue={today} />
                <button type="submit">Add Record</button>
            </form>

            <SpendingTable
                data={spendingData}
                onDeleteRecord={onDeleteItem} />
        </>
    );
}


export default Journal;