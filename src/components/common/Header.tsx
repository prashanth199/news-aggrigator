import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SearchBar from './SearchBar.tsx';

interface HeaderProps {
    onSearch: (query: string) => void;
}


const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    padding: '10px',
                }}
            >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                    NewsHub
                </Typography>
                <Box sx={{ width: { xs: '100%', sm: '50%' }, marginTop: { xs: '10px', sm: 0 } }}>
                    <SearchBar onSearch={onSearch} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
