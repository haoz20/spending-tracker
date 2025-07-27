
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function SpendingLineChart({ data, timeframe, allTimeData }) {
  // All-time chart data preparation
  const getAllTimeChartData = () => {
    if (!allTimeData || allTimeData.length === 0) return { dataset: [], series: [] };
    
    // Group all data by date and get unique categories
    const allCategories = [...new Set(allTimeData.flatMap(item => 
      Object.keys(item[1].categories)
    ))];
    
    // Create dataset with date and category amounts
    const dataset = allTimeData.map(([date, data]) => {
      const row = { date: new Date(date) };
      allCategories.forEach(category => {
        row[category] = data.categories[category]?.total || 0;
      });
      return row;
    });
    
    // Create series for each category
    const series = allCategories.map(category => ({
      dataKey: category,
      label: category,
      showMark: true,
    }));
    
    return { dataset, series };
  };

  // Selected timeframe chart data preparation
  const getTimeframeChartData = () => {
    if (!data || data.length === 0) return { dataset: [], series: [] };
    
    // Get unique categories from filtered data
    const categories = [...new Set(data.flatMap(item => 
      Object.keys(item[1].categories)
    ))];
    
    // Create dataset
    const dataset = data.map(([period, periodData]) => {
      const row = { period };
      categories.forEach(category => {
        row[category] = periodData.categories[category]?.total || 0;
      });
      return row;
    });
    
    // Create series for each category
    const series = categories.map(category => ({
      dataKey: category,
      label: category,
      showMark: true,
    }));
    
    return { dataset, series };
  };

  const allTimeChart = getAllTimeChartData();
  const timeframeChart = getTimeframeChartData();

  // Determine axis labels based on timeframe
  const getAxisLabel = () => {
    switch (timeframe) {
      case 'daily': return 'Days';
      case 'weekly': return 'Weeks';
      case 'monthly': return 'Months';
      default: return 'Period';
    }
  };

  return (
    <Stack direction={{ xs: 'row', md: 'column' }} spacing={2} sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: 0 }}>
        <Typography variant="h6" gutterBottom>All-Time Spending by Category</Typography>
        {allTimeChart.dataset.length > 0 ? (
          <LineChart
            dataset={allTimeChart.dataset}
            xAxis={[
              {
                dataKey: 'date',
                scaleType: 'time',
                label: 'Date',
                valueFormatter: (date) => date.toLocaleDateString(),
              },
            ]}
            yAxis={[{ width: 70 }]}
            series={allTimeChart.series}
            width={700}
            height={400}
            margin={{ left: 60, right: 40, top: 40, bottom: 60 }}
          />
        ) : (
          <Typography color="text.secondary">No data available for all-time chart</Typography>
        )}
      </Paper>
      <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: 0 }}>
        <Typography variant="h6" gutterBottom>
          Spending by Category - <span style={{ color: '#1976d2', fontWeight: 700 }}>{getAxisLabel()}</span>
        </Typography>
        {timeframeChart.dataset.length > 0 ? (
          <LineChart
            dataset={timeframeChart.dataset}
            xAxis={[
              {
                dataKey: 'period',
                scaleType: 'band',
                label: getAxisLabel(),
              },
            ]}
            yAxis={[{ width: 70, label: 'Amount (฿)' }]}
            series={timeframeChart.series}
            width={700}
            height={400}
            margin={{ left: 60, right: 40, top: 40, bottom: 60 }}
          />
        ) : (
          <Typography color="text.secondary">No data available for timeframe chart</Typography>
        )}
      </Paper>
    </Stack>
  );
}

export default SpendingLineChart;