import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { auth } from "../App";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import SearchResult from "../components/SearchResult";
function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const searchTv = useSelector((state) => state.netflix.searchTvShows);
  console.log("searchTvvvvvv?>>>>>>>", searchTv);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded, dispatch]);

  const [user, setUser] = useState(undefined);

  auth.onAuthStateChanged((currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />

      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {searchTv.length > 0 ? (
          <div className="content flex column">
            <div className="grid flex">
              {searchTv.map((tv) => {
                return (
                  <SearchResult searchMovie={tv} key={tv.id} isLiked={true} />
                );
              })}
            </div>
          </div>
        ) : movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
export default TVShows;
