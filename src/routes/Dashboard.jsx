import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Category as CategoryIcon,
  Analytics as AnalyticsIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingIcon,
  Paid as PaidIcon
} from '@mui/icons-material';
import TotalSpending from '../components/TotalSpending';

function Dashboard() {
  const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
  const [customCategory, setCustomCategory] = useLocalStorage('customCategory', []);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: '',
      description: ''
    }
  });

  useEffect(() => {
    const sortedData = [...spendingData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSpendingData(sortedData);
  }, []);

  const onSubmit = (data) => {
    const newCategory = {
      category: data.category,
      description: data.description,
    };

    console.log('New Category:', newCategory);
    setCustomCategory([...customCategory, newCategory]);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    reset();
  };

  // Calculate statistics
  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);
  const totalRecords = spendingData.length;
  const categoriesCount = new Set(spendingData.map(item => item.category)).size;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          <AnalyticsIcon sx={{ mr: 2, fontSize: 'inherit' }} />
          Analytics Dashboard
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WalletIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Spending
                  </Typography>
                  <Typography variant="h4" component="h2" color="primary">
                    {totalSpending}฿
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PaidIcon color="secondary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Records
                  </Typography>
                  <Typography variant="h4" component="h2" color="secondary">
                    {totalRecords}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Centered Custom Category Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <CategoryIcon />
            Add Custom Category
          </Typography>

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Category added successfully!
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Controller
              name="category"
              control={control}
              rules={{
                required: 'Category name is required',
                minLength: { value: 2, message: 'Category name must be at least 2 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category Name"
                  variant="outlined"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                required: 'Description is required',
                minLength: { value: 5, message: 'Description must be at least 5 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              sx={{
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              Save New Category
            </Button>
          </Box>

          {/* Display Custom Categories */}
          {customCategory.length > 0 && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Custom Categories ({customCategory.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {customCategory.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.category}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Full Width Spending Analytics Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center',
          textAlign: 'center',
          mb: 3
        }}>
          <AnalyticsIcon />
          Spending Analytics
        </Typography>

        {spendingData.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            <WalletIcon sx={{ mr: 1 }} />
            No spending data available. Add some records in the Journal to see analytics.
          </Alert>
        ) : (
          <TotalSpending data={spendingData} />
        )}
      </Paper>
    </Container>
  );
}

export default Dashboard;