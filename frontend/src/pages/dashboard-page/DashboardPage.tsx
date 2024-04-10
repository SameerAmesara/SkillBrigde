import { Grid, Paper } from "@mui/material";
import DashboardJobs from "../../components/dashboard-jobs/DashboardJobs";
import DashboardNews from "../../components/dashboard-news/DashboardNews";

const DashboardPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Paper elevation={2} sx={{ height: "100%" }}>
          <DashboardJobs />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={2} sx={{ height: "100%" }}>
          <DashboardNews />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={2}>Content feed</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={2}>Mentor bookings</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2}>My connections</Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
