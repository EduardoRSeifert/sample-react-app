import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GifGridPage from '../components/GifGridPage';
import fetchGridGifs from '../components/fetchGridGifs';

jest.mock('../components/fetchGridGifs', () => jest.fn());

describe('GifGridPage', () => {
  const mockGifs = {
    animal: {
      data: [
        { id: 1, images: { fixed_height: { width: 100, url: 'mock-url-animal-1' } }, title: 'Animal 1' },
        { id: 2, images: { fixed_height: { width: 150, url: 'mock-url-animal-2' } }, title: 'Animal 2' },
      ],
    },
    tvShow: {
      data: [
        { id: 3, images: { fixed_height: { width: 120, url: 'mock-url-tv-1' } }, title: 'TV Show 1' },
        { id: 4, images: { fixed_height: { width: 180, url: 'mock-url-tv-2' } }, title: 'TV Show 2' },
      ],
    },
    disneyCharacter: { data: [
      { id: 5, images: { fixed_height: { width: 100, url: 'mock-url-character-1' } }, title: 'Character 1' },
      { id: 6, images: { fixed_height: { width: 150, url: 'mock-url-character-2' } }, title: 'Character 2' },
    ] },
    country: { data: [
      { id: 7, images: { fixed_height: { width: 100, url: 'mock-url-country-1' } }, title: 'Country 1' },
      { id: 8, images: { fixed_height: { width: 150, url: 'mock-url-country-2' } }, title: 'Country 2' },
    ] },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders GifGridPage component and triggers search', async () => {
    render(<GifGridPage />);
    
    const animalInput = screen.getByPlaceholderText('Favourite Animal');
    const tvShowInput = screen.getByPlaceholderText('Favourite Tv Show');
    const disneyCharacterInput = screen.getByPlaceholderText('Favourite Disney Character');
    const countryInput = screen.getByPlaceholderText('Favourite Country');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(animalInput, { target: { value: 'Cat' } });
    fireEvent.change(tvShowInput, { target: { value: 'Breaking Bad' } });
    fireEvent.change(disneyCharacterInput, { target: { value: 'Mickey Mouse' } });
    fireEvent.change(countryInput, { target: { value: 'Japan' } });

    fetchGridGifs.mockResolvedValueOnce(mockGifs);

    await act(async () => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {});

    expect(screen.getByText('Gif Grid')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(8); // Assuming initial state has no gifs
  });

});
