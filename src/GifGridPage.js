import React, { useState, useCallback } from 'react';
import GifGrid from './GifGrid';
import fetchGridGifs from './fetchGridGifs';

function GifGridPage() {
  const [animal, setAnimal] = useState('');
  const [tvShow, setTvShow] = useState('');
  const [disneyCharacter, setDisneyCharacter] = useState('');
  const [country, setCountry] = useState('');
  const [gifsData, setGifsData] = useState(null);

  const handleSearch = useCallback(async () => {
    try {
      const data = await fetchGridGifs(animal, tvShow, disneyCharacter, country);
      console.log(data)
      setGifsData(data);
    } catch (error) {
      console.error('Error fetching gifs:', error);
    }
  }, [animal, tvShow, disneyCharacter, country]);

  return (
    <div>
      <h1>Gif Grid Page</h1>
      <div>
        <input 
          type="text" 
          value={animal} 
          onChange={(e) => setAnimal(e.target.value)}
          placeholder="Favourite Animal"
        />
      </div>
      <div>
        <input
          type="text"
          value={tvShow}
          onChange={(e) => setTvShow(e.target.value)}
          placeholder="Favourite Tv Show"
        />
      </div>
      <div>
        <input
          type="text"
          value={disneyCharacter}
          onChange={(e) => setDisneyCharacter(e.target.value)}
          placeholder="Favourite Disney Character"
        />
      </div>
      <div>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Favourite Country"
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {gifsData && <GifGrid {...gifsData} />}
    </div>
  );
}

export default GifGridPage;
