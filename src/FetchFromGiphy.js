import { GiphyFetch } from '@giphy/js-fetch-api';

const fetchFromGiphy = async (searchQuery, offset = 50) => {
  const api_key = process.env.REACT_APP_GIPHY_API_KEY;
  console.log(api_key);
  const gf = new GiphyFetch(api_key);
  try {
    console.log(searchQuery, offset)
    const result = await gf.search(searchQuery, { offset: offset, limit: 10 });
    return result
  } catch(error){
    console.error("Error fetching data:", error);
  }
};

export default fetchFromGiphy;
