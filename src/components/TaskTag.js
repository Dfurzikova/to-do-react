import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const suggestions = [
    { label: 'тег0' },
    { label: 'тег1' },
    { label: 'тег2' },
    { label: 'тег3' },

];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}

        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();

    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }
            return keep;
        });
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        width: '300px',
        margin: '0 auto',
        padding: '10px'
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});


function IntegrationDownshift(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Downshift id="downshift-simple">

                {({ getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => {
                    //передача тега родителю
                    if (selectedItem) {
                        props.getTaskTag(selectedItem);
                    }

                    return (
                        <div className={classes.container}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                    placeholder: 'Введите тег',
                                }),
                            })}
                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper} square >
                                        {getSuggestions(inputValue).map((suggestion, index) => {
                                            return (renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({ item: suggestion.label }),
                                                highlightedIndex,
                                                selectedItem,
                                            }))
                                        }

                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    )
                }}
            </Downshift>
            <div className={classes.divider} />

        </div>
    );
}

IntegrationDownshift.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);