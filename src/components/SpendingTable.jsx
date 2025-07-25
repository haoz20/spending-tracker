import spendingCategory from '../data/spending_category.json';


function SpendingTable({ data, onDeleteRecord }) {
    console.log('Spending Data:', data);

    return (
        <>
            <select name="timeframe" id="timeframe">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.spending_id}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => onDeleteRecord(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SpendingTable;