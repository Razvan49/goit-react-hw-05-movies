import { useFetchMovies } from 'components/utils/fetchMovies';
import { getTrendMovieUrl } from 'components/utils/utils';
import { Link, useLocation } from 'react-router-dom';
import Loading from 'components/pages-components/Loading/Loading';
import ErrorPage from 'components/pages-components/Error/Error';
import NoResultFound from 'components/pages-components/Error/NoResultFound';

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
        <h1 className="home-title">Trending Today</h1>
        <ul className="movies-list">
          {movies.map((movie, index) => {
            const imgSrc = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
            return (
              <li key={movie.id} className="movie-item">
                <span>{index + 1}</span>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  <img
                    src={imgSrc}
                    alt={movie.title || movie.name || movie.original_title}
                  />
                  <p>{movie.title || movie.name || movie.original_title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  return null; // In case no data is returned
};

export default Home;
