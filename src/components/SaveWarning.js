import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

const SimpleSnackbar = (props) => {
    const { open, setOpen } = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Введите название</span>}
                action={[
                    <Button key="undo" color="secondary" size="small"
                        onClick={() => { setOpen(false) }}
                    >
                        Закрыть
            </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={props.classes.close}
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);