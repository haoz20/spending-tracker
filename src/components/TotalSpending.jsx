
import { use } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FormControl, InputLabel, Select, MenuItem, Paper, Stack, Typography, Box } from '@mui/material';
import SpendingLineChart from './LineChart';
import SpendingPieChart from './PieChart';

function TotalSpending({ data }) {
    const [spendingData, setSpendingData] = useState(data);
    const [filteredData, setFilteredData] = useState([]);
    const [allTimeData, setAllTimeData] = useState([]);

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

    // Generate all-time data (always daily for the all-time chart)
    useEffect(() => {
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

        // Sort by date for all-time chart
        const sortedAllTimeData = Object.entries(groupByDay).sort(([a], [b]) =>
            new Date(a) - new Date(b)
        );
        setAllTimeData(sortedAllTimeData);
    }, [spendingData]);

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
                    const month = new Intl.DateTimeFormat("en-US", { month: 'long', year: 'numeric' }).format(date);
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

            <Box style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="timeframe-label">Timeframe</InputLabel>
                    <Select
                        labelId="timeframe-label"
                        id="timeframe"
                        value={timeframe}
                        label="Timeframe"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                </FormControl>
                <Typography style={{ margin: 0, fontWeight: 700, color: '#1976d2', background: '#e3f2fd', borderRadius: 6, padding: '4px 12px' }}>
                    Total Spending of all time: <span style={{ color: '#c76a37ff', fontWeight: 900 }}>{totalSpending}฿</span>
                </Typography>
            </Box>
            <List sx={{ maxHeight: 300, overflow: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                {filteredData.map(([month, monthData]) => (
                    <ListItem key={month} alignItems="flex-start" sx={{ display: 'block', borderBottom: '1px solid #eee', fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 600 }}>
                        <span style={{ fontWeight: 700 }}>{month} <span style={{ color: '#c76a37ff', fontWeight: 700 }}>{monthData.total}฿</span></span>
                        <List sx={{ pl: 2 }}>
                            {Object.entries(monthData.categories).map(([category, { total }]) => (
                                <ListItem key={category} sx={{ py: 0.5, px: 0, fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 400 }}>
                                    <span style={{ fontWeight: 500 }}>{category}</span>: <span style={{ color: '#1976d2', fontWeight: 600 }}>{total}฿</span>
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                ))}
            </List>


            <Stack direction={{ xs: 'row', md: 'column' }} spacing={2} sx={{ width: '100%', mt: 2 }}>
                <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>Line Chart</Typography>
                    <SpendingLineChart
                        data={filteredData}
                        timeframe={timeframe}
                        allTimeData={allTimeData}
                        title="All Time Spending"
                    />
                </Paper>
                <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>Pie Chart</Typography>
                    <SpendingPieChart
                        data={filteredData}
                        timeframe={timeframe}
                        allTimeData={allTimeData}
                    />
                </Paper>
            </Stack>
        </>
    )
};

export default TotalSpending;