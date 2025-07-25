
import { use } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

function TotalSpending({ data }) {
    const [spendingData, setSpendingData] = useState(data);
    const [filteredData, setFilteredData] = useState([]);

    const [timeframe, setTimeFrame] = useState('daily');
    const [totalSpending, setTotalSpending] = useState(0);

    const handleFilterChange = (e) => {
        setTimeFrame(e.target.value);
        console.log('Selected Timeframe:', e.target.value);
    }

    useEffect(() => {
        switch (timeframe) {
            case 'monthly':
                const groupByMonth = spendingData.reduce((byMonth, item) => {
                    const date = new Date(item.date);
                    const month = new Intl.DateTimeFormat("en-US", { month: 'long' }).format(date); /* things to note */
                    const category = item.category;
                    if (!byMonth[month]) {
                        byMonth[month] = {
                            categories: {},
                            total: 0
                        };
                    };
                    if (!byMonth[month].categories[category]) {
                        byMonth[month].categories[category] = {
                            total: 0,
                            items: []
                        }
                    }
                    byMonth[month].categories[category].total += item.amount;
                    byMonth[month].categories[category].items.push(item);
                    byMonth[month].total += item.amount;
                    return byMonth;
                }, {});
                console.log('Monthly Data:', groupByMonth);
                setFilteredData(Object.entries(groupByMonth));

                break;
            default:
                break;
        }
    }, [data, timeframe]);

    useEffect(() => {
        console.log('Filtered Data:', filteredData);
    }, [filteredData]);

    useEffect(() => {
        const total = spendingData.reduce((acc, item) => acc + item.amount, 0);
        setTotalSpending(total);
    }, [spendingData]);


    return (
        <>
            <select name="timeframe" id="timeframe" value={timeframe} onChange={handleFilterChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <p>Total Spending of all time: {totalSpending}฿ </p>
            <ul>

                {
                    filteredData.map(([month, monthData]) => (
                        <li key={month}>
                            <h3>{month} {monthData.total}</h3>
                            <ul>
                                {
                                    Object.entries(monthData.categories).map(([category, { total }]) => (
                                        <li key={category}>
                                            {category}: {total}฿
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }

            </ul>
        </>
    )
};

export default TotalSpending


