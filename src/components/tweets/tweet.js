import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    inline: {
      display: 'inline',
    },
    listItem:{
        width: '100%',
        minWidth: 300,
    },
    link:{
        color: "blue",
    }
  }));

function Tweet({item}){
    const classes = useStyles();
    const {name, screen_name, tweet, date} = item
    let short_tweet = String(tweet).substr(0,100)

    const [showMore, setShowMore] = useState(false)

    const onClickShowMore = (e) => {
        setShowMore(true)
    }

    return (
        <div className={classes.listItem}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={name}
                secondary={
                    <div>
                        <p className="m-0">{`@${screen_name}`}</p>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            { showMore && tweet }
                            {
                                !showMore && 
                                    <div> 
                                        {short_tweet}
                                        <a className={classes.link} onClick={onClickShowMore}> ver más</a>
                                    </div>
                            }
                        </Typography>
                        <p className="m-0">{date}</p>
                    </div>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    )
}

export default Tweet