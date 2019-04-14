import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, .8)'
    }
});

class CircularDeterminate extends React.Component {
    state = {
        completed: 0,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.center}>
                    <CircularProgress
                        className={classes.progress}
                        variant="determinate"
                        value={this.state.completed}
                    />
                </div>
            </div>
        );
    }
}

CircularDeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularDeterminate);