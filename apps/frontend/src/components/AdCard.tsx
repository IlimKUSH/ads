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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useRouter } from 'next/navigation';
import { IAd } from '../models/ads';

interface IAdCardProps {
  data: IAd;
}

const AdCard = ({ data }: IAdCardProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    const likedAdsJson = localStorage.getItem('likedAds');
    const likedAds: IAd[] =
      likedAdsJson != null ? JSON.parse(likedAdsJson) : [];
    const test = likedAds.some((ad) => ad.id === data.id);
    if (!test) {
      likedAds.push(data);
      localStorage.setItem('likedAds', JSON.stringify(likedAds));
      setIsLiked(true);
    } else {
      const updatedLikedAds = likedAds.filter((ad) => ad.id !== data.id);
      localStorage.setItem('likedAds', JSON.stringify(updatedLikedAds));
      setIsLiked(false);
    }
  };

  useEffect(() => {
    const likedAdsJson = localStorage.getItem('likedAds');
    const likedAds: IAd[] =
      likedAdsJson != null ? JSON.parse(likedAdsJson) : [];
    setIsLiked(likedAds.some((ad) => ad.id === data.id));
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
          <IconButton onClick={handleLikeClick}>
            <ThumbUpIcon color={isLiked ? 'primary' : 'inherit'} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AdCard;
