import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(data);
    } catch (err) {
      console.error('Failed to load jobs:', err.response?.data);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        {jobs.map(job => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="subtitle1" gutterBottom>{job.company}</Typography>
                <Typography variant="body2">Location: {job.location}</Typography>
                <Typography variant="body2">Experience: {job.experienceLevel}</Typography>
                <Typography variant="body2">Education: {job.education}</Typography>
                <Typography variant="body2">Salary: ${job.salaryRange?.min?.toLocaleString()} - ${job.salaryRange?.max?.toLocaleString()}</Typography>
                <Chip label={job.workType} color={job.workType === 'Remote' ? 'success' : 'default'} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;