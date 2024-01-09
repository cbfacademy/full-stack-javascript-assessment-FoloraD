import { render, screen } from '@testing-library/react';
import App from '../App';
import SearchComponent from '../components/SearchComponent';



test('renders search by postcode input field', () => {
  render(<SearchComponent />);
  const searchInput = screen.getByPlaceholderText('Search postcode...');
  expect(searchInput).toBeInTheDocument();
}); 

// TO DO

//add test for front end components => check that (button, input field, vendor details) they render to the screen