import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from 'components/utils/utils';
import { useFetchMovies } from 'components/utils/fetchMovies';
import style from './MovieCastInfo.module.css';
import avatarImg from './avatartImage.png';
import Loading from '../Loading/Loading';
import ErrorPage from '../Error';
import { Empty } from 'antd';

const MovieCastInfo = () => {
  const { movieId } = useParams();
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

  const { isLoading, isError, data } = useFetchMovies(url);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  if (data) {
    const cast = data.cast;

    if (cast.length === 0) {
      return (
        <div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <h2 style={{ textAlign: 'center' }}>No cast for this movie</h2>
        </div>
      );
    }

    return (
      <ul className={style.movieCastList}>
        {cast.map(movieCast => {
          const { cast_id, profile_path, character, original_name } = movieCast;
          return (
            <li key={cast_id} className={style.movieCastItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : avatarImg
                }
                alt={character}
                className={style.castImage}
              />
              <p className={style.castName}>Character: {character}</p>
              <p className={style.castName}>Name: {original_name}</p>
            </li>
          );
        })}
      </ul>
    );
  }
};
export default MovieCastInfo;
