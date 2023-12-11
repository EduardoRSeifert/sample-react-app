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
      setGifsData(data);
    } catch (error) {
      console.error('Error fetching gifs:', error);
    }
  }, [animal, tvShow, disneyCharacter, country]);

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col'>
          <div>
            <input
              className='form-control'
              type="text"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              placeholder="Favourite Animal"
            />
          </div>
        </div>
        <div className='col'>
          <div>
            <input
              className='form-control'
              type="text"
              value={tvShow}
              onChange={(e) => setTvShow(e.target.value)}
              placeholder="Favourite Tv Show"
            />
          </div>
        </div>
        <div className='col'>
          <div>
            <input
              className='form-control'
              type="text"
              value={disneyCharacter}
              onChange={(e) => setDisneyCharacter(e.target.value)}
              placeholder="Favourite Disney Character"
            />
          </div>
        </div>
        <div className='col'>
          <div>
            <input
              className='form-control'
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Favourite Country"
            />
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4'/>
        <button onClick={handleSearch} className='col-4 btn btn-primary'>
          Search
        </button>
      </div>
      {gifsData && <GifGrid {...gifsData} />}
    </div>
  );
}

export default GifGridPage;
