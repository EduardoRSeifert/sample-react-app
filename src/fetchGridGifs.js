import fetchFromGiphy from './FetchFromGiphy';

const fetchGridGifs = async (animal, tvShow, character, country) => {
  try {
    const animalResult = await fetchFromGiphy(animal);
    const tvShowResult = await fetchFromGiphy(tvShow);
    const characterResult = await fetchFromGiphy(character);
    const countryResult = await fetchFromGiphy(country);

    return {
      animal: animalResult,
      tvShow: tvShowResult,
      disneyCharacter: characterResult,
      country: countryResult,
    };
  } catch (error) {
    console.error('Error fetching gifs:', error);
    return null;
  }
};

export default fetchGridGifs;
