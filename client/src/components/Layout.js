import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Layout = ({team, setTeam}) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('team');
    setTeam(null);
    navigate("/login");
  };

  return (
    <div>
      {team && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {team.name}
              </Typography>
              <Button color="inherit" onClick={() => logout()}>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
