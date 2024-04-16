import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, DialogActions, DialogContent, Grid, InputAdornment, OutlinedInput, Paper, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { createSandwich, updateSandwich } from '../apis/Sandwiches';
import DeleteIcon from '@mui/icons-material/Delete';

const SandwichModal = ({ action, open, setShowCreateSandwichModal, setError, setSuccess, selectedSandwich }) => {
  const [name, setName] = useState(selectedSandwich.name ?? '');
  const [price, setPrice] = useState(selectedSandwich.price ?? '');
  const [description, setDescription] = useState(selectedSandwich.description ?? '');
  const [ingredients, setIngredients] = useState(selectedSandwich.ingredients ?? []);

  const handleClose = () => {
    setShowCreateSandwichModal(false);
  };

  const handleSubmit = async () => {
    setError(null);
    const sandwichParams = { name, ingredients, price, description };
    if (action === 'Create') {
      createSandwich(sandwichParams)
        .then(() => {
          setSuccess('Sandwich created successfully!');
        })
        .catch((err) => {
          setError(err?.response?.data ?? err.message);
          return;
        });
    } else if (action === 'Edit') {
      updateSandwich(selectedSandwich._id, sandwichParams)
        .then(() => {
          setSuccess('Sandwich saved successfully!');
        })
        .catch((err) => {
          setError(err?.response?.data ?? err.message);
          return;
        });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
    >
      <DialogTitle>{action} Sandwich</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <TextField
              fullWidth
              required
              id='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item sm={4}>
            <OutlinedInput
              fullWidth
              id='outlined-adornment-amount'
              startAdornment={<InputAdornment position='start'>$</InputAdornment>}
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item sm={12}>
            <h6>Ingredients</h6>
            <TextField
              fullWidth
              id='ingredient'
              placeholder='Add Ingredient'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!ingredients.includes(e.target.value)) {
                    setIngredients([...ingredients, e.target.value]);
                  }
                  e.target.value = '';
                }
              }}
            />
          </Grid>
          <Grid item sm={12}>
            {ingredients.length > 0 &&
              <RenderIngredients
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            }
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type='submit'
          disabled={name === '' || price === '' || description === '' || ingredients.length == 0}
          onClick={handleSubmit}
        >
          {action === 'Create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RenderIngredients = ({ ingredients, setIngredients }) => {
  return (
    <Box
      paddingTop={1}
      paddingBottom={1}
      component={Paper}
      bgcolor={'#e6e0d1'}
    >
      {ingredients.map((ingredient) => {
        return (
          <div key={ingredient}>
            <Button onClick={() => {
              const tempArray = [...ingredients];
              const index = ingredients.indexOf(ingredient);
              tempArray.splice(index, 1);
              setIngredients(tempArray);
            }}>
              <DeleteIcon />
            </Button>
            {ingredient}
          </div>
        );
      })
      }
    </Box >
  );
};

SandwichModal.propTypes = {
  action: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setShowCreateSandwichModal: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  selectedSandwich: PropTypes.object.isRequired
};

RenderIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  setIngredients: PropTypes.func.isRequired
};

export default SandwichModal;