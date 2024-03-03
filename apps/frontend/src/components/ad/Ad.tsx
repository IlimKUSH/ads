import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';
import useAxios from '../../hooks/useAxios';
import { IAd } from '../../models/ads';
import Swiper from '../ui/Swiper';

const Ad = ({ id }: { id: number }) => {
  const { response, loading } = useAxios<IAd>({
    method: 'get',
    url: `/ads/${id}`,
  });

  const router = useRouter();

  if (!response)
    return (
      <Box>
        <Button variant="outlined" onClick={() => router.push('/ads')}>
          <Typography variant="h4">Go to main page</Typography>
        </Button>
        <Typography variant="h4">No data</Typography>
      </Box>
    );

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <CircularProgress size={50} />
    </Box>
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">{response.title}</Typography>
          <Button
            variant="outlined"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => router.back()}
          >
            <Typography variant="h4">Back</Typography>
          </Button>
        </Box>
        <Typography variant="body1">
          {response.city_name}, {response.district_name}
        </Typography>
        <Typography
          variant="h5"
          dangerouslySetInnerHTML={{ __html: response.description }}
        />
      </Box>
      <Swiper images={response.images} />
      <Typography variant="h3" textAlign="right">
        Price: {response.price}฿
      </Typography>
    </Box>
  );
};

export default Ad;
