import React from 'react';
import Typography from "@material-ui/core/Typography";
import Navbar from '../Navbar';

const Landing = () => {
return (

<div>
<Navbar>
    
</Navbar>
<Typography style = {{paddingLeft:40}}variant="h3" color="inherit" noWrap>
Welcome to Movie Reviews
</Typography>
<Typography style = {{paddingLeft:40}} variant="h5" color="inherit" noWrap>
Click above to navigate
</Typography>
</div>
)
}
export default Landing;