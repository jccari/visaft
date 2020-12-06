import { makeStyles } from '@material-ui/core/styles';
import {List, Paper}from '@material-ui/core';
import Tweet from "./tweet"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '45ch',
    backgroundColor: theme.palette.background.paper,
  }
}));

const data = [
  {author: "Ali Connors", tweet: " — I'll be in your neighborhood doing errands this…"},
  {author: "to Scott, Alex, Jennifer", tweet: " — Wish I could come, but I'm out of town this…"},
  {author: "Sandra Adams", tweet: " — Do you have Paris recommendations? Have you ever…"},
]

function TweetsList({data}) {
  const classes = useStyles()

  if(!data)
    return "Cargando tweets..."

  return (
    <Paper style={{maxHeight: '75%', overflow: 'auto'}}>
    <List className={classes.root}>
      {
        data.map( (item, i) => (
          <Tweet 
            item={item}
            key={i}
          />
        ))
      }
    </List>
    </Paper>
  );
}

export default TweetsList