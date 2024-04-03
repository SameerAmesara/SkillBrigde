import { Container, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation />
      <Container component="main" sx={{ paddingY: 3 }}>
        <Toolbar sx={{ background: "transparent" }} />
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
