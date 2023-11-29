import React from 'react';

const SearchComponent = () => {
    return( 
    <div>
        <input type="text" placeholder='Search ...'/>
        <button>Search</button>
    </div>
    );

};

export default SearchComponent;

// TODO
//import axios , useState
//function to clean user input to match expected. =>trim whitespace & convert to uppercase
//something to manage user input(state management) 'postcode' 'setPostcode'
//function to handle & manage the search action triggered by the user
//GET request to /searchByPostcode
//success update vendor state
//if error update vendor state & display error message
//update input field & button to reflect new functionality