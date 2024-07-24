import { API_KEY, BASE_URL } from 'components/utils/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ErrorPage from '../Error';
import NoResultFound from '../NoResultFound';

const SearchedMovie = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const location = useLocation();
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        setData(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
      <div>
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
      </div>
    );
  }
};
export default SearchedMovie;
