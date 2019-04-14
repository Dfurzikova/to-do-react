import React from 'react';

import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
const Icons = () => {
    return (
        <>
            <IconButton size="small" color="primary" aria-label="Edit" onClick={editArticle.bind(this)}>
                <Icon>edit_icon</Icon>
            </IconButton>
            <IconButton size="small" color="secondary" aria-label="Delete" onClick={deleteArticle.bind(this)}>
                <DeleteIcon />
            </IconButton>
        </>
    )
}
export default Icons;
