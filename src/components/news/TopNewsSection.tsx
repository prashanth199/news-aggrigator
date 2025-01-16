import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ArticleCard from './ArticleCard';
import { useNavigate } from 'react-router';
import { useGetTop6HeadlinesQuery } from '../../redux/services/headlinesApi';
import Grid from '@mui/material/Grid2';
const TopStoriesSection: React.FC = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading, isError } = useGetTop6HeadlinesQuery();

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontWeight: 'bold',
          }}
        >
          Top Stories
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/all-headlines')}
          sx={{
            fontSize: { xs: '0.8rem', md: '1rem' },
            textTransform: 'none',
          }}
        >
          Show All Headlines
        </Button>
      </Box>

      {/* Top 5 Articles */}
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" sx={{ textAlign: 'center', padding: 2 }}>
          Failed to load headlines. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{
            alignItems:'stretch'
        }}>
          {articles?.map((article, index) => (
            <Grid size={{xs:12, sm:6, md:4}} key={index}>
              <ArticleCard
                title={article.title}
                description={article.description || 'No description available.'}
                imageUrl={article.urlToImage || 'https://picsum.photos/200'}
                sourceName={article.source.name}
                publishedAt={article.publishedAt}
                onReadMore={() => window.open(article.urlToImage, '_blank')}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TopStoriesSection;
