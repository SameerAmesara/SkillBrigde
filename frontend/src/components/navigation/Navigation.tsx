import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";
import "./navigation.scss";
import { navigationItems } from "../../utils/routerConfig";
import { APP_TITLE } from "../../utils/constants";
import { theme } from "../../utils/theme";

type Setting = {
  label: string;
  path: string;
};

const settings: Setting[] = [
  { label: "User profile", path: "profile" },
  { label: "Payments", path: "payments" },
  { label: "Logout", path: "logout" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleSettingsItemClick = (setting: Setting) => {
    if (setting.path === "logout") {
      sessionStorage.clear();
      navigate("/sign-in");
    } else {
      navigate(setting.path);
    }
    handleCloseProfileMenu();
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
            {navigationItems.map((item, index) =>
              item.isProtected && isLoggedIn !== "true" ? null : (
                <NavLink
                  key={item.path + index}
                  to={item.path}
                  className={({ isActive }) => {
                    return isActive
                      ? "app-nav-link app-nav-link--active"
                      : "app-nav-link";
                  }}
                  style={{ color: theme.palette.primary.main, fontWeight: 500 }}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </Box>
          {isLoggedIn === "true" ? (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                marginLeft: "auto",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }} onClick={handleOpenProfileMenu}>
                  <Avatar>P</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElProfile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElProfile)}
                onClose={handleCloseProfileMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={setting.label + index}
                    onClick={() => handleSettingsItemClick(setting)}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                marginLeft: "auto",
                alignItems: "center",
                gap: 1,
              }}
            >
              <NavLink to="sign-in">
                <Button>Login</Button>
              </NavLink>

              <NavLink to="sign-up">
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    maxHeight: "40px",
                  }}
                >
                  SignUp
                </Button>
              </NavLink>
            </Box>
          )}
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
