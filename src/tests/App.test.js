import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App'; // Adjust the import path

test('renders the home page link', () => {
  render(
    <App />
  );

  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toHaveAttribute('href', '/');
});

test('renders the gif feed link', () => {
  render(
    <App />
  );

  const gifFeedLink = screen.getByRole('link', { name: /Gif Feed/i });
  expect(gifFeedLink).toHaveAttribute('href', '/gif-feed');
});

test('renders the gif grid link', () => {
  render(
    <App />
  );

  const gifGridLink = screen.getByRole('link', { name: /Gif Grid/i });
  expect(gifGridLink).toHaveAttribute('href', '/gif-grid');
});
