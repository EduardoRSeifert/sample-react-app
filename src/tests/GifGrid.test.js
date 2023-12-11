import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GifGrid from '../components/GifGrid';

const mockData = {
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
  disneyCharacter: { data: [] },
  country: { data: [] },
};

describe('GifGrid', () => {
  it('renders GifGrid component with mock data', () => {
    render(<GifGrid {...mockData} />);
    
    expect(document.querySelector('h2')).toHaveTextContent('Gif Grid');
    expect(document.querySelectorAll('img')).toHaveLength(4); // Total gifs from all categories
  });

  it('renders GifGrid component with empty data', () => {
    const { container } = render(<GifGrid animal={{}} tvShow={{}} disneyCharacter={{}} country={{}} />);
    expect(container).toBeInTheDocument();
  });
});
