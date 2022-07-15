import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

//Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3026"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

const Review = () => {

  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    callApiGetMovies()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setMoviesList(parsed);
      });
  }

  const callApiGetMovies = async () => {

    const url = serverURL + "/api/getMovies";

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

  let [submitted, setSubmitted] = React.useState(false);

  const [movieError, setMovieError] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [bodyError, setBodyError] = React.useState("");
  const [ratingError, setRatingError] = React.useState("");

  const check = () => {
    let sum = 0;
    if (movie == ""){
      setMovieError("Please select a movie");
    } else {
      setMovieError("");
      sum = sum + 1;
    }
    if (title == ""){
      setTitleError("Please title your review");
    } else {
      setTitleError("");
      sum = sum + 1;
    }
    if (body == ""){
      setBodyError("Please write a review");
    } else {
      setBodyError("");
      sum = sum + 1;
    }
    if (rating == ""){
      setRatingError("Please rate the movie");
    } else {
      setRatingError("");
      sum = sum + 1;
    }
    if (sum == 4){
      setSubmitted(true);
      addReview();
    }

  }

  const [userID, setUserID] = React.useState(1);

  const addReview = () => {
    callApiAddReview()
  }

  const callApiAddReview = async () => {

    const url = serverURL + "/api/addReview";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: userID,
        movieID: movie.id,
        title: title,
        body: body,
        rating: rating
      })
    });
    const nbody = await response.json();
    if (response.status !== 200) throw Error(nbody.message);
    return nbody;
  }

 

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 350,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const movieClasses = useStyles();

  const [movie, setMovie] = React.useState('');

  const handleMovie = (event) => {
    setMovie(event.target.value);
    setSubmitted(false);
  }

  const titleClasses = useStyles();
  
  const [title, setTitle] = React.useState('');

  const handleTitle = (event) => {
    setTitle(event.target.value);
    setSubmitted(false);
  }
  
  const bodyClasses = useStyles();

  const [body, setBody] = React.useState('');

  const handleBody = (event) => {
    setBody(event.target.value);
    setSubmitted(false);
  }

  const [rating, setRating] = React.useState('');

  const handleRating = (event) => {
    setRating(event.target.value);
    setSubmitted(false);
  } 

  /**
   * DECLARE NEW CONSTANTS 
   * stateful movieList 
   * stateful movieID
   * stateful userID
   */

  /**
   * getMovies
   * calls the callApiGetMovies
   * setMovieList() !!!! rmr to change it instead of setRecipeList
   * LAB 10
   */

  /**
   * callApiGetMovies func 
   * LAB 10
   */

  /**
   * handleAddReview 
   * calls the callApiAddReview
   */

  /**
   * callApiAddReview 
   * send data in body to server.js 
   * lab 10 
   */

    return (
      
      <Grid Container 
      direction="row"
      >

        <Grid item
          xs = {12}
          md = {6}
          container
          spacing={1}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
            
            <Grid item>
              <Typography variant={"h3"}>
                Review One of These Five Specific Movies
              </Typography>
            </Grid>

            <Grid item>
              <MovieSelection 
                handleMovie={handleMovie}
                style={movieClasses}
                moviesList={moviesList}
              />
            </Grid>
            
            <Grid item>
              <ReviewTitle 
                handleTitle={handleTitle}
                style={titleClasses}
              />
            </Grid>

            <Grid item>
              <ReviewBody 
                handleBody={handleBody}
                style={bodyClasses}
              />
            </Grid>
            
            <Grid item>
              <h3></h3>
            </Grid>
            

            <Grid item>
              <ReviewRating handleRating={handleRating}/>
            </Grid>

        </Grid>

        <Grid item
        container
        xs = {12}
        md = {0}
          spacing={1}
          direction="column"
        >
            <Grid item>
            <Button 
              Variant="contained"
              onClick={check}>Submit</Button>
            </Grid>

            <Grid item>
              <p> {movieError} </p>
              <p> {titleError} </p>
              <p> {bodyError} </p>
              <p> {ratingError} </p>
            </Grid>

            <Grid item>
                <p>{submitted ? "Thank you for submitting your review!" : <></>}</p>
                <p>{submitted ? "Selected Movie: " + movie.name : <></>}</p>
                <p>{submitted ? "Title of Review: " + title : <></>}</p>
                <p>{submitted ? "Review: " + body: <></>}</p>
                <p>{submitted ? "Rating: " +  rating : <></>}</p>

            </Grid>
        </Grid>

      
      </Grid> 
      
    )
}

const MovieSelection = (props) => (

    <div>
      <FormControl className={props.style.formControl}>
        <InputLabel id="demo-simple-select-label">Select Your Movie to Review</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={props.handleMovie}
        >
          {props.moviesList.map((item) => {
            return (
              <MenuItem value = {item}>{item.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )

const ReviewTitle = (props) => (
  
  <form>
    <TextField 
      id="standard-basic" 
      label="Enter the Title of Your Movie Review Here" 
      inputProps={{ maxLength: 40 }}
      onChange={props.handleTitle}
      className={props.style.formControl}
    />
  </form>
  
)

const ReviewBody = (props) => (
  <form>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Enter Your Movie Review Here"
          multiline
          rows={4}
          inputProps={{ maxLength: 200 }}
          onChange={props.handleBody}
          className={props.style.formControl}
        />
      </div>
  </form>
)

const ReviewRating = (props) => (
  <FormControl>
  <FormLabel component="legend">Rate Your Movie out of 5</FormLabel>
  <RadioGroup onChange={props.handleRating}>
    <FormControlLabel value={"1"} control={<Radio color="blue"/>} label="1" />
    <FormControlLabel value={"2"} control={<Radio color="blue"/>} label="2" />
    <FormControlLabel value={"3"} control={<Radio color="blue"/>} label="3" />
    <FormControlLabel value={"4"} control={<Radio color="blue"/>} label="4" />
    <FormControlLabel value={"5"} control={<Radio color="blue"/>} label="5" />
  </RadioGroup>
</FormControl>
)




class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;



    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                
              </React.Fragment>
            )}
          </Typography>
        </Grid>

        <Grid item>
          <Review />
        </Grid>

      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>

        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);