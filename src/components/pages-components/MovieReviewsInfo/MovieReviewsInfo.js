import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from 'components/utils/utils';
import { useFetchMovies } from 'components/utils/fetchMovies';
import avatarImg from '../MovieCastInfo/avatartImage.png';
import style from './MovieReviewsInfo.module.css';
import Loading from '../Loading/Loading';
import ErrorPage from '../Error';
import { Empty } from 'antd';

const MovieReviewsInfo = () => {
  const { movieId } = useParams();
  const url = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`;

  const { isLoading, isError, data } = useFetchMovies(url);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  if (data) {
    const reviewData = data.results;

    if (reviewData.length === 0) {
      return (
        <div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <h2 style={{ textAlign: 'center' }}>No review for this movie</h2>
        </div>
      );
    } else {
      return (
        <div>
          {reviewData.map(review => {
            const { name, avatar_path } = review.author_details;
            const reviewContent = review.content;
            const id = review.id;
            return (
              <div key={id}>
                <h3>Author: {name || 'Unknown'}</h3>
                <img
                  src={
                    avatar_path
                      ? `https://image.tmdb.org/t/p/w500${avatar_path}`
                      : avatarImg
                  }
                  alt={name}
                  className={style.reviewImage}
                />
                <p>
                  {reviewContent ? reviewContent : 'no review for this movie'}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
  }
};
export default MovieReviewsInfo;
