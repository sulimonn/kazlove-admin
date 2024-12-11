import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {
  Box,
  List,
  Button,
  ListItem,
  Container,
  TextField,
  Typography,
  ListItemText,
  CircularProgress,
} from '@mui/material';

import { SERVER_URL } from 'src/utils/VARS';

import { useAuth } from 'src/contexts';
import {
  useGetProfileQuery,
  usePostCommentMutation,
  useGetProfilePhotosQuery,
  useGetProfileCommentsQuery,
} from 'src/store/reducers/api';

import ProfileForm from './profile-form';

const ProfileView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);

  const { data: profile = {}, isFetching: isFetchingProfile } = useGetProfileQuery(id);
  const { data: photos = [], isFetching } = useGetProfilePhotosQuery(profile?.id);
  const { data: commentData = [] } = useGetProfileCommentsQuery(profile?.id);
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
        user_id: user?.user_id,
        profile_id: profile?.id,
        date: new Date(),
      };

      const response = await postComment(commentPayload);

      if (response?.data) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment({}); // Clear the comment input
      }
    }
  };
  if (!profile?.id) {
    return null;
  }

  return (
    <Container sx={{ pt: 4 }}>
      <ProfileForm
        profile={profile}
        photos={photos.map((photo) => ({
          ...photo,
          id: photo[0],
          upload: `${SERVER_URL}/${photo[1]}`,
        }))}
        isFetching={isFetching || isFetchingProfile}
      />

      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Отзывы анкеты
        </Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5} flexWrap="wrap">
                    <Typography variant="caption" color="grey.500" sx={{ fontWeight: 700, mr: 1 }}>
                      Автор • {comment.user_name}.
                    </Typography>
                    <Typography variant="caption" color="grey.500">
                      {new Date(comment.date).toLocaleDateString('ru-RU')}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="subtitle1" whiteSpace="pre-line">
                    {comment.text}
                  </Typography>
                }
              />
            </ListItem>
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
