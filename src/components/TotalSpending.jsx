import { BreakfastDining } from '@mui/icons-material';
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

    const weekOfYear = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        startOfYear.setDate(startOfYear.getDate() + (startOfYear.getDay() % 7));
        return Math.round((date - startOfYear) / (7 * 24 * 3600 * 1000));
    };

    useEffect(() => {
        switch (timeframe) {
            case 'daily':
                const groupByDay = spendingData.reduce((byDay, item) => {
                    const date = new Date(item.date).toISOString().split('T')[0];
                    const category = item.category;
                    if (!byDay[date]) {
                        byDay[date] = {
                            categories: {},
                            total: 0
                        };
                    };
                    if (!byDay[date].categories[category]) {
                        byDay[date].categories[category] = {
                            total: 0,
                            items: []
                        }
                    }
                    byDay[date].categories[category].total += item.amount;
                    byDay[date].categories[category].items.push(item);
                    byDay[date].total += item.amount;
                    return byDay;
                }, {});
                setFilteredData(Object.entries(groupByDay));
                break;
            case 'weekly':
                const groupByWeek = spendingData.reduce((byWeek, item) => {
                    const date = new Date(item.date);
                    const week = weekOfYear(date);
                    const year = date.getFullYear();
                    const category = item.category;
                    const key = `${year}-Week${week}`;
                    if (!byWeek[key]) {
                        byWeek[key] = {
                            categories: {},
                            total: 0
                        };
                    };
                    if (!byWeek[key].categories[category]) {
                        byWeek[key].categories[category] = {
                            total: 0,
                            items: []
                        }
                    }
                    byWeek[key].categories[category].total += item.amount;
                    byWeek[key].categories[category].items.push(item);
                    byWeek[key].total += item.amount;
                    return byWeek;
                }, {});
                setFilteredData(Object.entries(groupByWeek));
                break;
            case 'monthly':
                const groupByMonth = spendingData.reduce((byMonth, item) => {
                    const date = new Date(item.date);
                    const month = new Intl.DateTimeFormat("en-US", { month: 'long', year: 'numeric' }).format(date); /* things to note */
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


