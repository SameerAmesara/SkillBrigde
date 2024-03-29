import { Container, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import { useContext, useEffect } from "react";
import { appStoreContext } from "./mobx/store";

function App() {
  const appStore = useContext(appStoreContext);

  useEffect(() => {
    appStore.addMentor({ id: "a", name: "AAA" });
    appStore.getMentors().map((mentor: { id: string; name: string }) => {
      console.log(mentor.id, mentor.name);
    });
  }, [appStore]);

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
