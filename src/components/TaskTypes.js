import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class RadioButtonsGroup extends React.Component {

    handleChange = event => {
        this.props.getTaskType(event.target.value)
        this.setState({ value: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        aria-label="Тип задачи"
                        name="Тип задачи"
                        className={classes.group}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="Срочная важная задача" control={<Radio />} label="Срочная важная задача" />
                        <FormControlLabel value="Срочная неважная задача" control={<Radio />} label="Срочная неважная задача" />
                        <FormControlLabel value="Не срочная важная задача" control={<Radio />} label="Не срочная важная задача" />
                        <FormControlLabel value="Не срочная неважная задача" control={<Radio />} label="Не срочная неважная задача" />
                    </RadioGroup>
                </FormControl>

            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);