import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from 'react';
import React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {InputLabel, Select, MenuItem, Box} from '@mui/material';


function SpendingPieChart({ data, timeframe, allTimeData }) {
  const [selectedPeriod, setSelectedPeriod] = useState(() => (data && data.length > 0 ? data[0][0] : ''));

  // Update selectedPeriod if data changes and selectedPeriod is not in data
  React.useEffect(() => {
    if (data && data.length > 0 && (!selectedPeriod || !data.find(([period]) => period === selectedPeriod))) {
      setSelectedPeriod(data[0][0]);
    }
  }, [data, selectedPeriod]);

  // Get the pie chart data for the selected period
  const getPeriodPieChartData = () => {
    if (!data || data.length === 0 || !selectedPeriod) return [];
    const selectedData = data.find(([period]) => period === selectedPeriod);
    if (!selectedData) return [];
    const [, periodData] = selectedData;
    // Convert categories to pie chart format
    return Object.entries(periodData.categories).map(([category, categoryData], index) => ({
      id: index,
      value: categoryData.total,
      label: category,
    }));
  };

  // Get all-time pie chart data
  const getAllTimePieChartData = () => {
    // Use allTimeData if provided, otherwise fall back to data
    const source = (allTimeData && allTimeData.length > 0) ? allTimeData : (data || []);
    if (!source || source.length === 0) return [];
    // Sum up all categories across all periods
    const categoryTotals = {};
    source.forEach(([, d]) => {
      Object.entries(d.categories).forEach(([category, catData]) => {
        categoryTotals[category] = (categoryTotals[category] || 0) + (catData.total || 0);
      });
    });
    return Object.entries(categoryTotals).map(([category, total], index) => ({
      id: index,
      value: total,
      label: category,
    }));
  };

  // Get period label based on timeframe
  const getPeriodLabel = () => {
    switch (timeframe) {
      case 'daily': return 'Select Day';
      case 'weekly': return 'Select Week';
      case 'monthly': return 'Select Month';
      default: return 'Select Period';
    }
  };

  // Get total spending for selected period
  const getPeriodTotalSpending = () => {
    if (!selectedPeriod || !data) return 0;
    const selectedData = data.find(([period]) => period === selectedPeriod);
    return selectedData ? selectedData[1].total : 0;
  };

  // Get total spending for all time
  const getAllTimeTotalSpending = () => {
    const pieData = getAllTimePieChartData();
    return pieData.reduce((sum, item) => sum + item.value, 0);
  };

  const periodPieData = getPeriodPieChartData();
  const allTimePieData = getAllTimePieChartData();

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%', mt: 2 }}>
      {/* All-Time Pie Chart */}
      <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: 0, width: '100%' }}>
        <Typography variant="h6" gutterBottom>All-Time Spending by Category</Typography>
        <Typography sx={{ mb: 2, fontWeight: 'bold' }}>
          Total spending (All Time): {getAllTimeTotalSpending()}฿
        </Typography>
        <Box sx={{ width: '100%', minHeight: 250, display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          {allTimePieData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: allTimePieData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              width={350}
              height={300}
              sx={{ width: '100%', minWidth: 250 }}
            />
          ) : (
            <Typography color="text.secondary">No spending data available for all time.</Typography>
          )}
        </Box>
      </Paper>
      {/* Period Pie Chart */}
      <Paper elevation={3} sx={{ flex: 1, p: 2, minWidth: 0, width: '100%' }}>
        <Typography variant="h6" gutterBottom>Spending Breakdown by Category - Period</Typography>
        {/* Period selector */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <InputLabel htmlFor="period-select" sx={{ mr: 2 }}>
            {getPeriodLabel()}:
          </InputLabel>
          <Select
            id="period-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {data.map(([period]) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {/* Show total spending for selected period */}
        {selectedPeriod && (
          <Typography sx={{ mb: 2, fontWeight: 'bold' }}>
            Total spending for {selectedPeriod}: {getPeriodTotalSpending()}฿
          </Typography>
        )}
        <Box sx={{ width: '100%', minHeight: 250, display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          {periodPieData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: periodPieData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              width={350}
              height={300}
              sx={{ width: '100%', minWidth: 250 }}
            />
          ) : selectedPeriod ? (
            <Typography>No spending data available for the selected period.</Typography>
          ) : (
            <Typography>Please select a period to view the spending breakdown.</Typography>
          )}
        </Box>
      </Paper>
    </Stack>
  );
}

export default SpendingPieChart;