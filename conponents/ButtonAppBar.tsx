import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
interface Props {
  clientid: string;
}
function GoToGithubLoginPage(path:string){
  window.location.assign(path);
}

export default function ButtonAppBar({ clientid }: Props) {
  const path = "https://github.com/login/oauth/authorize?client_id=" + clientid
  +"&scope=repo"
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Github Issue Controller
          </Typography>
          <Button color="inherit" onClick={()=>GoToGithubLoginPage(path)}>         
              Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}