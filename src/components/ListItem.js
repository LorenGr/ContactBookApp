import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {withTheme} from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


function getStyles(theme) {
    return {
        root: {
            padding: 0,
            maxWidth: 128,
            display: 'inline-block',
            margin: 1,
            verticalAlign: 'top'
        },
        photo: {
            width: 128,
            height: 128,
            overflow: 'hidden'
        },
        img: {
            width: '100%',
        },
        caption: {
            marginTop: 1,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        content: {
            height: 58,
            overflow: 'hidden',
            textAlign: 'left',
            textTransform: 'none',

        },
        link: {
            textDecoration: 'none'
        },
        title: {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical'
        },
        [theme.breakpoints.down('sm') ]: {
            root: {
                margin: 3,
                width: '48%',
                maxWidth: 'none',

            },
            photo: {
                width: '100%',
                height: 'initial',
                '& img': {
                    width: '100%',
                }
            },
            content: {
                height: 35
            },
            title: {
                '-webkit-line-clamp': 1,
            },
        },
    };
}

export class ListItem extends React.Component {

    render() {
        const {item, theme} = this.props,
            classes = getStyles(theme);

        return (
            <Button style={classes.root}>
                <Link style={classes.link} to={'edit/' + item['_id']}>
                    <Card className="cardContainer">
                        {/*<CardMedia style={classes.photo}>*/}
                            {/*<img style={classes.img} src={item.picture}/>*/}
                        {/*</CardMedia>*/}
                        <CardContent style={classes.content}>
                            <Typography type="title" style={classes.title}>
                                {item.first_name}
                            </Typography>
                            <Typography type="caption" style={classes.caption}>
                                {item.job_title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Button>
        );
    }
}

ListItem.propTypes = {
    item: React.PropTypes.object.isRequired
};

export default connect()(
    withTheme()(ListItem)
);
