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

import { bgGradient } from 'src/theme/css';
import { useAddAdminMutation } from 'src/store/reducers/users';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AdminForm() {
  const theme = useTheme();
  const [addAdmin] = useAddAdminMutation();
  const [userData, setUserData] = useState();
  const [error, setError] = useState({});

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    const response = await addAdmin(userData);
    if (!response?.error) {
      router.push('/');
    } else {
      setError({ submit: 'Something went wrong. Please try again.' });
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          type="email"
          value={userData?.email || ''}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <TextField
          name="password"
          label="Пароль"
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
        onClick={handleClick}
        sx={{ mt: 3 }}
        disabled={!userData?.email || !userData?.password}
      >
        Добавить
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

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 520,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Форма добавления администратора
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
