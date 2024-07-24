import Home from 'pages/Home';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './pages-components/shared-layout/SharedLayout';
import Movies from '../pages/Movies';
import ErrorPage from './pages-components/Error';
const MoviesInfo = lazy(() =>
  import('./pages-components/movie-info/MoviesInfo')
);
const MovieCastInfo = lazy(() =>
  import('./pages-components/MovieCastInfo/MovieCastInfo')
);
const MovieReviewsInfo = lazy(() =>
  import('./pages-components/MovieReviewsInfo/MovieReviewsInfo')
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="movies/:movieId" element={<MoviesInfo />}>
          <Route path="cast" element={<MovieCastInfo />} />
          <Route path="reviews" element={<MovieReviewsInfo />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
