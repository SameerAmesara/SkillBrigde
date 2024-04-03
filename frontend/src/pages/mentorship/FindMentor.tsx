import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchFilter from "../../components/MentorSearchFilter/SearchFilter";
import MentorList from "../../components/MentorList/MentorList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<Filters>({
    areaOfExpertise: [],
    experience: 0,
    ratings: 0,
    gender: "",
  });

  const navigate = useNavigate();

  const handleBecomeMentor = () => {
    navigate(`/applymentor`);
  };

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
    <Grid component="main">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h5">Find a Mentor</Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                display: "flex",
                m: "0 0 10px",
              }}
              onClick={handleBecomeMentor}
            >
              Become a mentor
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box marginTop={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <SearchFilter setFilters={setFilters} />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <MentorList mentors={mentors} filters={filters} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default FindMentor;
