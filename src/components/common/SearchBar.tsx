import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search articles..."
      value={searchQuery}
      onChange={handleInputChange}
      slotProps={{
        input:{
            endAdornment: <InputAdornment position="end">
            <IconButton onClick={handleSearch} aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      }}
      sx={{
        backgroundColor: 'white',
        borderRadius: 1,
      }}
    />
  );
};

export default SearchBar;
