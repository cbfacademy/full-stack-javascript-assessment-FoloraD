import { render, screen } from '@testing-library/react';
import App from './App';

//Mockong Axios before test
jest.mock('axios', () => ({
  get:jest.fn(() => Promise.resolve({ data: {} })),

}));

test('renders learn react link', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Search postcode...');
  expect(searchInput).toBeInTheDocument();
}); 

// TO DO

//add test for front end components => check that (button, input field, vendor details) they render to the screen