import React,{ useEffect, useState }  from 'react';
import { CircularProgress, Fab, Grid, Stack, Tooltip } from '@mui/material';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { getRatingsBySandwichId } from '../apis/Ratings';
import { getSandwich } from '../apis/Sandwiches';
import RatingCard from '../components/RatingCard';
import SandwichCard from '../components/SandwichCard';
import NotFound from './NotFound';
import AddIcon from '@mui/icons-material/Add';
import ReviewModal from '../components/ReviewModal';
import { selectIsWhatRole, selectUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';

const SandwichPage = () => {
  const { sid } = useParams();
  const [sandwich, setSandwich] = useState({});
  const [ratings, setRatings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openNewReviewModal, setOpenNewReviewModal] = useState(false);
  const [openEditReviewModal, setOpenEditReviewModal] = useState(false);
  const [rating, setRating] = useState({});
  const user = useSelector(selectUser);
  const { isUser } = useSelector(selectIsWhatRole());

  useEffect(() => {
    getSandwich(sid)
      .then(setSandwich)
      .catch()
      .finally(() => setLoaded(true));

    getRatingsBySandwichId(sid)
      .then((data) => setRatings(data.ratings))
      .catch();

  }, []);

  useEffect(() => {
    if (rating?._id) {
      setOpenEditReviewModal(true);
    }
  }, [rating]);

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
      </Grid>);
  }

  if (_.isEmpty(sandwich)) {
    return <NotFound message={'Sandwich not found'} />;
  }

  const handleSelectedRating = (rating) => {
    setRating(rating);
    setOpenEditReviewModal(true);
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={'center'}
        justifyItems={'center'}
        /* sx={{ minHeight: '100vh' }} */
      >
        <SandwichCard 
          sandwich={sandwich}
          numRatings={ratings.length} 
          totalRating={ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length}
          onAddReview={() => setOpenNewReviewModal(true)}
        />
        <Grid 
          width='80%'
        >
          <Stack spacing={2} alignItems={'center'} width={'100%'}>
            {
              ratings && ratings.map((r) => (
                <RatingCard
                  key={r._id}
                  rating={r}
                  setRating={setRating}
                  handleEditClick={() => handleSelectedRating(r)}
                />
              ))
            }
          </Stack>
        </Grid>
        {
          isUser &&
            <Tooltip title='Add a rating'>
              <Fab
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                color='secondary'
                aria-label='add'
                onClick={() => setOpenNewReviewModal(true)}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
        }
      </Stack>
      <ReviewModal
        isNew={true}
        open={openNewReviewModal}
        setOpen={setOpenNewReviewModal}
        rating={0}
        comment={''}
        title={''}
        uid={user?._id ?? ''}
        sid={sid ?? ''}
      />
      <ReviewModal
        isNew={false}
        open={openEditReviewModal}
        setOpen={setOpenEditReviewModal}
        rating={rating.rating ?? 0}
        comment={rating.comment ?? ''}
        title={rating.title ?? ''}
        uid={rating.user_id ?? ''}
        sid={rating.sandwich_id ?? ''}
        rid={rating._id ?? ''}
      />
    </>
  );
};

export default SandwichPage;
