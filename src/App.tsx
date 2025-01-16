import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/Layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import store from './redux/store.ts';
import { Provider } from 'react-redux';
import ShowAllHeadlinesPage from './pages/ShowAllHeadlines.tsx';
import SearchResultsPage from './pages/SearchResults.tsx';

function App() {



  return (
    <>
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
