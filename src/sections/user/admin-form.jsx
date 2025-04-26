import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import VerificationInput from 'react-verification-input';

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
import { resetCode } from 'src/store/reducers/action';
import {
  useAddAdminMutation,
  useResendCodeMutation,
  useVerifyEmailMutation,
} from 'src/store/reducers/users';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import './pincode.css';
// ----------------------------------------------------------------------

// ✅ Define Form Validation Schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
});

export default function AdminForm() {
  const theme = useTheme();
  const [addAdmin] = useAddAdminMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();
  const formRef = useRef();
  const { email, password, codeSent } = useSelector((state) => state.action);
  const [resendTimeout, setResendTimeout] = useState(59);
  const dispatch = useDispatch();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (email && resendTimeout > 0) {
      const timer = setInterval(() => {
        setResendTimeout((prevTimeout) => {
          if (prevTimeout <= 1) {
            clearInterval(timer);
            return 0; // Reset the countdown
          }
          return prevTimeout - 1;
        });
      }, 1000);

      // Clean up the interval when component unmounts or email changes
      return () => {
        clearInterval(timer);
      };
    }
  }, [email, resendTimeout]);

  useEffect(
    () => () => {
      dispatch(resetCode());
    },
    [dispatch]
  );
  const handleResendCode = async (setErrors) => {
    try {
      const response = await resendCode({ email });
      if (response?.error) {
        setErrors({ submit: 'Ошибка отправки кода' });
      } else {
        setResendTimeout(59);
      }
    } catch (error) {
      setErrors({ submit: 'Ошибка отправки кода' });
    }
  };

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

          {/* ✅ Formik Form */}
          {!codeSent ? (
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const response = await addAdmin(values);

                  if (!response?.error) {
                    const resp = await resendCode({ email: values.email });
                    if (resp?.error) {
                      setErrors({ submit: 'Ошибка отправки кода' });
                    } else {
                      router.push('/');
                    }
                  } else {
                    setErrors({ submit: 'Что-то пошло не так. Попробуйте еще раз.' });
                  }
                } catch (error) {
                  setErrors({ submit: 'Ошибка при добавлении администратора' });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {/* Email Field */}
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                    />
                    {/* Password Field */}
                    <TextField
                      name="password"
                      label="Пароль"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />

                    <TextField
                      name="confirmPassword"
                      label="Подтвердите пароль"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              <Iconify
                                icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Stack>
                  {/* Error Message */}
                  {errors.submit && (
                    <Grid item xs={12} sx={{ pt: '0 !important' }}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  {/* Submit Button */}
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    sx={{ mt: 3 }}
                    disabled={
                      isSubmitting || !values.email || !values.password || !values.confirmPassword
                    }
                  >
                    {isSubmitting ? 'Добавление...' : 'Добавить'}
                  </LoadingButton>
                </form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                code: '',
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                code: Yup.string().required('Код обязателен'),
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  const response = await verifyEmail({ email, code: values.code });

                  if (response?.error) {
                    setErrors({ submit: 'Неверный код' });
                  } else if (!password) {
                    router.push('/login');
                  }
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting: isLoading,
                touched,
                values,
                setErrors,
                setFieldValue,
              }) => (
                <form noValidate onSubmit={handleSubmit} ref={formRef}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        className={
                          (errors?.submit ? 'shake pin-error' : '') + (isLoading ? ' disabled' : '')
                        }
                      >
                        <VerificationInput
                          autoFocus
                          length={6}
                          validChars="0123456789"
                          placeholder=" "
                          classNames={{
                            container: 'container',
                            character: `character${
                              isLoading || isResending || isVerifying ? ' disabled' : ''
                            }`,
                            characterInactive: 'character--inactive',
                            characterSelected: 'character--selected',
                            characterFilled: 'character--filled',
                            characterError: 'character--error',
                          }}
                          onChange={(code) => {
                            setFieldValue('code', code);
                          }}
                          value={values.code}
                          onComplete={(code) => {
                            formRef.current.requestSubmit();
                          }}
                          disabled={isLoading || isResending || isVerifying}
                        />
                      </Stack>
                      <Stack
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        pt={2}
                      >
                        {touched.submit && errors.submit && (
                          <FormHelperText error id="helper-text-submit-signup">
                            {errors.submit}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {resendTimeout === 0 ? (
                      <Grid item xs={12} mt={2}>
                        <Typography
                          variant="body2"
                          textAlign="center"
                          color="text.primary"
                          fontWeight="100"
                          onClick={() => {
                            handleResendCode(setErrors);
                          }}
                          sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            width: 'fit-content',
                            mx: 'auto',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              width: '100%',
                              height: '2px',
                              backgroundColor: isLoading ? 'text.disabled' : 'primary.main',
                            },
                            color: isLoading ? 'text.disabled' : 'primary.main',
                          }}
                          disabled={isLoading}
                        >
                          Отправить код еще раз
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item xs={12} mt={2}>
                        <Typography
                          variant="body2"
                          textAlign="center"
                          color="text.primary"
                          fontWeight="100"
                        >
                          Отправить повторно через:
                        </Typography>
                        <Typography
                          variant="body2"
                          textAlign="center"
                          color="text.primary"
                          fontWeight="100"
                        >
                          {`00:${resendTimeout < 10 ? `0${resendTimeout}` : resendTimeout}`}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </form>
              )}
            </Formik>
          )}
        </Card>
      </Stack>
    </Box>
  );
}
