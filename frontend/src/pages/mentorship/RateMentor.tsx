import {
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  Button,
  Rating,
  TextField,
} from "@mui/material";
import RatingTable from "../../components/RatingTable/RatingTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RateMentor = () => {
  const { mentorId } = useParams();
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    // Assuming you have a mentor ID in your URL route, e.g., /rate-mentor/:mentorId
    console.log(mentorId); // Check if you are getting the ID here
    // Now you can fetch the mentor's details using this ID
    // ...
  }, [mentorId]);

  // Handle setting the average rating
  const handleAverageRating = (average: number) => {
    setAverageRating(average);
  };

  console.log("Average Ratings: ", averageRating);

  return (
    <Grid component="main">
      <Typography variant="h5">Rate a Mentor</Typography>
      <Divider />
      <Box
        sx={{
          marginTop: 2,
        }}
      >
        <Paper
          sx={{
            padding: 2,
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Box>
                <img
                  src="https://randomuser.me/api/portraits/men/14.jpg"
                  alt="Profile Image"
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "10px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <Box>
                <Typography variant="h4" fontWeight={600}>
                  John Doe
                </Typography>
                <Box marginTop={1}>
                  <Typography variant="h6">Experience : 10 years</Typography>
                </Box>
                <Typography variant="h6">
                  Area of Expertise : Cybersecurity, Network Security, Ethical
                  Hacking
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Corrupti quos voluptatum corporis doloremque repudiandae
                  voluptatibus, blanditiis unde fugit odit sapiente. Iste
                  accusantium velit natus quidem perspiciatis sint odit rem est
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Rating
                  name="read-only"
                  value={3.5}
                  precision={0.5}
                  readOnly
                  size="large"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  alignItems: "center",
                  display: "flex",
                  maxWidth: 300,
                  m: "10px auto 0",
                }}
              >
                View Details
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, md: 2 }} />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RatingTable onAverageRatingCalculated={handleAverageRating} />
          </Box>
          <Divider sx={{ mt: 2, md: 2 }} />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Specific Areas of Improvement or commendation for the Mentor."
              multiline
              maxRows={4}
            />
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button size="large" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};

export default RateMentor;
