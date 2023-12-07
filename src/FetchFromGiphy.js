import { GiphyFetch } from '@giphy/js-fetch-api';

const fetchFromGiphy = async (searchQuery, searchOpts = { offset: 0, limit: 10 }) => {
  const api_key = process.env.REACT_APP_GIPHY_API_KEY;
  const gf = new GiphyFetch(api_key);
  try {
    const result = await gf.search(searchQuery, searchOpts);
    return result
  } catch(error){
    console.error("Error fetching data:", error);
  }
};

export default fetchFromGiphy;
