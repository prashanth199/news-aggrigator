import React, { useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Pagination,

} from '@mui/material';
import Grid from '@mui/material/Grid2';


import ArticleCard from '../components/news/ArticleCard';
import { useGetPaginatedHeadlinesQuery } from '../redux/services/headlinesApi';




const ShowAllHeadlinesPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const pageSize = 9; // Number of articles per page
    const { data, isLoading, error } = useGetPaginatedHeadlinesQuery({ page, pageSize });
    

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const DisplayOnLoad = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Box>
        )
    }

    const DisplayOnError = () => {
        return <Typography>No headlines available.</Typography>
    }
   
    const DisplayOnSuccess = ({ articles }) => {
        return (
            <Grid container spacing={2}>
                {articles.map((article, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <ArticleCard
                            title={article.title}
                            description={article.description}
                            imageUrl={article.urlToImage}
                            sourceName={article.source.name}
                            publishedAt={article.publishedAt}
                            onReadMore={() => window.open(article.url, '_blank')}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <Box sx={{ padding: { xs: 2, md: 4 } }}>
            <Typography
                variant="h6"
                sx={{ marginBottom: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}
            >
                All Headlines
            </Typography>

            {isLoading && (
                <DisplayOnLoad />
            )}

            {error && (<DisplayOnError />)}


            {data?.articles?.length > 0 && (
                <>
                    <DisplayOnSuccess articles={data.articles} />

                    <Pagination
                        count={Math.ceil(data.totalResults / pageSize)}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 3,
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default ShowAllHeadlinesPage;
