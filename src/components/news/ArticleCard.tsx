import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';

interface ArticleCardProps {
    title: string;
    description?: string;
    imageUrl?: string;
    sourceName: string;
    publishedAt: string;
    onReadMore: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    description,
    imageUrl,
    sourceName,
    publishedAt,
    onReadMore,
}) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column' }, // Stacks vertically on mobile
                marginBottom: 2,
                boxShadow: 3,
                height:'500px'
            }}
        >
            {/* Image Section */}
            {imageUrl && <CardMedia
                component="img"
                image={imageUrl || 'https://fastly.picsum.photos/id/634/200/200.jpg?hmac=3WUmj9wMd1h3UZICk1C5iydU5fixjx0px9jw-LBezgg'} // Fallback for missing image
                alt={title}
                sx={{
                    width: { xs: '100%', sm: '100%' }, // Full width on mobile, fixed width on larger screens
                    height: { xs: '200px', sm: '200px' }, // Fixed height on mobile
                    objectFit: 'cover',
                }}
            />}


            {/* Content Section */}
            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {/* Title */}
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    {title.length>100?`${title.substring(0,100)}...`:title}
                </Typography>

                {/* Description */}
                {description && <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    {description.length > 50 ? `${description.substring(0, 50)}...` : description}
                </Typography>}


                {/* Metadata */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        marginBottom: 1,
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Source: {sourceName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Published: {new Date(publishedAt).toLocaleDateString()}
                    </Typography>
                </Box>

                {/* Read More Button */}
                <Button variant="contained" size="small" onClick={onReadMore}>
                    Read More
                </Button>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
