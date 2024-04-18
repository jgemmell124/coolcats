import React, { useState, useEffect } from 'react';
import {
  IconButton,
  InputBase,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControl,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { getAllUsers } from '../apis/Users';
import { getAllSandwiches } from '../apis/Sandwiches';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('Users');
  const [searchTerm, setSearchTerm] = useState('');
  const [sandwiches, setSandwiches] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Get all users
    getAllUsers()
      .then((res) => setUsers(res.users))
      .catch();

    // Get all sandwiches
    getAllSandwiches().then((response) => {
      setSandwiches(response.sandwiches);
    });
  }, []);

  const noResults = () => {
    return (
      <div>
        <h4>No Results Found</h4>
        There were no matches for your search term.
      </div>
    );
  };

  const renderResults = () => {
    // Determine if we are rendering sandwhiches or userse from the first entry
    const isSandwich = 'price' in results[0];

    if (isSandwich) {
      return results.map((sandwich) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0px 1px 5px 0px black',
              borderRadius: '15px',
              width: '80%',
              height: '150px',
              padding: '15px',
              marginBottom: '25px',
            }}
            key={sandwich._id}
          >
            <img
              src={'/images/noImage.jpeg'}
              height='100%'
              width='auto'
              style={{ borderRadius: '15px', marginRight: '15px' }}
            />
            <div>
              <Typography variant='h4'>{sandwich.name}</Typography>
              <Typography variant='h6' sx={{ color: '#A9333A' }}>
                ${sandwich.price}
              </Typography>
              <i>{sandwich.description}</i>
            </div>
          </Box>
        );
      });
    } else {
      return results.map((user) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0px 1px 5px 0px black',
              borderRadius: '15px',
              width: '80%',
              height: '150px',
              padding: '15px',
              marginBottom: '25px',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 1px 10px 3px #42852d',
              },
            }}
            onClick={() => {
              navigate(`/profile/${user.username}`, { replace: true });
            }}
            key={user._id}
          >
            <img
              src={'/images/noImage.jpeg'}
              height='100%'
              width='auto'
              style={{ borderRadius: '15px', marginRight: '15px' }}
            />
            <div>
              <Typography variant='h4'>{user.username}</Typography>
              {user.name ? (
                <>
                  <Typography variant='h6' sx={{ color: '#A9333A' }}>
                    {user.name}
                  </Typography>
                  <i>{user.email}</i>
                </>
              ) : (
                <i>
                  Must be signed-in to view a user&apos;s full name and email
                </i>
              )}
            </div>
          </Box>
        );
      });
    }
  };

  const searchForResults = (searchTerm, searchType) => {
    // Clear the results list
    setResults([]);

    if (searchTerm === '') {
      return;
    }

    // If the search type is 'Users', add any users whose email, username, or name matches the search term (case-insensitive)
    if (searchType === 'Users') {
      const usersResults = users.filter(
        (user) =>
          (user?.email || '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (user?.username || '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(usersResults);
    }

    // If the search type is 'Sandwiches', add any sandwiches whose name, description, or price (converted to string) matches the search term (case-insensitive)
    if (searchType === 'Sandwiches') {
      const sandwichesResults = sandwiches.filter(
        (sandwich) =>
          sandwich.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sandwich.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          sandwich.price.toString().includes(searchTerm)
      );
      setResults(sandwichesResults);
    }
  };

  return (
    <div>
      <h1>Search for Users or Sandwiches</h1>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '50%',
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select
            labelId='search-type-select'
            id='demo-simple-select-autowidth'
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            autoWidth
            sx={{ height: '35px' }}
            renderValue={(value) => `${value}`}
          >
            <MenuItem value={'Users'}>Users Only</MenuItem>
            <MenuItem value={'Sandwiches'}>Sandwiches Only</MenuItem>
          </Select>
        </FormControl>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={
            searchType === 'Users'
              ? 'Search by email, username, or name'
              : 'Search by name, description, or price'
          }
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <IconButton
          type='button'
          sx={{ p: '10px' }}
          aria-label='search'
          onClick={() => searchForResults(searchTerm, searchType)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <hr style={{ border: '0.5px solid black', opacity: '1' }} />
      {results.length === 0 ? noResults() : renderResults()}
    </div>
  );
};

export default SearchPage;
