import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchComponent = () => {
    return (
        <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={8}>
                <TextField 
                fullWidth
                id='search-input'
                label="Enter Location"
                variant='outlined'
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant='contained' color='primary'>
                    search
                </Button>

            </Grid>

        </Grid>
    );
};

export default SearchComponent;