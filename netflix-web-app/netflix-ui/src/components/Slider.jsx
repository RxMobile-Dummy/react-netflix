import React from "react";
import CardSlider from "./CardSlider";
import styled from "styled-components";


export default function Slider({ movies, searchText }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <Container>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider
        title="Popular on Netflix"
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
      <CardSlider title="Romantic" data={getMoviesFromRange(60, 70)} />
      <CardSlider title="Horror" data={getMoviesFromRange(70, 80)} />
      <CardSlider title="Thriller" data={getMoviesFromRange(80, 90)} />
    </Container>
  );
}

const Container = styled.div``;
