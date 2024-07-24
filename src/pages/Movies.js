/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from 'react';
import style from './Movies.module.css';
import { useSearchParams } from 'react-router-dom';
import SearchedMovie from 'components/pages-components/SearchedMovie/SearchedMovie';

const Movies = () => {
  const searchInputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = searchInputRef.current.value;
    setSearchParams({ query: searchValue });
  };

  return (
    <main>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={style.searchInput}
          placeholder="Search movies..."
          ref={searchInputRef}
        />
        <button type="submit" className={style.submitBtn}>
          Search
        </button>
      </form>
      {searchParams.get('query') && <SearchedMovie />}
    </main>
  );
};
export default Movies;
