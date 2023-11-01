import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('renders todo', () => {
  const { getByText } = render(<App />);
  const todoElement = getByText(/here be dragons/i);

  expect(todoElement).toBeInTheDocument();
});
