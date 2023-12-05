import React, { useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';

function GiphySearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const [searchResult, setSearchResult] = useState([]);

  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);
  
  const api_key = process.env.REACT_APP_GIPHY_API_KEY;
  const gf = new GiphyFetch(api_key);
  const fetchFromGiphy = async () => {
    try {
      setLoading(true);
      const result = await gf.search(searchQuery, { offset: offset, limit: 10 });
      setSearchResult((prevResult) => [...prevResult, ...result.data]);
    } catch(error){
      console.error("Error fetching data:", error);
    } finally{
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {   
      setOffset((prevoffset) => prevoffset + 10);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchFromGiphy();
  }, [offset]);

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col'>
          <input
            type="text"
            value={searchQuery}
            className='form-control'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search for some gifs!"
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4'/>
        <button onClick={fetchFromGiphy} className='col-4 btn btn-primary'>
          Search
        </button>
      </div>
      <div className='row mt-3'>
        <div className='col-4'/>
        <div className='col-4'>
          {searchResult && (
            <div>
              <h2>Search Result:</h2>
              <div>
                {searchResult.map((gif) => (
                  <div key={gif.id}>
                    <img src={gif.images.fixed_height.url} alt={gif.title}/>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GiphySearch;
