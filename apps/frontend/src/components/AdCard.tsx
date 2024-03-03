import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IAd } from '../models/ads';

interface IAdCardProps {
  data: IAd;
  onRemove?: () => void;
}

const AdCard = ({ data, onRemove }: IAdCardProps) => {
  const router = useRouter();
  const [inFavorites, setInFavorites] = useState(false);

  const handleLikeClick = () => {
    const favAdsJson = localStorage.getItem('likedAds');
    const favAds: IAd[] = favAdsJson != null ? JSON.parse(favAdsJson) : [];
    const test = favAds.some((ad) => ad.id === data.id);
    if (!test) {
      favAds.push(data);
      localStorage.setItem('likedAds', JSON.stringify(favAds));
      setInFavorites(true);
    } else {
      const updatedLikedAds = favAds.filter((ad) => ad.id !== data.id);
      localStorage.setItem('likedAds', JSON.stringify(updatedLikedAds));
      setInFavorites(false);
    }
  };

  useEffect(() => {
    const likedAdsJson = localStorage.getItem('likedAds');
    const likedAds: IAd[] =
      likedAdsJson != null ? JSON.parse(likedAdsJson) : [];
    setInFavorites(likedAds.some((ad) => ad.id === data.id));
  }, [data.id]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} width={250}>
      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea onClick={() => router.push(`/ads/${data.id}`)}>
          <CardMedia
            component="img"
            height="100"
            image={data.images[0].thumbnail}
            alt="image"
          />
          <CardContent sx={{ padding: '8px' }}>
            <Typography
              variant="h6"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.city_name}, {data.district_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {data.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton onClick={onRemove ?? handleLikeClick}>
            {inFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AdCard;
