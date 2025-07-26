import * as React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/spending-tracker/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/spending-tracker/journal">Journal</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;