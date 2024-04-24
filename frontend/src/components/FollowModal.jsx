import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Stack,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import { getUserById } from '../apis/Users';
import { useNavigate } from 'react-router-dom';

const noProfiles = (isOurProfile, user, followingTrueFollowersFalse) => {
  return followingTrueFollowersFalse ? (
    <Typography sx={{ marginBottom: '20px' }}>
      {isOurProfile ? 'You are' : `${user.username} is`} not following any
      users, yet.
    </Typography>
  ) : (
    <Typography sx={{ marginBottom: '20px' }}>
      {isOurProfile ? 'You do' : `${user.username} does`} not have any
      followers, yet.
    </Typography>
  );
};

const FollowModal = ({
  showModal, // The flag that determines whether the modal is open
  user, // The user whose following/follwers list we're viewing
  isOurProfile, // A flag that determines if the user whose following/followers list we're viewing is us
  setShowModal, // The function to set the flag that determines whether the modal is open
  followUserFunc, // The function to follow a user
  unfollowUserFunc, // The function to unfollow a user
  followingTrueFollowersFalse, // A flag that determines if we're viewing the following list or the followers list
  ourId, // Our ID
}) => {
  const [profilesToDisplay, setProfilesToDisplay] = React.useState([]);

  // const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    // Map the following/followers array to an array of the user profiles for each id
    const fetchProfiles = async () => {
      if (followingTrueFollowersFalse) {
        const profiles = await Promise.all(
          user.following.map(async (id) => {
            return await getUserById(id);
          })
        );
        setProfilesToDisplay([...profiles]);
      } else {
        const profiles = await Promise.all(
          user.followers.map(async (id) => {
            return await getUserById(id);
          })
        );
        setProfilesToDisplay([...profiles]);
      }
    };

    fetchProfiles();
  }, [user]);

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={showModal}>
      <Stack
        direction='column'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <DialogTitle>
          <Stack
            direction='column'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <b>
              {isOurProfile ? 'Edit ' : `View ${user.username}'s `}
              {followingTrueFollowersFalse ? 'Following ' : 'Followers '}
            </b>
            <span style={{ fontSize: '15px' }}>
              {isOurProfile ? 'You are ' : `${user.username} is `}
              {followingTrueFollowersFalse ? 'following ' : 'followed by '}
              {profilesToDisplay.length} user
              {profilesToDisplay.length === 1 ? '' : 's'}
            </span>
          </Stack>
        </DialogTitle>

        <Divider
          sx={{
            borderColor: 'black',
            borderWidth: '1px',
            marginBottom: '20px',
            width: '80%',
            opacity: 1,
          }}
        />

        {profilesToDisplay.length === 0 ? (
          noProfiles(isOurProfile, user, followingTrueFollowersFalse)
        ) : (
          <List sx={{ marginBottom: '20px' }}>
            {profilesToDisplay.map((profile) => {
              const weFollowProfile = (profile.followers ?? []).includes(ourId);
              const isOurProfile = profile._id === ourId;
              return (
                <ListItem key={profile._id} alignItems='center'>
                  <ListItemAvatar
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/profile/${profile.username}`)}
                  >
                    {/* TODO: make this a call to get the user's actual profile pic */}
                    <Avatar alt={user.username} src={profile.profilePhoto} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/profile/${profile.username}`)}
                    primary={profile.username}
                    secondary={profile.name}
                  />
                  {ourId && (
                    <Button
                      disabled={isOurProfile}
                      variant='contained'
                      size='small'
                      color={weFollowProfile ? 'error' : 'success'}
                      sx={{ marginLeft: '40px' }}
                      onClick={
                        weFollowProfile
                          ? unfollowUserFunc(profile)
                          : followUserFunc(profile)
                      }
                    >
                      {weFollowProfile
                        ? `${isOurProfile ? 'Your Profile' : 'Unfollow'}`
                        : `${isOurProfile ? 'Your Profile' : 'Follow'}`}
                    </Button>
                  )}
                </ListItem>
              );
            })}
          </List>
        )}

        {/* {error && <div className='alert alert-danger'>{error}</div>} */}
      </Stack>
    </Dialog>
  );
};

FollowModal.propTypes = {
  showModal: PropTypes.bool,
  user: PropTypes.object,
  isOurProfile: PropTypes.bool,
  setShowModal: PropTypes.func,
  followUserFunc: PropTypes.func,
  unfollowUserFunc: PropTypes.func,
  followingTrueFollowersFalse: PropTypes.bool,
  ourId: PropTypes.string,
};

export default FollowModal;
