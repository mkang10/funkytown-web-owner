"use client";
import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography, CircularProgress, useTheme, Skeleton } from '@mui/material';
import  { StatusCount } from './StatusPieChart';
import { getDashboard } from '@/ultis/dashboardapi';
import dynamic from 'next/dynamic';

const StatusPieChart = dynamic(() => import('./StatusPieChart'), { ssr: false });
interface DetailProps { context: 'imports' | 'dispatches' | 'transfers'; }

const titleMap = { imports: 'Import', dispatches: 'Dispatch', transfers: 'Transfer' };

const DashboardDetailPage: React.FC<DetailProps> = ({ context }) => {
  const [data, setData] = useState<Record<string, StatusCount[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    getDashboard()
      .then(res => {
        setData({
          imports: res.data.importStatusCounts,
          dispatches: res.data.dispatchStatusCounts,
          transfers: res.data.transferStatusCounts,
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải dữ liệu chi tiết');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }
  if (!data) {
    return null;
  }

  const counts = data[context] as StatusCount[];
  const title = titleMap[context];

  return (
    <Box sx={{ p: 4, backgroundColor: '#fff', minHeight: '100vh' }}>
{loading ? (
  <Grid container spacing={3} sx={{ mt: 3 }}>
    {[...Array(3)].map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Card sx={{ borderRadius: 3, p: 2, textAlign: 'center' }}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={40} />
        </Card>
      </Grid>
    ))}
  </Grid>
) : (
  <Grid container spacing={3} sx={{ mt: 3 }}>
    {counts.map(item => (
      <Grid item xs={12} sm={6} md={4} key={item.status}>
        <Card sx={{ borderRadius: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            {item.status}
          </Typography>
          <Typography variant="h4" color="primary">
            {item.count}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
)}
    </Box>
  );
};

export default DashboardDetailPage;