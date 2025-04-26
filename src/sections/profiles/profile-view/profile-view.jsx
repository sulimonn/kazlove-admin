import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {
  Box,
  List,
  Stack,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

// eslint-disable-next-line import/extensions
import { SERVER_URL } from 'src/utils/VARS.js';

import { useAuth } from 'src/contexts';
import { useGetUserQuery } from 'src/store/reducers/users';
import {
  useGetProfileQuery,
  usePostCommentMutation,
  useGetProfileCommentsQuery,
} from 'src/store/reducers/api';

import ProfileForm from './profile-form';
import CommentsView from '../comments-view';

const ProfileView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);

  const { data: profile = {}, isFetching: isFetchingProfile } = useGetProfileQuery(id);
  const { data: commentData = [], isFetching: isFetchingComments } = useGetProfileCommentsQuery(
    profile?.id,
    {
      skip: !profile?.id,
    }
  );
  const { data: currentUser = {}, isFetching: isFetchingUser } = useGetUserQuery(profile?.user_id, {
    skip: !profile?.user_id,
  });
  const [postComment, { isLoading }] = usePostCommentMutation();
  // Handle setting comments
  useEffect(() => {
    if (commentData.length > 0) {
      setComments(commentData);
    }
  }, [commentData]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.text.trim()) {
      const commentPayload = {
        text: newComment?.text.trim(),
        user_name: newComment?.user_name,
        user_id: user?.id,
        profile_id: profile?.id,
        date: new Date(),
      };

      const response = await postComment(commentPayload);

      if (response?.data) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment({});
      }
    }
  };

  if (!profile?.id && !isFetchingProfile) {
    return (
      <Container sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Что то пошло не так
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 4 }}>
      {profile?.id && profile?.hidden === 1 && (
        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="h4" color="error">
            Профиль скрыт
          </Typography>
        </Stack>
      )}
      <ProfileForm
        photos={profile?.photos?.map((photo) => ({
          ...photo,
          id: photo[0],
          upload: `${SERVER_URL}/${photo[1]}`,
        }))}
        media={profile?.media?.map((video) => ({
          ...video,
          id: video[0],
          upload: `${SERVER_URL}/${video[1]}`,
        }))}
        profile={profile}
        isFetching={
          isFetchingProfile || isFetchingComments || isLoading || !profile?.id || isFetchingUser
        }
        currentUser={currentUser}
      />

      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Отзывы анкеты
        </Typography>
        <List>
          {comments.map((comment) => (
            <CommentsView key={comment.id} comment={comment} />
          ))}
        </List>

        {/* Comment Input */}
        <Box mt={2}>
          <TextField
            value={newComment.user_name || ''}
            fullWidth
            label="Ваше имя"
            variant="outlined"
            onChange={(e) => setNewComment((prev) => ({ ...prev, user_name: e.target.value }))}
            color="secondary"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
              },
              mb: 1,
            }}
          />
          <TextField
            fullWidth
            label="Комментарий"
            variant="outlined"
            value={newComment?.text || ''}
            onChange={(e) => setNewComment((prev) => ({ ...prev, text: e.target.value }))}
            multiline
            rows={3}
            color="secondary"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
              },
            }}
          />
          {!user?.user_id && (
            <Typography variant="subtitle2" color="error">
              Войдите или зарегистрируйтесь, чтобы оставлять комментарии
            </Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCommentSubmit}
            sx={{ mt: 2 }}
            disabled={!newComment?.text || !newComment?.user_name || !user?.user_id || isLoading}
          >
            {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Отправить комментарий'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileView;
