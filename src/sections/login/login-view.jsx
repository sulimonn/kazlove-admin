import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, FormHelperText } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/contexts';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const { login, isAuthenticated, user } = useAuth();
  const [userData, setUserData] = useState();
  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); // Clear previous errors
    const errorResponse = await login(userData);

    if (errorResponse) {
      setError({ submit: 'Something went wrong. Please try again.' });
      return;
    }

    // Wait for state updates to reflect authentication
    setTimeout(() => {
      if (isAuthenticated === true && user?.is_admin === 1) {
        router.push('/');
      }
    }, 2000); // Short delay to ensure state is updated
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="social_link"
          label="Email address"
          type="email"
          value={userData?.social_link || ''}
          onChange={(e) => setUserData({ ...userData, social_link: e.target.value })}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={userData?.password || ''}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error.submit && (
          <Grid item xs={12} sx={{ pt: '0 !important' }}>
            <FormHelperText error>{error.submit}</FormHelperText>
          </Grid>
        )}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Войти
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Войти в Kazlove Admin</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
