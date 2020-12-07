import { makeStyles } from '@material-ui/core/styles';
import {List, Paper}from '@material-ui/core';
import Tweet from "./tweet"
import TweetPagination from "./tweets-pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '99%',
    // maxWidth: '45ch',
    backgroundColor: theme.palette.background.paper,
  }
}));

function TweetsList({data}) {
  const classes = useStyles()

  if(!data)
    return "Cargando tweets..."

  return <TweetPagination data={data}/>
  return (
    <Paper style={{maxHeight: '100%', overflow: 'auto'}}>
      <TweetPagination data={data}/>
    {/* <List className={classes.root}>
      {
        data.map( (item, i) => (
          <Tweet 
            item={item}
            key={i}
          />
        ))
      }
    </List> */}
    </Paper>
  );
}

export default TweetsList