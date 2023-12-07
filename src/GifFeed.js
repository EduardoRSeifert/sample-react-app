import React, { useState, useEffect, useCallback } from 'react';
import fetchFromGiphy from './FetchFromGiphy';

function GifFeed() {
  const [searchQuery, setSearchQuery] = useState('');

  const [searchResult, setSearchResult] = useState([]);

  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);

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

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const searchOpts = { offset: offset, limit: 10 }
      const fetchedData = await fetchFromGiphy(searchQuery, searchOpts);
      setSearchResult((prevResult) => [...prevResult, ...fetchedData.data]);
    } catch (error) {
      console.error('Error in handleSearch:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, offset])

  useEffect(() => {
    if(offset === 0) return;
    handleSearch();
  }, [offset, searchQuery, handleSearch]);

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
        <button onClick={handleSearch} className='col-4 btn btn-primary'>
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

export default GifFeed;
