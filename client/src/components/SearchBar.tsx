import React from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';

export interface SearchQuery {
  searchBy: SearchByFilters;
  query: string;
}

interface SearchByProps {
  onSearch: ({ query, searchBy }: SearchQuery) => void;
}

export enum SearchByFilters {
  all = 'all',
  location = 'location',
  sportType = 'sport Type',
}

const SearchBy: React.FC<SearchByProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [searchBy, setSearchBy] = React.useState(SearchByFilters.all);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchByChange = (searchBy: string | undefined) => {
    setSearchBy((searchBy as SearchByFilters) || SearchByFilters.all);
    setQuery('');
  };

  const isQueryDisabled = searchBy === SearchByFilters.all;

  const handleSearch = () => {
    onSearch({ query, searchBy });
  };

  return (
    <Grid container spacing={2} alignItems="center" style={{ padding: '1rem' }}>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Search By"
          value={searchBy}
          onChange={event => {
            const selectedKey = Object.keys(SearchByFilters).find(
              key => key === event.target.value
            );
            handleSearchByChange(selectedKey);
          }}
          fullWidth
        >
          {Object.keys(SearchByFilters).map(key => (
            <MenuItem key={key} value={key}>
              {SearchByFilters[key as keyof typeof SearchByFilters]}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Search"
          disabled={isQueryDisabled}
          value={query}
          onChange={handleInputChange}
          placeholder={`Search by ${searchBy}`}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBy;
