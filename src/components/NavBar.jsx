import * as React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function NavBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // <nav>
        //     <ul>
        //         <li>
        //             <Link to="/spending-tracker/">Dashboard</Link>
        //         </li>
        //         <li>
        //             <Link to="/spending-tracker/journal">Journal</Link>
        //         </li>
        //     </ul>
        // </nav>

        <Box sx={{ width: '100', bgcolor: 'primary.main' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                // TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
                sx={{
                    '.MuiTabs-flexContainer': { color: '#fff' },
                }}
            >
                <Tab
                    label="Dashboard"
                    component={Link}
                    to="/"
                    sx={{
                        color: '#fff',
                        fontWeight: 600,
                        '&.Mui-selected': { color: '#fff' },
                    }}
                />
                <Tab
                    label="Journal"
                    component={Link}
                    to="/journal"
                    sx={{
                        color: '#fff',
                        fontWeight: 600,
                        '&.Mui-selected': { color: '#fff' },
                    }}
                />
            </Tabs>
        </Box>
    )
        ;
}

export default NavBar;