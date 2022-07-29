import React from 'react';
import Typography from "@material-ui/core/Typography";
import Navbar from '../Navbar';
import TextField from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";

const serverURL = ""; //Dev mode
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3026"; //enable for deploy mode

const Search = () => {

const [queryReturn, setQueryReturn] = React.useState([]);
const [queryReturnTwo, setQueryReturnTwo] = React.useState([]);

const [movie, setMovie] = React.useState('');

const handleMovie = (event) => {
    console.log(1)
    setMovie(event.target.value);
}

const [director, setDirector] = React.useState('');

const handleDirector = (event) => {
    setDirector(event.target.value);
}

const [actor, setActor] = React.useState('');

const handleActor = (event) => {
    setActor(event.target.value);
}


const sendQuery = () => {
    console.log(movie)
    callSendQuery()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setQueryReturn(parsed);
      });
      callSendQueryTwo()
      .then(res => {
        var parsedTwo = JSON.parse(res.express);
        setQueryReturnTwo(parsedTwo);
      });
  }

  const callSendQuery = async () => {
    
    const url = serverURL + "/api/getQuery";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        movie: movie,
        director: director,
        actor: actor
      })
    });
    const nbody = await response.json();
    if (response.status !== 200) throw Error(nbody.message);
    return nbody;
  }

  const callSendQueryTwo = async () => {
    
    const url = serverURL + "/api/getQueryTwo";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        movie: movie,
        director: director,
        actor: actor
      })
    });
    const nbody = await response.json();
    if (response.status !== 200) throw Error(nbody.message);
    return nbody;
  }

return (
<div>
<Navbar></Navbar>
<Typography style = {{paddingLeft:40}} variant="h3" color="inherit" noWrap>
Search for Movies, Directors, or Actors
</Typography>
<form style = {{paddingLeft:40}}>
    <TextField 
      id="standard-basic" 
      label="Enter Movie Title Here" 
      inputProps={{ maxLength: 40 }}
      onChange={handleMovie}
    />
  </form>
  <form style = {{paddingLeft:40}}>
    <TextField 
      id="standard-basic" 
      label="Enter Director Here" 
      inputProps={{ maxLength: 40 }}
      onChange={handleDirector}
    />
  </form>
  <form style = {{paddingLeft:40}}>
    <TextField 
      id="standard-basic" 
      label="Enter Actor/Actress Here"
      inputProps={{ maxLength: 40 }}
      onChange={handleActor}
    />
  </form>
  <h3></h3>
  <h3></h3>
  <h3></h3>
    <Button style = {{paddingLeft:40}}
        Variant="contained"
        onClick={sendQuery}>Search
    </Button>
    <h3></h3>
  <h3></h3>
  <h3></h3>
  <h3></h3>
  <h3></h3>
  <h3></h3>
  <h3></h3>
  <h3></h3>
  <h3></h3>
  <ul style = {{paddingLeft:40}}>
    {queryReturn.map((item) => {
        return(
            <li key={item.id}>Movie: {item.name}    By Director: {item.dname} </li>
        )
    })}
</ul>
<ul style = {{paddingLeft:40}}>
    {queryReturnTwo.map((item) => {
        return(
            <li key={item.id}>Review: {item.reviewContent}</li>
        )
    })}
</ul>

</div>


)
}
export default Search;