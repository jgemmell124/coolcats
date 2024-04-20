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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllUsers } from '../apis/Users';
import { getAllSandwiches } from '../apis/Sandwiches';
import SandwichPreviewCard from '../components/SandwichPreviewCard';

const SearchPage = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Users');

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


  const renderResults = () => {
    const userSearch = searchParams.get('users');
    const sandwichSearch = searchParams.get('sandwiches');

    const searchedTerm = userSearch ?? sandwichSearch ?? '';
    const searchedType = userSearch ? 'Users' : sandwichSearch ? 'Sandwiches' : '';

    const results = findResults(searchedTerm, searchedType);

    const isSandwich = searchedType === 'Sandwiches';
    const isUser = searchedType === 'Users';

    if (results.length === 0 && !isSandwich && !isUser) {
      return (
        <div>
          <h3>Type in a search query to begin a search</h3>
        </div>
      );
    }

    let result;
    if (results.length === 0) {
      result =  (
        <div>
          <h3>No results found</h3>
        </div>
      );
    } else if (isSandwich) {
      result = results.map((sandwich) => (
        <SandwichPreviewCard
          key={sandwich._id}
          _id={sandwich._id}
          name={sandwich.name}
          description={sandwich.description}
          price={sandwich.price}
        />
      ));
    } else if (isUser) {
      result = results.map((user) => {
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

    return (
      <>
        <Typography
          variant='h5'
          sx={{
            fontStyle: 'italic',
            margin: '5px',
          }}
        >
          {`Showing Results for ${searchedType}: ${searchedTerm}`}
        </Typography>
        {result}
      </>
    );
  };

  const findResults = (searchedTerm, searchedType) => {

    if (searchedTerm === '' || searchedType === '') {
      return [];
    }

    // If the search type is 'Users', add any users whose email, username, or name matches the search term (case-insensitive)
    if (searchedType === 'Users') {
      const usersResults = users.filter(
        (user) =>
          (user?.email || '')
            .toLowerCase()
            .includes(searchedTerm.toLowerCase()) ||
            (user?.username || '')
              .toLowerCase()
              .includes(searchedTerm.toLowerCase()) ||
            (user?.name || '').toLowerCase().includes(searchedTerm.toLowerCase())
      );
      return usersResults;
    }

    // If the search type is 'Sandwiches', add any sandwiches whose name, description, or price (converted to string) matches the search term (case-insensitive)
    if (searchedType === 'Sandwiches') {
      const sandwichesResults = sandwiches.filter(
        (sandwich) =>
          sandwich.name.toLowerCase().includes(searchedTerm.toLowerCase()) ||
            sandwich.description
              .toLowerCase()
              .includes(searchedTerm.toLowerCase()) ||
            sandwich.price.toString().includes(searchedTerm)
      );
      return sandwichesResults;
    }

    return [];
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
          onClick={() => {
            setSearchParams(searchType === 'Users' ? { users: searchTerm } : { sandwiches: searchTerm });
          }}
        >
          <SearchIcon />
        </IconButton>

      </Paper>
      <hr style={{ border: '0.5px solid black', opacity: '1' }} />
      {renderResults()}
    </div>
  );
};

export default SearchPage;
