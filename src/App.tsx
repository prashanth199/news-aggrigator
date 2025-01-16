import { BrowserRouter, Route, Routes } from 'react-router';
// import Header from './components/common/Header.tsx'
// import ArticleCard from './components/news/ArticleCard.tsx';
import Layout from './pages/Layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import store from './redux/store.ts';
import { Provider } from 'react-redux';
import ShowAllHeadlinesPage from './pages/ShowAllHeadlines.tsx';
import SearchResultsPage from './pages/SearchResults.tsx';

function App() {



  return (
    <>
      {/* <Header onSearch={handleSearch} />
      
        <ArticleCard
          title="Sample News Article"
          description="This is a sample description of a news article. It provides a brief overview of the content."
          imageUrl="https://picsum.photos/200"
          sourceName="Example Source"
          publishedAt="2025-01-15T10:00:00Z"
          onReadMore={handleReadMore}
        />
        <ArticleCard
          title="Sample News Article"
          description="This is a sample description of a news article. It provides a brief overview of the content."
          imageUrl="https://picsum.photos/200"
          sourceName="Example Source"
          publishedAt="2025-01-15T10:00:00Z"
          onReadMore={handleReadMore}
        />
        <ArticleCard
          title="Sample News Article"
          description="This is a sample description of a news article. It provides a brief overview of the content."
          imageUrl="https://picsum.photos/200"
          sourceName="Example Source"
          publishedAt="2025-01-15T10:00:00Z"
          onReadMore={handleReadMore}
        /> */}

      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='all-headlines' element={<ShowAllHeadlinesPage/>}/>
              <Route path="/search" element={<SearchResultsPage />} />
            </Route>
          </Routes>
        </Provider>

      </BrowserRouter>


    </>
  )
}

export default App
