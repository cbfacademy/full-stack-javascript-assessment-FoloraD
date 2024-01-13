import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchComponent from '../components/LocationSearchComponent';
import axios from 'axios';
import React from 'react';

jest.mock('axios');


describe('SearchComponent', () => {
test('renders search by postcode input field', () => {
  render(<SearchComponent />);
  const searchInput = screen.getByPlaceholderText('Search postcode...');
  const searchButton = screen.getByText('Search');
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
}); 

test('handles user input and performs search', async () => {
  //mock axios.get response
  axios.getResolvedValueOnce({data: []});

  render(<SearchComponent />);
  const searchInput = screen.getByPlaceholderText('Search postcode...')
  const searchButton = screen.getByText('Search');

  fireEvent.change(searchInput, {target: {value: 'SW11AA'}})
  fireEvent.click(searchButton)

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/searchByPostcode?postcode=SW11AA");
  });
});
});
// TO DO

//add test for front end components => check that (button, input field, vendor details) they render to the screen