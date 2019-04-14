import React from 'react';
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import TaskTypes from './TaskTypes';
import TaskStatus from './TaskStatus';
import TaskTag from './TaskTag';
import SaveWarnings from './SaveWarning';
import Progress from './Progress';

import SettingsContext from '../context/SettingsContext';

const styles = theme => ({
    root: {
        position: 'fixed',
        top: 5,
        right: 5,
    },
    drawer: {
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    title: {
        flex: '0 0 32px'
    },
    drawerItem: {
        padding: 15,
        overflow: 'auto'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: 30,
        flex: '0 0 30px'
    },
    button: {
        margin: '30px 80px 0 0',
    }
});

const Drawer = ({ classes, align = 'left' }) => {
    const context = useContext(SettingsContext);
    let data;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('2019-04-04');
    const [showRadioButtons, setShow] = useState(false);
    const [taskType, setTaskType] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskTag, setTaskTag] = useState('');
    const [warning, setRenderWarning] = useState(false);
    const [progress, setProgres] = useState(false);
    const [id, setId] = useState(0);

    const setters = {
        id: [new Date().getTime(), setId],
        name: ['', setName],
        description: ['', setDescription],
        date:['2019-04-04',setDate],
        taskType:['', setTaskType],
        taskStatus:['',setTaskStatus],
        taskTag:['', setTaskTag],
        warning:[false, setRenderWarning]
    }

    const openSidebar = (props = {}) => {
        Object.keys(setters).forEach((name) => {
            const setter = setters[name];

            setter[1](props[name] || setter[0]);
        });

        setOpen(true);
    }

    window.editItem = openSidebar;

    const renderTaskType = () => {
        if (showRadioButtons) {
            return (<TaskTypes getTaskType={getTaskType} />)
        } else {
            return '';
        }
    }

    const getTaskType = (type) => {
        setTaskType(type);
    }

    const getTaskStatus = (taskstatus) => {
        setTaskStatus(taskstatus);
    }

    const getTaskTag = (tasktag) => {
        setTaskTag(tasktag);
    }

    const renderWarning = () => {
        return (
            <SaveWarnings
                setOpen={setRenderWarning}
                open={warning}
            />
        )
    }

    const saveData = () => {
        data = {id, name, description, date, taskType, taskStatus, taskTag};

        context.addItem(data);

        new Promise((res) => {
            setTimeout(res, 2000);
        }).then(savedHandler);
    }

    const saveHandler = () => {
        if (name) {
            setName(name);
            setProgres(true);
            saveData();
        } else {
            setRenderWarning(true);
        }
    }

    const savedHandler = () => {
        setProgres(false);
        setOpen(false);
    }

    const renderProgress = () => {
        if (progress) {
            return (
                <Progress />
            )
        }
    }

    return (
        <div className={classes.root}>
            <Button className={classes.button} variant="outlined" color="secondary" onClick={() => openSidebar()}>Добавить задачу</Button>
            <SwipeableDrawer
                anchor={align}
                open={open}
                onClose={() => {
                    setRenderWarning(true);
                }}
                onOpen={() => openSidebar(true)}
            >
                <div className={classes.drawer}>
                    <Typography
                        className={classes.title}
                        component="h5"
                        variant="h6"
                        align="center"
                        style={{
                            margin: 30,
                        }}
                    >
                        Новая задача
                    </Typography>
                    <Divider />
                    <div className={classes.drawerItem}>
                        <List>

                            {/* название задачи */}
                            <ListItem>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <TextField
                                    id="standard-name"
                                    label="Название задачи"
                                    className={classes.textField}
                                    value={name}
                                    onChange={event => {
                                        setName(event.target.value);
                                    }}
                                    margin="normal"
                                />
                            </ListItem>

                            {/* описание задачи */}
                            <ListItem>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Описание задачи"
                                    multiline
                                    rowsMax="5"
                                    value={description}
                                    onChange={event => {
                                        setDescription(event.target.value);
                                    }}
                                    className={classes.textField}
                                    margin="normal"
                                />
                            </ListItem>

                            {/* дата выполнения */}
                            <ListItem>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <TextField
                                    id="date"
                                    label="Дата выполнения"
                                    type="date"
                                    defaultValue={date}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={event => {
                                        setDate(event.target.value);
                                        setShow(true);
                                    }}
                                />

                            </ListItem>

                            {/* Тип задачи */}
                            <ListItem>
                                {renderTaskType()}
                            </ListItem>

                            {/* Статус задачи */}
                            <ListItem>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <TaskStatus getTaskStatus={getTaskStatus} />
                            </ListItem>

                            {/* Тег задачи */}
                            <ListItem>
                                <TaskTag getTaskTag={getTaskTag} />
                            </ListItem>
                        </List>
                    </div>

                    <Divider />

                    <div className={classes.footer} >
                        <Button variant="outlined" color="primary" onClick={saveHandler}>Сохранить</Button>
                        <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>Отмена</Button>
                    </div>

                    {renderProgress()}
                </div>
                {renderWarning()}
            </SwipeableDrawer>
        </div>
    );
};

Drawer.propTypes = {
    classes: PropTypes.object,
    align: PropTypes.string,
};

export default withStyles(styles)(Drawer);
