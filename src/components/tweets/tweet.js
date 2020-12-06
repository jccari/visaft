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
  }));

function Tweet({item}){
    const classes = useStyles();
    const {name, tweet, date} = item

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={name}
                secondary={
                    <div>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {tweet}
                        </Typography>
                        <p>{date}</p>
                    </div>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default Tweet