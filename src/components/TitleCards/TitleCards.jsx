import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title , category}) => {
  const [apiData , setApiData] = useState([]);
  const cardRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGM4NDFkMjI2ODA3OThmNWIxNGJmNDc2ZmJmOWY5ZiIsIm5iZiI6MTc1OTEzNDE4NS44OTYsInN1YiI6IjY4ZGE0MWU5MDA0ZTg2YTJhMWUxYzk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZquH_Eci3m73cOkAJf8LYS0YndgLZRxlOrYRJVmv7Kg'
  }
};

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  }

   useEffect(() => {

      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel' , handleWheel);
   } , []) 
   
   return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card , index) =>{
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>

  )
}

export default TitleCards