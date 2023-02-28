import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import requests, { TMDB_BASE_URL } from "../utils/constant";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ReactCardSlider from "react-card-slider-component";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
 
  const [movies, setMovies] = useState([]);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `${TMDB_BASE_URL}${requests.fetchTopRated}`
      );
      setMovies(request.data.results);
      console.log("toprated:>>>>>", request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="row ">
        <h1>{title}</h1>

        <div className="row__posters  flex " >
          {movies?.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster  ${isLargeRow && "row__posterLarge"} `}
              src={`${baseUrl}${movie?.poster_path}`}
              alt={movie.name}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Row;

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;

  .row {
    margin-top: 20px;
    margin-left: 50px;
    color: white;
  }
  .row__poster {
    width: 100%;
    object-fit: contain;
    max-height: 30rem;
    transition: transform 450ms;
    margin-right: 10px;
  }
  .row__posters {
    display: flex;
    padding-top: 20px;
    width:auto
    flex-direction: row;
    overflow-x: scroll;
    padding: 20px;
    flex: 0 0 auto;
  }

  .row__poster:hover {
    transform: scale(1.08);
  }
  .row__posterLarge {
    max-height: 250px;
  }
  .row__posterLarge:hover {
    transform: scale(1.09);
  }
`;
