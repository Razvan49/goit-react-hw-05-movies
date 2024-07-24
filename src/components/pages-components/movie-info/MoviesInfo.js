import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { API_KEY, BASE_URL } from 'components/utils/utils';
import { useFetchMovies } from 'components/utils/fetchMovies';
import style from './MovieInfo.module.css';
import Loading from '../Loading/Loading';
import ErrorPage from '../Error';

const MoviesInfo = () => {
  const { movieId } = useParams();
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  const { isLoading, isError, data } = useFetchMovies(url);
  const location = useLocation();
  const backLink = location.state?.from ?? -2;

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  if (data) {
    const img = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    const year = data.release_date ? data.release_date.split('-')[0] : 'N/A';
    const name = data.title || data.name;
    const userScore = Math.round(data.vote_average * 10);
    const genres = getGenres(data.genres);
    const defaultImg =
      'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
    return (
      <main className={style.movieInfoContainer}>
        <Link to={backLink} className={style.movieInfoBtn}>
          Go back
        </Link>
        <div className={style.movieInfo}>
          <img src={data.poster_path ? img : defaultImg} alt={name} />
          <div className={style.movieInfoText}>
            <h2>{name + ' ' + year}</h2>
            <p>User Score: {userScore}%</p>
            <h2>Overview</h2>
            <p>{data.overview}</p>
            <h2>Genres</h2>
            <p>{genres}</p>
          </div>
        </div>
        <div className={style.additionalInfo}>
          <h3>Additional Info</h3>
          <ul>
            <li>
              <Link className={style.moreInfoBtn} to={`cast`}>
                Cast
              </Link>
            </li>
            <li>
              <Link className={style.moreInfoBtn} to={`reviews`}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </main>
    );
  }
};

function getGenres(arr) {
  let types = '';
  arr.forEach(genre => {
    types += genre.name + ' ';
  });
  types = types ? types : 'N/A';
  return types;
}

export default MoviesInfo;
