import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import history from '../Navigation/history';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie Reviews
          </Typography>
          <Button style = {{paddingLeft:40}}
            color="inherit"
            onClick={() => history.push('/')}
          > Landing
          </Button>
          <Button 
            color="inherit"
            onClick={() => history.push('/search')}
          > Search
          </Button>
          <Button 
            color="inherit"
            onClick={() => history.push('/reviews')}
          > Reviews
          </Button>
          <Button 
            color="inherit"
            onClick={() => history.push('/mypage')}
          > Mypage
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}