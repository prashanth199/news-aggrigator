import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface Article {
    title: string;
    description: string;
    urlToImage: string;
    source: { name: string };
    publishedAt: string;
}

export const everythingApi = createApi({
    reducerPath: 'everythingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://newsapi.org/v2/',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `d06acb4c8a42494eb1ac4cef5051fc0a`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchArticles: builder.query({
            query: ({ query, page, pageSize, fromDate = '', toDate = '', selectedSources = [] }) => (
                {
                    url: 'everything',
                    params: {
                        q: query,
                        page,
                        pageSize,
                        ...(fromDate !== '' && { from: fromDate }),
                        ...(toDate !== '' && { to: toDate }),
                        ...(selectedSources.length > 0 && { sources: selectedSources.join(',') })
                    },
                }),
        }),

    }),
});

export const { useSearchArticlesQuery } = everythingApi;
