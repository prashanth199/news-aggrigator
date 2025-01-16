import React, { useState} from 'react';
import {
    Box,
    Button,
    Drawer,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    List,
    ListItem,
} from '@mui/material';

import { useGetSourcesQuery } from '../../redux/services/headlinesApi';

interface FilterDrawerProps {
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: any) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ open, onClose, onApplyFilters }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    //   const [fetchSources, { data: sourcesData }] = useGetSourcesQuery();
    const { data: sourcesData } = useGetSourcesQuery(selectedCategory);
    

    const maxSources = 20;

    // useEffect(() => {
    //     // Fetch sources when the category changes
    //     fetchSources(selectedCategory === 'all' ? {} : { category: selectedCategory });
    // }, [selectedCategory, fetchSources]);

    const handleSourceToggle = (sourceId: string) => {
        if (selectedSources.includes(sourceId)) {
            setSelectedSources(selectedSources.filter((id) => id !== sourceId));
        } else if (selectedSources.length < maxSources) {
            setSelectedSources([...selectedSources, sourceId]);
        }
    };

    const handleApplyFilters = () => {
        onApplyFilters({ fromDate, toDate, selectedSources });
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6">Filters</Typography>

                {/* Filter by Date */}
                <Box sx={{ marginY: 2 }}>
                    <Typography variant="subtitle1">Filter by Date</Typography>
                    <TextField
                        type="date"
                        label="From Date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        type="date"
                        label="To Date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    
                </Box>

                {/* Filter by Categories */}
                <Box sx={{ marginY: 2 }}>
                    <Typography variant="subtitle1">Filter by Categories</Typography>
                    <RadioGroup
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <FormControlLabel value="" control={<Radio />} label="All" />
                        <FormControlLabel value="business" control={<Radio />} label="Business" />
                        <FormControlLabel value="entertainment" control={<Radio />} label="Entertainment" />
                        <FormControlLabel value="general" control={<Radio />} label="General" />
                        <FormControlLabel value="health" control={<Radio />} label="Health" />
                        <FormControlLabel value="science" control={<Radio />} label="Science" />
                        <FormControlLabel value="sports" control={<Radio />} label="Sports" />
                        <FormControlLabel value="technology" control={<Radio />} label="Technology" />
                    </RadioGroup>
                </Box>

                {/* Filter by Sources */}
                <Box sx={{ marginY: 2 }}>
                    <Typography variant="subtitle1">Filter by Sources</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Selected: {selectedSources.length}/{maxSources}
                    </Typography>
                    <List>
                        {sourcesData?.sources.map((source: any) => (
                            <ListItem key={source.id} disablePadding>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedSources.includes(source.id)}
                                            onChange={() => handleSourceToggle(source.id)}
                                        />
                                    }
                                    label={source.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </Button>
            </Box>
        </Drawer>
    );
};

export default FilterDrawer;
