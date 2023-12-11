import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GifFeed from '../components/GifFeed';
import fetchFromGiphy from '../components/FetchFromGiphy';

jest.mock('../components/FetchFromGiphy');

describe('GifFeed Component', () => {
  const mockGifs = {
    data: [
      { id: '1', title: 'Gif 1', images: { fixed_height: { url: 'url1' } } },
      { id: '2', title: 'Gif 2', images: { fixed_height: { url: 'url2' } } }
    ]
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders the GifFeed component with search input and button', () => {
    render(<GifFeed />);

    const searchInput = screen.getByPlaceholderText(/search for some gifs!/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('displays search results when the "Search" button is clicked', async () => {
    fetchFromGiphy.mockResolvedValue(mockGifs);

    render(<GifFeed />);

    const searchInput = screen.getByPlaceholderText(/search for some gifs!/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      userEvent.type(searchInput, 'cats');
    });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => expect(fetchFromGiphy).toHaveBeenCalledWith('cats', { offset: 0, limit: 10 }));

    const searchResultHeader = screen.getByRole('heading', { name: /search result/i });
    expect(searchResultHeader).toBeInTheDocument();

    mockGifs.data.forEach((gif) => {
      const gifImage = screen.getByAltText(gif.title);
      expect(gifImage).toBeInTheDocument();
    });
  });
});
