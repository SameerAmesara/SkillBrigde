import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation />
      <Container component="main" sx={{ paddingY: 3 }}>
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
