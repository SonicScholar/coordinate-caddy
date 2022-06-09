import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders coordinate caddy home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/coordinate caddy/i);
  expect(linkElement).toBeInTheDocument();
});
