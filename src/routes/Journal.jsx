import { useLocalStorage } from 'react-use';
import { useForm, Controller } from 'react-hook-form';
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Typography, 
  Container,
  Paper,
  FormHelperText
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import SpendingTable from '../components/SpendingTable';
import spendingCategory from '../data/spending_category.json';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Journal() {
    

    const [spendingData, setSpendingData] = useLocalStorage('spendingData', []);
    const [customCategory, setCustomCategory] = useLocalStorage('customCategory', []);
    const [lastId, setLastId] = useLocalStorage('lastId', 0);

    const today = new Date().toISOString().split('T')[0];
    const { 
        control, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            amount: '',
            category: '',
            date: today
        }
    });

    const onSubmit = (data) => {
        const newRecord = {
            spending_id: lastId + 1,
            amount: parseInt(data.amount),
            category: data.category,
            date: data.date,
        };
        
        console.log('New Record:', newRecord);
        setSpendingData([...spendingData, newRecord]);
        setLastId(lastId + 1);
        
        // Reset form with today's date
        reset({
            amount: '',
            category: '',
            date: today
        });
    };

    const onDeleteItem = (index) => {
        const updatedData = [...spendingData];
        updatedData.splice(index, 1);
        setSpendingData(updatedData);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    <BookmarkIcon sx={{ mr: 2, fontSize: 'inherit' }} />
                    Journal
                </Typography>
            </Box>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Spending Record
                </Typography>
                
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        maxWidth: 600
                    }}
                >
                    <Controller
                        name="amount"
                        control={control}
                        rules={{ 
                            required: 'Amount is required',
                            min: { value: 1, message: 'Amount must be greater than 0' }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Amount (฿)"
                                type="number"
                                variant="outlined"
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.category}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    {...field}
                                    label="Category"
                                >
                                    {spendingCategory.map((item, index) => (
                                        <MenuItem key={index} value={item.category}>
                                            {item.category}
                                        </MenuItem>
                                    ))}
                                    {customCategory.length > 0 && (
                                        <MenuItem disabled>
                                            <em>Custom Categories</em>
                                        </MenuItem>
                                    )}
                                    {customCategory.map((item, index) => (
                                        <MenuItem key={`custom-${index}`} value={item.category}>
                                            {item.category}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.category && (
                                    <FormHelperText>{errors.category.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: 'Date is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Date"
                                type="date"
                                variant="outlined"
                                error={!!errors.date}
                                helperText={errors.date?.message}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        Add Record
                    </Button>
                </Box>
            </Paper>

            <SpendingTable
                data={spendingData}
                onDeleteRecord={onDeleteItem}
            />
        </Container>
    );
}

export default Journal;