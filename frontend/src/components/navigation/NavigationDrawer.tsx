import { Box, Divider, Drawer, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { navigationItems } from "../../utils/routerConfig";
import { APP_TITLE } from "../../utils/constants";

interface NavigationDrawerProps {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
}

const NavigationDrawer = ({
  isDrawerOpen,
  handleDrawerToggle,
}: NavigationDrawerProps) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 240,
        },
      }}
    >
      <Box onClick={handleDrawerToggle}>
        <Typography
          variant="h6"
          sx={{ my: 2, px: 2 }}
          onClick={() => navigate("")}
        >
          {APP_TITLE}
        </Typography>
        <Divider />
        <Box sx={{ mt: "20px", display: "flex", flexDirection: "column" }}>
          <NavLink
            to="sign-up"
            className={({ isActive }) => {
              return isActive
                ? "app-nav-drawer-link app-nav-drawer-link--active"
                : "app-nav-drawer-link";
            }}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="sign-in"
            className={({ isActive }) => {
              return isActive
                ? "app-nav-drawer-link app-nav-drawer-link--active"
                : "app-nav-drawer-link";
            }}
          >
            Login
          </NavLink>
        </Box>
        <Divider />
        <Box sx={{ mt: "20px", display: "flex", flexDirection: "column" }}>
          {navigationItems.map((item, index) => (
            <NavLink
              key={item.path + index}
              to={item.path}
              className={({ isActive }) => {
                return isActive
                  ? "app-nav-drawer-link app-nav-drawer-link--active"
                  : "app-nav-drawer-link";
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
