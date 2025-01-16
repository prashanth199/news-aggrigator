import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface Article {
  title: string;
  description: string;
  urlToImage: string;
  source: { name: string };
  publishedAt: string;
}

export const headlinesApi = createApi({
  reducerPath: 'headlinesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `d06acb4c8a42494eb1ac4cef5051fc0a`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTop6Headlines: builder.query<Article[], void>({
      query: () => 'top-headlines?country=us&pageSize=6',
      transformResponse: (response: { articles: Article[] }) => response.articles,
    }),
    getTopHeadlines: builder.query<Article[], void>({
      query: () => 'top-headlines',
      transformResponse: (response: { articles: Article[] }) => response.articles
    }),
    getPaginatedHeadlines: builder.query({
      query: ({ page, pageSize }) => ({
        url: 'top-headlines',
        params: {
          country: 'us', // Adjust based on requirements
          page,
          pageSize,
        },
      }),
    }),
    getSources: builder.query({
      query: (category) => ({
        url: category!==''?`top-headlines/sources?category=${category}`:`top-headlines/sources`
      })
    })



  }),
});

export const { useGetTop6HeadlinesQuery, useGetTopHeadlinesQuery, useGetPaginatedHeadlinesQuery, useGetSourcesQuery } = headlinesApi;
