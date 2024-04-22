import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getSession } from '../apis/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { getRatingsByUserId } from '../apis/Ratings';
import StatusAlert from '../components/StatusAlert';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FollowModal from '../components/FollowModal';
import RatingCard from '../components/RatingCard';
import { updateUser } from '../apis/Users';
import { getUserByUsername } from '../apis/Users';
import ReviewModal from '../components/ReviewModal';
import { selectIsWhatRole } from '../auth/authSlice';

const EditableField = ({
  userId,
  keyName,
  field,
  fieldState,
  setFieldState,
  editingField,
  setEditingField,
  isOurProfile,
}) => {
  return (
    <Stack direction='column'>
      <Stack
        direction='row'
        sx={{ display: 'flex', alignItems: 'center' }}
        spacing={0}
      >
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {field}
        </Typography>
        {isOurProfile && (
          <Tooltip title={editingField ? 'Confirm Changes' : `Edit ${field}`}>
            <span>
              <IconButton
                aria-label={'toggle editing ' + field}
                disabled={fieldState === ''}
                onClick={() => {
                  if (editingField) {
                    updateUser(userId, {
                      [keyName]: fieldState,
                    })
                      .then(() => {
                        setEditingField(!editingField);
                      })
                      .catch(() => {
                        // TODO: find a good way to display this error
                        return;
                      });
                  } else {
                    setEditingField(!editingField);
                  }
                }}
                edge='end'
                sx={{
                  backgroundColor: editingField
                    ? 'rgba(0, 255, 0, 0.2)'
                    : 'rgba(0, 0, 0, 0.1)',
                  marginLeft: '10px',
                  width: '30px',
                  height: '30px',
                }}
              >
                {editingField ? <DoneIcon /> : <EditIcon />}
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Stack>
      <TextField
        id={field + '-field'}
        value={fieldState}
        label=''
        variant='standard'
        sx={{ color: 'black' }}
        InputProps={{
          disableUnderline: !editingField,
        }}
        onChange={(e) => {
          if (editingField) {
            setFieldState(e.target.value);
          }
        }}
      />
    </Stack>
  );
};

// Input prop validation
EditableField.propTypes = {
  userId: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  fieldState: PropTypes.string.isRequired,
  setFieldState: PropTypes.func.isRequired,
  editingField: PropTypes.bool.isRequired,
  setEditingField: PropTypes.func.isRequired,
  isOurProfile: PropTypes.bool.isRequired,
};

const imgInputStyle = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
};

const ProfilePage = () => {
  // TODO: hide the /profile page from people not logged in, redirect to login/home page
  // need to also add stuff that prevents you from seeing the follow/unfollow buttons on profiles if you're not signed in
  const { uname } = useParams();

  const [ratings, setRatings] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const ourUsername = useSelector((state) => state.auth?.user?.username);
  const ourId = useSelector((state) => state.auth?.user?._id);
  const ourFollowing = useSelector((state) => state.auth?.user?.following);
  const { isAdmin } = useSelector(selectIsWhatRole(ourId));

  const [isOurProfile, setIsOurProfile] = useState(true);

  const [editedUsername, setEditedUsername] = useState('');
  const [editedFullName, setEditedFullName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const [editingUsername, setEditingUsername] = useState(false);
  const [editingFullName, setEditingFullName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [followingThisUser, setFollowingThisUser] = useState(false);
  const [thisUserFollowingUs, setThisUserFollowingUs] = useState(false);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const [selectedRating, setSelectedRating] = useState({});
  const [openEditReviewModal, setOpenEditReviewModal] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isOurProfile) {
      setFollowingThisUser((followers ?? []).includes(ourId));
      setThisUserFollowingUs((following ?? []).includes(ourId));
    }
  }, [following, followers, showFollowersModal, showFollowingModal]);

  React.useEffect(() => {
    // Check to see if there is a url parameter
    if (uname) {
      getUserByUsername(uname)
        .then((user) => {
          setProfileUser(user);
          setEditedUsername(user.username);
          setEditedFullName(user.name);
          setEditedEmail(user.email);
          setFollowers(user.followers);
          setFollowing(user.following);
          setIsOurProfile(user.username === ourUsername);
          return getRatingsByUserId(user._id);
        })
        .then((data) => setRatings(data.ratings))
        .catch((e) => setError(e.message))
        .finally(() => setLoaded(true));
    } else {
      getSession()
        .then((user) => {
          setProfileUser(user);
          setProfileUser(user);
          setEditedUsername(user.username);
          setEditedFullName(user.name);
          setEditedEmail(user.email);
          setFollowers(user.followers);
          setFollowing(user.following);
          setIsOurProfile(true);
          return getRatingsByUserId(user._id);
        })
        .then((data) => setRatings(data.ratings))
        .catch((e) => setError(e.message))
        .finally(() => setLoaded(true));
    }
  }, [showFollowersModal, showFollowingModal, followingThisUser, ourId]);

  const unfollowUser = (userToUnfollow) => async () => {
    // Update this user so that you are no longer following them
    updateUser(userToUnfollow._id, {
      followers: followers.filter((id) => id !== ourId),
    })
      .then(() => {
        setFollowingThisUser(false);

        // Update your profile so that you are no longer following them
        updateUser(ourId, {
          following: ourFollowing.filter((id) => id !== userToUnfollow._id),
        })
          .then(() => {})
          .catch(() => {});
      })
      .catch((err) => {
        setError(err?.response?.data ?? err.message);
        return;
      });
  };

  const followUser = (userToFollow) => async () => {
    updateUser(userToFollow._id, {
      followers: Array.from(new Set([...userToFollow.followers, ourId])), // Using a set to make sure no duplicates can be accidentally added!
    })
      .then(() => {
        setFollowingThisUser(true);

        // Update your profile so that you are following them
        updateUser(ourId, {
          following: Array.from(new Set([...ourFollowing, userToFollow._id])), // Using a set to make sure no duplicates can be accidentally added!
        })
          .then(() => {})
          .catch(() => {});
      })
      .catch((err) => {
        setError(err?.response?.data ?? err.message);
        return;
      });
  };

  const onEditReview = (rating) => {
    const index = ratings.findIndex((r) => r._id === rating._id);
    ratings[index] = rating;
    setRatings([...ratings]);
  };

  if (!loaded) {
    return (
      <Grid
        container
        spacing={1}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '91vh' }}
      >
        <Grid item xs={4}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  // If you are on your own profile, navigate to just /profile
  if (uname === ourUsername) {
    navigate('/profile', { replace: true });
  }

  // if (_.isEmpty(profileUser)) {
  //   // TODO if user logs in the redirect back to this page
  //   navigate('/login', { replace: true });
  // }

  // TODO: make sure guest functionality works here.

  return (
    <>
      <Stack
        direction={'column'}
        sx={{
          display: 'flex',
          alignItems: 'left',
          width: '100%',
        }}
      >
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant='h3'
            style={{ color: '#A9333A', fontWeight: 'bold' }}
          >
            {isOurProfile ? 'My Profile' : `${profileUser.username}'s Profile`}
          </Typography>
          {!isOurProfile && (
            <Button
              variant='outlined'
              size='small'
              color={followingThisUser ? 'error' : 'success'}
              sx={{ marginLeft: '20px', height: '30px' }}
              onClick={
                followingThisUser
                  ? unfollowUser(profileUser)
                  : followUser(profileUser)
              }
            >
              {followingThisUser ? 'Unfollow' : 'Follow'}
            </Button>
          )}
          {thisUserFollowingUs && (
            <span
              style={{
                fontSize: '15px',
                color: 'green',
                marginLeft: '10px',
              }}
            >
              (Follows You)
            </span>
          )}
        </Stack>
        <Divider
          sx={{
            borderColor: 'black',
            borderWidth: '0.5px',
            opacity: 1,
            margin: '20px',
          }}
        />
        <Stack direction='row'>
          <Tooltip title='Change Profile Picture'>
            <IconButton component='label' sx={{ display: 'block' }}>
              <CardMedia
                component='img'
                image='/Snoopy-doghouse-1.jpg'
                alt='Snoopy doghouse'
                sx={{
                  padding: '4px',
                  borderRadius: '50%',
                  border: '1px dashed grey',
                }}
                style={{ height: '100%', width: 'auto', maxWidth: '300px' }}
              />
              {/* TODO upload an actual image */}
              <Input type='file' style={imgInputStyle} />
            </IconButton>
          </Tooltip>
          <Stack
            direction='column'
            sx={{
              justifyContent: 'space-between',
              width: '300px',
              marginLeft: '10px',
            }}
          >
            <EditableField
              userId={profileUser._id || ''}
              keyName='username'
              field='Username'
              fieldState={editedUsername || ''}
              setFieldState={setEditedUsername}
              editingField={editingUsername}
              setEditingField={setEditingUsername}
              isOurProfile={isOurProfile}
            />
            <EditableField
              userId={profileUser._id || ''}
              keyName='name'
              field='Full Name'
              fieldState={editedFullName || ''}
              setFieldState={setEditedFullName}
              editingField={editingFullName}
              setEditingField={setEditingFullName}
              isOurProfile={isOurProfile}
            />
            <EditableField
              userId={profileUser._id || ''}
              keyName='email'
              field='Email'
              fieldState={editedEmail || ''}
              setFieldState={setEditedEmail}
              editingField={editingEmail}
              setEditingField={setEditingEmail}
              isOurProfile={isOurProfile}
            />
            <Stack direction='column'>
              <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                Following:{' '}
                <span
                  href='#'
                  onClick={() => setShowFollowingModal(true)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: '#A9333A',
                  }}
                >
                  {(following ?? []).length} User
                  {(following ?? []).length === 1 ? '' : 's'}
                </span>
              </Typography>
              <Typography
                variant='h6'
                style={{
                  fontWeight: 'bold',
                }}
              >
                Followers:{' '}
                <span
                  href='#'
                  onClick={() => setShowFollowersModal(true)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: '#A9333A',
                  }}
                >
                  {(followers ?? []).length} User
                  {(followers ?? []).length === 1 ? '' : 's'}
                </span>
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Grid item xs={13} padding={'5px'} marginTop={'30px'}>
          <Typography variant='h5'>Ratings ({ratings.length})</Typography>
          <Divider
            sx={{
              borderColor: 'black',
              borderWidth: '0.5px',
              opacity: 1,
              margin: '10px',
            }}
          />
          {ratings.length === 0 && <h1>No Sandwich Reviews</h1>}
          <Stack paddingTop={'5px'} spacing={2} alignItems={'center'} width={'100%'}>
            {ratings.map((rating) => (
              <RatingCard 
                key={rating._id}
                rating={rating}
                handleEditClick={() => {
                  setSelectedRating(rating);
                  setOpenEditReviewModal(true);
                }}
              />
            ))}
          </Stack>
        </Grid>
        {(isOurProfile || isAdmin) &&
          openEditReviewModal &&
          <ReviewModal
            open={openEditReviewModal}
            setOpen={setOpenEditReviewModal}
            isNew={false}
            onSubmit={onEditReview}
            rating={selectedRating}
            sid={profileUser._id}
            uid={ourId}
          />
        }
        {showFollowersModal && (
          <FollowModal
            showModal={showFollowersModal}
            user={profileUser}
            isOurProfile={isOurProfile}
            setShowModal={setShowFollowersModal}
            followUserFunc={followUser}
            unfollowUserFunc={unfollowUser}
            followingTrueFollowersFalse={false}
            ourId={ourId}
          />
        )}
        {showFollowingModal && (
          <FollowModal
            showModal={showFollowingModal}
            user={profileUser}
            isOurProfile={isOurProfile}
            setShowModal={setShowFollowingModal}
            followUserFunc={followUser}
            unfollowUserFunc={unfollowUser}
            followingTrueFollowersFalse={true}
            ourId={ourId}
          />
        )}
      </Stack>
      <StatusAlert
        message={error}
        setMessage={setError}
        status='alert-danger'
      />
    </>
  );
};

export default ProfilePage;
