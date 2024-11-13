import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { adminAxiosInstance } from '../../utils/api/axiosInstance';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Grid, Card, CardContent, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await adminAxiosInstance.get("/getusers");
      setUsers(usersData.data);
     
      const workspacesData = await adminAxiosInstance.get("/workspacelist");
      
const projectsData = await adminAxiosInstance.get("/projectlist");

      setWorkspaces(workspacesData.data);
      setProjects(projectsData.data);
      console.log('projectsData.data',projectsData.data)
    };
    fetchData();
  }, []);

 
  const userGrowthData = {
    labels: users.map(user => new Date(user.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'User Growth',
        data: users.map((_, index) => index + 1),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: '#36A2EB',
        pointBorderColor: '#36A2EB',
        pointRadius: 5,
      },
    ],
  };

  const workspaceData = {
    labels: workspaces.map(ws => ws.name),
    datasets: [
      {
        label: 'Number of Projects',
        data: workspaces.map(ws => ws.projects.length),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const activeProjects = projects.filter(project => project.status).length;
  const inactiveProjects = projects.length - activeProjects;
  const projectStatusData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Project Status',
        data: [activeProjects, inactiveProjects],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={3} padding={2}>
    
      <Grid item xs={12} md={6}>
         <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "#0F172A", 
                  marginBottom: '20px', 

                }}
              >
                Admin Dashboard
              </Typography>
            </motion.div>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              Projects
            </Typography>
            <Pie
              data={projectStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { labels: { color: '#333' } },
                },
              }}
            />
          </CardContent>
        </Card>
      </Grid>

      
      <Grid item xs={12} md={6}>
       
        <Card style={{ marginBottom: 16 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              User Growth
            </Typography>
            <Line
              data={userGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  x: {
                    ticks: { color: '#333' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                  },
                  y: {
                    ticks: { color: '#333' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                  },
                },
                plugins: {
                  legend: { labels: { color: '#333' } },
                },
              }}
            />
          </CardContent>
        </Card>

       
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center">
              Workspaces
            </Typography>
            <Bar
              data={workspaceData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  x: {
                    ticks: { color: '#333' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                  },
                  y: {
                    ticks: { color: '#333' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                  },
                },
                plugins: {
                  legend: { labels: { color: '#333' } },
                },
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
