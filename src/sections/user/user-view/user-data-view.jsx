import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, List, ListItem, Container, Typography, ListItemText } from '@mui/material';

import { useGetUserQuery } from 'src/store/reducers/users';
import { useGetUserCommentsQuery } from 'src/store/reducers/api';

import { ProfileView } from '../../profiles/profile-view';

const UserDataView = () => {
  const { id } = useParams();
  const { data: user = {} } = useGetUserQuery(id);
  const { data: userComments = [] } = useGetUserCommentsQuery(id);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Пользователь: {user?.email}
      </Typography>

      <ProfileView />

      <Box mt={6} px={2}>
        <Typography variant="h4" gutterBottom>
          Отзывы пользователя
        </Typography>
        <List>
          {userComments.map((comment) => (
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
          {userComments.length === 0 && <Typography variant="body2">Отзывов нет</Typography>}
        </List>
      </Box>
    </Container>
  );
};

export default UserDataView;
