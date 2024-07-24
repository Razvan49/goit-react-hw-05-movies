import { useFetchMovies } from 'components/utils/fetchMovies';
import { getTrendMovieUrl } from 'components/utils/utils';
import { Link, useLocation } from 'react-router-dom';
import Loading from 'components/pages-components/Loading/Loading';
import ErrorPage from 'components/pages-components/Error';
import NoResultFound from 'components/pages-components/NoResultFound';

const Home = () => {
  const location = useLocation();
  const { isLoading, isError, data } = useFetchMovies(getTrendMovieUrl);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  if (data) {
    const movies = data.results;
    if (movies.length === 0) {
      return <NoResultFound />;
    }
    return (
      <main className="home-main">
        <h1 className="home-title">trending today</h1>
        <ul className="movies-list">
          {movies.map((movie, index) => {
            return (
              <li key={movie.id}>
                <span>{index + 1}</span>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.title || movie.name || movie.original_title}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
};
export default Home;
// to={`/movies/${movie.id}`} state={{ from: location }
