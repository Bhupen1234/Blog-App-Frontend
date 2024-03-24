import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({setNewBlog}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    // Add your logic to submit the form data here
    console.log('Form submitted:', { title, image, description });
    setOpen(false); // Close the dialog after form submission
    // Reset form fields
    setTitle('');
    setImage(null);
    setDescription('');
    setNewBlog({ title,
      userPicturePath:image, description });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" sx={{ width: "200px" }} onClick={handleClickOpen}>
        Create new Blog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Blog
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              accept="image/*"
              id="image"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="image">
              <Button variant="contained" component="span" fullWidth sx={{ marginTop: '16px' }}>
                Choose Image
              </Button>
            </label>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              required
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginTop: '16px' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFormSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
