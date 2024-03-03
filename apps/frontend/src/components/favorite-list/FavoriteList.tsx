import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';
import { IAd } from '../../models/ads';
import AdCard from '../AdCard';

const FavoritesList = () => {
  const router = useRouter();
  const [favAds, setFavAds] = React.useState<IAd[]>([]);

  React.useEffect(() => {
    const favAdsJson = localStorage.getItem('likedAds');
    const favAdsData: IAd[] = favAdsJson != null ? JSON.parse(favAdsJson) : [];
    setFavAds(favAdsData);
  }, []);

  const handleRemoveFromFavorites = (id: number) => {
    const updatedFavAds = favAds.filter((ad) => ad.id !== id);
    localStorage.setItem('likedAds', JSON.stringify(updatedFavAds));
    setFavAds(updatedFavAds);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Typography variant="h2">Favorite list</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {favAds.length > 0 ? (
          favAds.map((ad) => (
            <AdCard
              data={ad}
              key={ad.id}
              onRemove={() => handleRemoveFromFavorites(ad.id)}
            />
          ))
        ) : (
          <Box>
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => router.back()}
            >
              <Typography variant="h4">Go to main page</Typography>
            </Button>
            <Typography variant="h2">No data</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavoritesList;
