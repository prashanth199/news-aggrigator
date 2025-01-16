import React, { useState } from 'react';

import {
    Box,
    Typography,
    CircularProgress,
    Pagination,
    Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2'

import { useSearchArticlesQuery } from '../redux/services/everythingApi';
import ArticleCard from '../components/news/ArticleCard';
import { useLocation } from 'react-router';
import FilterDrawer from '../components/news/FilterDrawer';

const SearchResultsPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';

    const [page, setPage] = useState(1);
    const pageSize = 9; // Number of articles per page

    const [filters, setFilters] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);

    console.log(filters)

    const { data, isLoading, isFetching, error } = useSearchArticlesQuery(
        { query, page, pageSize, ...filters },
        { skip: !query } // Skip the query if no search term is provided
    );

    

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleApplyFilters = (appliedFilters: any) => {
        setFilters(appliedFilters);
        setDrawerOpen(false);
      };

    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);

    return (
        <Box sx={{ padding: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography
                    variant="h6"
                    sx={{ marginBottom: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}
                >
                    Search Results for "{query}"
                </Typography>
                <Button variant="outlined" onClick={handleOpenDrawer}>
                    Filter
                </Button>
            </Box>

            <FilterDrawer open={drawerOpen} onClose={handleCloseDrawer} onApplyFilters={handleApplyFilters} />



            {isLoading || isFetching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">An error occurred while fetching data.</Typography>
            ) : data?.articles?.length ? (
                <>
                    <Grid container spacing={2}>
                        {data.articles.map((article, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <ArticleCard
                                    title={article.title}
                                    description={article.description || 'No description available.'}
                                    imageUrl={article.urlToImage || 'https://via.placeholder.com/300'}
                                    sourceName={article.source.name}
                                    publishedAt={article.publishedAt}
                                    onReadMore={() => window.open(article.url, '_blank')}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Pagination
                        count={Math.ceil(data.totalResults / pageSize)} // Total pages
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 3,
                        }}
                    />
                </>
            ) : (
                <Typography>No results found for "{query}".</Typography>
            )}
        </Box>
    );
};

export default SearchResultsPage;
