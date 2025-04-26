import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, ListItem, Typography, ListItemText } from '@mui/material';

import { useGetUserQuery, useGetProfileByUserIDQuery } from 'src/store/reducers/users';

const CommentsView = ({ comment }) => {
  const { data: user = {} } = useGetUserQuery(comment.user_id);
  const { data: profile = {} } = useGetProfileByUserIDQuery(comment.user_id);
  return (
    <ListItem key={comment.id} alignItems="flex-start">
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={0.5} mb={0.5} flexWrap="wrap">
            <Typography
              variant="caption"
              color="grey.500"
              sx={{ fontWeight: 700, mr: 1 }}
              component={Link}
              to={profile?.id ? `/profile/${profile.id}` : `/users/${comment.user_id}`}
            >
              Автор • {comment.user_name}. {user?.email}
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
  );
};

CommentsView.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentsView;
