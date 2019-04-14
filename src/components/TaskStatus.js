import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '300px',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
    };

    handleChange = event => {
        this.props.getTaskStatus(event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                        Cтатус
                    </InputLabel>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        input={<Input name="age" id="age-label-placeholder" />}
                        displayEmpty
                        name="age"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""> <em>Не выбран </em> </MenuItem>
                        <MenuItem value={'Выполняется'}>Выполняется</MenuItem>
                        <MenuItem value={'На потом'}>На потом</MenuItem>
                        <MenuItem value={'Выполнена'}>Выполнена</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);