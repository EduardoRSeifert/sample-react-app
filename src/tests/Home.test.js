import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});

test('renders the page with image when API key is set', () => {
  process.env.REACT_APP_GIPHY_API_KEY = 'valid-api-key';
  render(<Home />);
  const pageTitle = screen.getByText('Home Page');
  const logoImage = screen.getByAltText('Logo');
  expect(pageTitle).toBeInTheDocument();
  expect(logoImage).toBeInTheDocument();
});

test('renders a warning when API key is not set', () => {
  delete process.env.REACT_APP_GIPHY_API_KEY;
  render(<Home />);
  const warningMessage = screen.getByText('Warning:');
  expect(warningMessage).toBeInTheDocument();
});
