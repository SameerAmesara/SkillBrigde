import { Container, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import { useStores } from "./mobx/RootStore";
import { useEffect } from "react";

function App() {
  const { paymentsStore } = useStores();
  paymentsStore.addTransaction("Test 1");

  useEffect(() => {
    console.log(paymentsStore.transactions);
  }, [paymentsStore]);

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
