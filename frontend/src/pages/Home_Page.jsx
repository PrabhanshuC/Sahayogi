import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Grid,
  CircularProgress,
  Typography,
  Alert,
  Container,
  Paper,
  Button,
  Collapse,
  InputAdornment,
  Divider,
  Stack
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Article_Card } from '../components/cards/Article_Card';
import { User_Card } from '../components/cards/User_Card';
import { api_request } from '../api';
import { Loading } from '../components/feedback/Loading';
import { useLocation, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

const Home_Page = () =>
{
  const [articles, set_articles] = useState([]);
  const [users, set_users] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(null);
  
  const [search_query, set_search_query] = useState('');
  const [author_username_filter, set_author_username_filter] = useState('');
  const [tags_filter, set_tags_filter] = useState('');
  const [start_date_filter, set_start_date_filter] = useState('');
  const [end_date_filter, set_end_date_filter] = useState('');
  const [show_filters, set_show_filters] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const get_url_search_params = () => {
    const params = new URLSearchParams(location.search);
    return {
      q: params.get('q') || '',
      author_username: params.get('author_username') || '',
      tags: params.get('tags') || '',
      start_date: params.get('start_date') || '',
      end_date: params.get('end_date') || ''
    };
  };

  const perform_search = async (query = '', filter_params = {}) =>
  {
        set_loading(true);
        set_error(null);
        set_articles([]);
        set_users([]);

        try
        {
            const params = {};
            if (query) params.q = query;
            if (filter_params.author_username) params.author_username = filter_params.author_username;
            if (filter_params.tags) params.tags = filter_params.tags;
            if (filter_params.start_date) params.start_date = filter_params.start_date;
            if (filter_params.end_date) params.end_date = filter_params.end_date;

            const query_string = new URLSearchParams(params).toString();
            
            let data;
            if (!query_string) { 
                data = await api_request('/api/articles');
                set_articles(data);
                set_users([]); 
            } else { 
                data = await api_request(`/api/search?${query_string}`);
                set_articles(data.articles || []);
                set_users(data.users || []);
                if (data.articles.length === 0 && data.users.length === 0) {
                set_error("No results found matching your query or filter criteria.");
                }
            }
        }
        catch (err)
        {
            set_error(err.message);
        }
        finally
        {
            set_loading(false);
        }
    };

    useEffect(() =>
    {
        const url_params = get_url_search_params();
        set_search_query(url_params.q);
        set_author_username_filter(url_params.author_username);
        set_tags_filter(url_params.tags);
        set_start_date_filter(url_params.start_date);
        set_end_date_filter(url_params.end_date);

        perform_search(url_params.q, {
            author_username: url_params.author_username,
            tags: url_params.tags,
            start_date: url_params.start_date,
            end_date: url_params.end_date
        });
    }, [location.search]); // Depend on location.search

    const handle_search_and_filter_submit = () => {
        const params = {};
        if (search_query) params.q = search_query;
        if (author_username_filter) params.author_username = author_username_filter;
        if (tags_filter) params.tags = tags_filter;
        if (start_date_filter) params.start_date = start_date_filter;
        if (end_date_filter) params.end_date = end_date_filter;

        const new_query_string = new URLSearchParams(params).toString();
        navigate({ search: new_query_string }); // Use navigate to update URL
    };

    const handle_clear_filters = () => {
        set_search_query('');
        set_author_username_filter('');
        set_tags_filter('');
        set_start_date_filter('');
        set_end_date_filter('');
        set_show_filters(false);
        navigate({}); // Clear URL search params
    };

    return (
        <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
            <TextField
                fullWidth
                label="Search articles or users"
                variant="outlined"
                value={search_query}
                onChange={(e) => set_search_query(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handle_search_and_filter_submit(); }}
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary !important' },
                  '& .MuiInputBase-input::placeholder': { color: 'text.secondary' },
                  '& .MuiInputBase-input': { color: 'text.primary' },
                  '& .MuiInputLabel-root': { color: 'text.secondary' },
                }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={handle_search_and_filter_submit} edge="end" aria-label="perform search">
                        <SearchIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            <IconButton onClick={() => set_show_filters(!show_filters)} sx={{ ml: 1 }} aria-label="toggle filters">
                <FilterListIcon fontSize="large" sx={{ color: 'text.primary' }} />
            </IconButton>
        </Box>

        <Collapse in={show_filters}>
          <Paper elevation={1} sx={{ p: 2, mb: 2, boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)` }}>
            <Typography variant="subtitle1" gutterBottom color="text.primary">Advanced Article Filters</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Author Username"
                  variant="outlined"
                  value={author_username_filter}
                  onChange={(e) => set_author_username_filter(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary !important' },
                    '& .MuiInputLabel-root': { color: 'text.secondary' },
                    '& .MuiInputBase-input': { color: 'text.primary' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tags (comma-separated)"
                  variant="outlined"
                  value={tags_filter}
                  onChange={(e) => set_tags_filter(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary !important' },
                    '& .MuiInputLabel-root': { color: 'text.secondary' },
                    '& .MuiInputBase-input': { color: 'text.primary' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={start_date_filter}
                  onChange={(e) => set_start_date_filter(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary !important' },
                    '& .MuiInputLabel-root': { color: 'text.secondary' },
                    '& .MuiInputBase-input': { color: 'text.primary' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={end_date_filter}
                  onChange={(e) => set_end_date_filter(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary !important' },
                    '& .MuiInputLabel-root': { color: 'text.secondary' },
                    '& .MuiInputBase-input': { color: 'text.primary' },
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={handle_clear_filters} startIcon={<ClearIcon />}>
                Clear Filters
              </Button>
              <Button variant="contained" onClick={handle_search_and_filter_submit} startIcon={<SearchIcon />}>
                Apply Filters
              </Button>
            </Box>
          </Paper>
        </Collapse>

      {loading ? (
        <Loading message="Fetching results..." />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : (
        <Paper elevation={0} sx={{ p: { xs: 1, md: 2 }, minHeight: '400px' }}>
          {users.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }} color="text.primary">
                Users ({users.length})
              </Typography>
              <Stack spacing={2}>
                {users.map((user_profile) => (
                  <User_Card key={user_profile._id} user_profile={user_profile} />
                ))}
              </Stack>
              <Divider sx={{ my: 4 }} />
            </Box>
          )}

          {articles.length > 0 && (
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }} color="text.primary">
                Articles ({articles.length})
              </Typography>
              <Stack spacing={2}>
                {articles.map((article) => (
                  <Article_Card key={article._id} article={article} />
                ))}
              </Stack>
            </Box>
          )}

          {articles.length === 0 && users.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '300px', 
                py: 4, 
                textAlign: 'center',
                backgroundColor: (theme) => theme.palette.grey[50], 
                borderRadius: 1,
                border: '1px dashed',
                borderColor: (theme) => theme.palette.grey[300],
                color: (theme) => theme.palette.text.secondary
              }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No results found.
                </Typography>
                <Typography variant="body1">
                  Try a different search query or adjust your filters.
                </Typography>
              </Box>
            </Grid>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default Home_Page;
