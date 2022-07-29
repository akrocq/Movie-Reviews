import React from 'react';
import Typography from "@material-ui/core/Typography";
import Navbar from '../Navbar';

//const serverURL = ""; //Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3026"; //enable for deploy mode

const Mypage = () => {

    const [fiveStarMoviesList, setFiveStarMoviesList] = React.useState([]);

    React.useEffect(() => {
        loadFiveStarMovies();
      }, []);
    
      const loadFiveStarMovies = () => {
        callApiGetFiveStarMovies()
          .then(res => {
            var parsed = JSON.parse(res.express);
            setFiveStarMoviesList(parsed);
          });
      }
    
      const callApiGetFiveStarMovies = async () => {
    
        const url = serverURL + "/api/getFiveStarMovies";
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
          }
    
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      }
    

return (
<div>
<Navbar></Navbar>
<Typography style = {{paddingLeft:40}} variant="h3" color="inherit" noWrap>
These are your favorite movies
</Typography >
<ul style = {{paddingLeft:40}}>
    {fiveStarMoviesList.map((item) => {
        return(
            <li key={item.id}>{item.name}</li>
        )
    })}
</ul>
<Typography style = {{paddingLeft:40}}variant="h6" color="inherit" noWrap>
This page displays all movies that are rated 5 stars by the user upon first render. To test, submit another 5 star review, and open this page again.
</Typography>

</div>
)
}
export default Mypage;