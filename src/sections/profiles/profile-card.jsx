import 'swiper/css';
import React from 'react';
import 'swiper/css/scrollbar';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar } from 'swiper/modules';

// material-ui
import { Box, Stack, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const ProfileCard = ({ girl }) => {
  const { type } = useParams();
  const [showContact, setShowContact] = React.useState(false);
  const [photos, setPhotos] = React.useState();

  const swiperRef = React.useRef(null);

  React.useEffect(() => {
    if (girl.photos.length > 0) {
      setPhotos(
        girl.photos.map((photo) => ({
          id: photo[0],
          upload: `http://176.124.214.164:8000/${photo[1]}`,
        }))
      );
    }
  }, [girl.photos]);

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  }, []);

  return (
    <Box
      height={{ xs: 668, sm: 600 }}
      sx={{
        '& .swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal': {
          top: ' var(--swiper-scrollbar-bottom, 4px)',
          bottom: 'var(--swiper-scrollbar-top, auto)',
        },
      }}
      onMouseEnter={() => swiperRef.current.autoplay.start()} // stop autoplay on hover
      onMouseLeave={() => swiperRef.current.autoplay.stop()}
    >
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        style={{ height: '100%' }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <Link
            to={`/profiles/${type}/${girl.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              height={{ xs: 550, sm: 500 }}
              width="100%"
              sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
            >
              {photos && photos[0]?.upload && (
                <img
                  src={photos[0]?.upload}
                  alt="girl"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              )}
            </Box>
            <Box position="absolute" bottom={0} p={2} minHeight="140px">
              <Typography variant="h4" color="text.primary">
                {girl?.name}, {girl?.age}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="900" my={1}>
                {girl?.city?.name}, {girl?.address}
              </Typography>
              <Typography variant="body2" color="text.secondary" whiteSpace="pre-line" mb={2}>
                {girl?.additional_info?.length > 80
                  ? `${girl.additional_info.substring(0, 80)}...`
                  : girl.additional_info}
              </Typography>
              <Typography
                variant="h5"
                color="primary.main"
                sx={{ position: 'absolute', bottom: 5, whiteSpace: 'nowrap', mt: 2 }}
                fontWeight="bold"
              >
                от {girl?.price} ₸
              </Typography>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            to={`/profiles/${type}/${girl?.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              height={{ xs: 550, sm: 500 }}
              width="100%"
              sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
            >
              <img
                src={photos && photos[1]?.upload}
                alt="girl"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </Box>

            <Box position="absolute" bottom={0} p={2} minHeight="140px">
              <Typography variant="body1" color="text.secondary" whiteSpace="pre-line" mb={1}>
                🙍‍♀️ {girl.nationality}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace="pre-line" mb={1}>
                💝 {girl.breast_size} размер груди, {girl.weight}, {girl.height}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace="pre-line" mb={2}>
                🌟 {girl?.services?.map((service) => service.name).join(', ')}
              </Typography>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            height={{ xs: 550, sm: 500 }}
            width="100%"
            sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
          >
            <img
              src={photos && photos[2]?.upload}
              alt="girl"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </Box>
          <Box
            position="absolute"
            bottom={0}
            p={2}
            minHeight="140px"
            width="auto"
            right={0}
            left={0}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="stretch"
              flexDirection="column"
              minHeight="140px"
              width="100%"
              gap={2}
              onMouseEnter={() => swiperRef.current.autoplay.stop()}
              onMouseLeave={() => swiperRef.current.autoplay.start()}
            >
              {!showContact ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%' }}
                  onClick={() => setShowContact(true)}
                >
                  Показать контакты
                </Button>
              ) : (
                <Stack direction="column" spacing={0.5}>
                  {girl.phone && (
                    <Button
                      component="a"
                      href={`tel:${girl.phone}`}
                      variant="outlined"
                      sx={{ flex: 1 }}
                      startIcon={<Iconify icon="eva:phone-fill" />}
                    >
                      <Typography variant="body1" color="text.primary">
                        {girl.phone}
                      </Typography>
                    </Button>
                  )}
                  {girl?.telegram && (
                    <Button
                      component="a"
                      href={`https://t.me/${girl.telegram}`}
                      variant="outlined"
                      sx={{ flex: 1 }}
                      startIcon={<Iconify icon="eva:telegram-fill" />}
                    >
                      <Typography variant="body1" color="text.primary">
                        {girl.telegram}
                      </Typography>
                    </Button>
                  )}
                  {girl?.whatsapp && (
                    <Button
                      component="a"
                      href={`https://wa.me/${girl.whatsapp}`}
                      variant="outlined"
                      sx={{ flex: 1 }}
                      startIcon={<Iconify icon="eva:whatsapp-fill" />}
                    >
                      <Typography variant="body1" color="text.primary">
                        {girl.whatsapp}
                      </Typography>
                    </Button>
                  )}
                </Stack>
              )}
              <Link
                to={`/profiles/${type}/${girl?.id}`}
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'stretch',
                }}
              >
                <Button variant="outlined" color="primary" sx={{ width: '100%' }}>
                  Больше деталей
                </Button>
              </Link>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

ProfileCard.propTypes = {
  girl: PropTypes.object,
};

export default ProfileCard;
