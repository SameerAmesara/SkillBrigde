import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchFilter from "../../components/MentorSearchFilter/SearchFilter";
import MentorList from "../../components/MentorList/MentorList";
import axios from "axios";

const FindMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/mentor");
        setMentors(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Grid component="main" xs={12}>
      <Typography variant="h5">Find a Mentor</Typography>
      <Divider />
      <Box marginTop={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <SearchFilter />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <MentorList mentors={mentors} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default FindMentor;
