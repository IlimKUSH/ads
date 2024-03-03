import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import AdCard from '../AdCard';
import Modal from '../ui/Modal';
import useAxios from '../../hooks/useAxios';
import { IAdsData } from '../../models/ads';

interface IFilterParams {
  minPrice: string;
  maxPrice: string;
  city: string;
  district: string;
  search: string;
}

const filterOptions: Record<string, string>[] = [
  { name: 'minPrice', placeholder: 'MinPrice', type: 'number' },
  { name: 'maxPrice', placeholder: 'MaxPrice', type: 'number' },
  { name: 'city', placeholder: 'City', type: 'text' },
  { name: 'district', placeholder: 'District', type: 'text' },
  { name: 'search', placeholder: 'Search by description', type: 'text' },
];

const AdsList = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [params, setParams] = React.useState<IFilterParams>({
    minPrice: '',
    maxPrice: '',
    city: '',
    district: '',
    search: '',
  });

  const paramsWithValues = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '')
  );

  const { response, loading, update } = useAxios<IAdsData>({
    method: 'get',
    url: '/ads',
    params: paramsWithValues,
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    update();
    setOpen(false);
  };

  const handleResetFilters = () => {
    setParams({
      minPrice: '',
      maxPrice: '',
      city: '',
      district: '',
      search: '',
    });
    update({
      method: 'get',
      url: '/ads',
      params: {},
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Typography variant="h1">List of ads</Typography>
        <Button variant="contained" onClick={handleToggle}>
          Filters
        </Button>
        <Button
          variant="contained"
          startIcon={<FavoriteIcon />}
          onClick={() => router.push('/favorites')}
        >
          Favorite list
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          response?.results.map((ad) => <AdCard data={ad} key={ad.id} />)
        )}
        {!loading && !response?.results.length && (
          <Typography variant="h2">No data</Typography>
        )}
      </Box>

      <Modal open={open} onClose={handleToggle}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography variant="h3">Filters</Typography>

          {filterOptions.map((val) => (
            <TextField
              key={val.name}
              type={val.type}
              name={val.name}
              placeholder={val.placeholder}
              value={params[val.name as keyof IFilterParams]}
              onChange={handleFilterChange}
            />
          ))}
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdsList;
