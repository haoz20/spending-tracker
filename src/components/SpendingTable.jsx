import spendingCategory from '../data/spending_category.json';


function SpendingTable() {



    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {spendingCategory.map((item, index) => (
                    <tr key={index}>
                        <td>{item.spending_id}</td>
                        <td></td>
                        <td></td>
                        <td>{item.category}</td>
                        <td></td>
                        <td>{item.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SpendingTable;