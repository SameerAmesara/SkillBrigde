import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";
import "./navigation.scss";
import { navigationItems } from "../../utils/routerConfig";
import { APP_TITLE } from "../../utils/constants";

const Navigation = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar sx={{ alignItems: "stretch" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              justifyContent: "center",
              flexGrow: { xs: 1, sm: 0 },
            }}
            onClick={() => navigate("")}
          >
            {APP_TITLE}
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              marginLeft: "50px",
            }}
          >
            {navigationItems.map((item, index) => (
              <NavLink
                key={item.path + index}
                to={item.path}
                className={({ isActive }) => {
                  return isActive
                    ? "app-nav-link app-nav-link--active"
                    : "app-nav-link";
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <NavigationDrawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </nav>
    </>
  );
};

export default Navigation;
