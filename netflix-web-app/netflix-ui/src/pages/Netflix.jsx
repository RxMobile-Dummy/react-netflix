import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import { auth } from "../App";
import axios from "axios";
import requests, { TMDB_BASE_URL } from "../utils/constant";

import SearchResult from "../components/SearchResult";
import { JumbotronContainer } from "../container/jumbotron";
import { FaqsContainer } from "../container/faqs";
import { FooterContainer } from "../container/footer";
import Row from "../components/Row";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movie, setMovie] = useState([]);

  const genres = useSelector((state) => state.netflix.genres);
  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const searchResult = useSelector((state) => state.netflix.searchResult);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  auth.onAuthStateChanged((currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `${TMDB_BASE_URL}${requests.fetchNetflixOriginals}`
      );
      setMovie(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
      console.log(
        "dataaa>>???>>>>",
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
      return res;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      {searchResult.length > 0 ? (
        <div className="content flex column">
          <div className="grid flex">
            {searchResult.map((movie) => {
              return (
                <SearchResult
                  searchMovie={movie}
                  key={movie.id}
                  isLiked={false}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="hero">
            <img
              src={`${
               
                   `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
                  
              } `}
              alt="background"
              className="background-image"
            />
            <div className="container">
              <h1 className="banner__title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>

              <div className="buttons flex">
                <button
                  className="flex j-center a-center"
                  onClick={() => navigate("/player")}
                >
                  <FaPlay /> Play
                </button>
                <button className="flex j-center a-center">
                  <AiOutlineInfoCircle /> More Info
                </button>
              </div>
              <div>
                <h1 className="banner__description">
                  {truncate(movie?.overview, 250)}
                </h1>
              </div>
            </div>
          </div>
          <Row title="Top Rated" />
          <Slider movies={movies} />
          <JumbotronContainer />
          <FaqsContainer />
          <FooterContainer />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .banner__description {
    margin-left: 5rem;
    width: 50rem;
    line-height: 1.3;
    font-size: 1rem;
    height: 80px;
  }
  .banner__title {
    margin-left: 5rem;
    font-size: 4rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
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

  .hero {
    position: relative;
    object-fit: contain;
    .background-image {
      filter: brightness(50%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
    }
     
      .buttons {
        margin: 2rem;
        margin-left:5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
