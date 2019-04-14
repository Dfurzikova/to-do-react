import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import LongMenu from './LongMenu';
import SettingsContext from '../context/SettingsContext';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
            height: '70px',
        },
    },

});

function CustomizedTable(props) {
    const context = useContext(SettingsContext);
    const { classes } = props;
    const [showEditIcons, setShowButtons] = useState(false);

    const setOn = () => {
        setShowButtons(true);
    }

    const setOff = () => {
        setShowButtons(false);
    }

    const renderIcon = (row) => {
        if (showEditIcons) {
            return (
                <>
                    <IconButton size="small" color="primary" aria-label="Edit" onClick={editArticle.bind(this, row)}>
                        <Icon>edit_icon</Icon>
                    </IconButton>
                    <IconButton size="small" color="secondary" aria-label="Delete" onClick={deleteArticle.bind(this, row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        } else {
            return '';
        }
    }

    const deleteArticle = (row) => {
        context.deleteItem(row);
    }

    const editArticle = (row, e) => {
        window.editItem(row);
    }

    const getStatus = (row, status) => {
        const data = { ...row };
        data.taskStatus = status;
        context.addItem(data);
    }
    // if(context.items) {
    //     renderRows()
    // }
    // const renderRows = () => {
    //     return(

    //     )
    // }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>ID задачи</CustomTableCell>
                        <CustomTableCell align="right">Статус</CustomTableCell>
                        <CustomTableCell align="right">Название задачи</CustomTableCell>
                        <CustomTableCell align="right">Описание задачи </CustomTableCell>
                        <CustomTableCell align="right">Дата выполнения</CustomTableCell>
                        <CustomTableCell align="right">Важность</CustomTableCell>
                        <CustomTableCell align="right">Тег</CustomTableCell>
                        <CustomTableCell align="right">Действие</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(context.items || []).map((row, index) => {
                        return (
                            <TableRow className={classes.row} key={index}>
                                <CustomTableCell component="th" scope="row">
                                    {row.id}
                                </CustomTableCell>
                                <CustomTableCell align="right" ><span> {row.taskStatus}</span>  <LongMenu getStatus={getStatus.bind(this, row)} /> </CustomTableCell>
                                <CustomTableCell align="right">{row.name}</CustomTableCell>
                                <CustomTableCell align="right">{row.description}</CustomTableCell>
                                <CustomTableCell align="right">{row.date}</CustomTableCell>
                                <CustomTableCell align="right">{row.taskType}</CustomTableCell>
                                <CustomTableCell align="right">{row.taskTag}</CustomTableCell>
                                <CustomTableCell align="right" onMouseEnter={setOn} onMouseLeave={setOff}>
                                    {renderIcon(row)}
                                </CustomTableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);