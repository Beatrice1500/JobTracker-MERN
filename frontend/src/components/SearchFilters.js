import React from 'react';
import { TextField, MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material';

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  experienceFilter,
  setExperienceFilter,
  educationFilter,
  setEducationFilter,
  locationFilter,
  setLocationFilter,
  workTypeFilter,
  setWorkTypeFilter
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      <TextField
        label="Search Jobs"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: 250 }}
      />
      
      <FormControl sx={{ width: 200 }}>
        <InputLabel>Experience</InputLabel>
        <Select
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          label="Experience"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Entry">Entry Level</MenuItem>
          <MenuItem value="Mid">Mid Level</MenuItem>
          <MenuItem value="Senior">Senior Level</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 200 }}>
        <InputLabel>Education</InputLabel>
        <Select
          value={educationFilter}
          onChange={(e) => setEducationFilter(e.target.value)}
          label="Education"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="High School">High School</MenuItem>
          <MenuItem value="Bachelor's">Bachelor's Degree</MenuItem>
          <MenuItem value="Master's">Master's Degree</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 200 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          label="Location"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="Los Angeles">Los Angeles</MenuItem>
          <MenuItem value="Chicago">Chicago</MenuItem>
          <MenuItem value="Houston">Houston</MenuItem>
          <MenuItem value="Phoenix">Phoenix</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 200 }}>
        <InputLabel>Work Type</InputLabel>
        <Select
          value={workTypeFilter}
          onChange={(e) => setWorkTypeFilter(e.target.value)}
          label="Work Type"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="On-site">On-site</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchFilters;