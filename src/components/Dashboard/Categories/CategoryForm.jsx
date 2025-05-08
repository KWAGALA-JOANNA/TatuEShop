import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import { api } from '../../../utils/authUtils.js';
import LoadingSpinner from '../Shared/LoadingSpinner.jsx';

import ImageIcon from '@mui/icons-material/Image';

const CategoryForm = ({ editMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (editMode) {
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/categories/${id}`);
          setFormData(response.data);
        } catch (err) {
          setError(err.message || 'Failed to load category');
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await api.put(`/categories/${id}`, formData);
      } else {
        await api.post('/categories', formData);
      }
      navigate('/admin/categories');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) return <LoadingSpinner />;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        {editMode ? 'Edit Category' : 'Create New Category'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={generateSlug}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="URL Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            disabled={loading}
            helperText="Will be auto-generated from name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ImageIcon />
                </InputAdornment>
              ),
            }}
            helperText="Paste the full URL of the category image"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/categories')}
          disabled={loading}
          size="large"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          size="large"
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Saving...' : 'Save Category'}
        </Button>
      </Box>
    </Box>
  );
};

CategoryForm.propTypes = {
  editMode: PropTypes.bool,
};

CategoryForm.defaultProps = {
  editMode: false,
};

export default CategoryForm;