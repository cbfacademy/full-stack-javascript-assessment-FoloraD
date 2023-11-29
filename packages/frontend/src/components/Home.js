import React from "react";
import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
import SearchComponent from "./SearchComponent";
import StoreListComponent from "./StoreListComponent";
import VendorDetails from "./VendorDetails";
import MapDisplay from "./MapDisplay";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">NavBar</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchComponent />
          </Grid>
          <Grid item xs={12}>
            <StoreListComponent />
          </Grid>
          <Grid item xs={12}>
            <VendorDetails />
          </Grid>
          <Grid item xs={12}>
            <MapDisplay />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
