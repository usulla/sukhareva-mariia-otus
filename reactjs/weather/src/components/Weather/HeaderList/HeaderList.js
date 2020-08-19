import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

const Header = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`;
const HeaderList = ({ idList, title, deleteList, saveTitleList }) => {
  const titleInput = React.createRef();

  const renameList = (e) => {
    saveTitleList(idList, titleInput.current.value)
    e.preventDefault()
  };

  return (
    <Header>
      {title.trim().length !== 0 &&
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
      }
      {title.trim().length === 0 &&
        <>
          <TextField style={{ marginBottom: '20px' }}
            label="Title"
            inputRef={titleInput}
            id="outlined-size-small"
            // defaultValue="Enter title of list"
            size="small" />
          <IconButton onClick={renameList}>
            <CheckIcon />
          </IconButton>
        </>
      }
    </Header>
  )
}

export default HeaderList;