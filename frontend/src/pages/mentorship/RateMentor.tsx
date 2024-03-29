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

const RateMentor = () => {
  return (
    <Grid component="main" xs={12}>
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
          <Grid container spacing={1} alignItems="stretch">
            <Grid item xs={12} sm={2} md={2}>
              <Box>
                <img
                  src="https://randomuser.me/api/portraits/men/56.jpg"
                  alt="Profile Image"
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "10px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography variant="h5" component="h5">
                  David Green
                </Typography>
                <Rating
                  name="read-only"
                  value={3.5}
                  precision={0.5}
                  readOnly
                  sx={{
                    display: { xs: "inline-flex", md: "none", sm: "none" },
                  }}
                />
              </Box>
              <Typography variant="subtitle2">Experience : 10 years</Typography>
              <Typography variant="subtitle2">
                Area of Expertise : Cybersecurity, Network Security, Ethical
                Hacking
              </Typography>
              <Box marginTop={2}>
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  molestie, metus quis blandit mattis, ligula augue molestie
                  lectus, id volutpat sem diam nec arcu. Sed vel tincidunt
                  lacus, a sodales nisi. Vestibulum ac enim felis.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={2}
              px={0}
              mt={{ xs: 3, md: 0, sm: 0 }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems={{ xs: "center" }}
            >
              <Rating
                name="read-only"
                value={3.5}
                precision={0.5}
                readOnly
                sx={{
                  display: { xs: "none", md: "inline-flex", sm: "inline-flex" },
                }}
              />
              <Box>
                <Button size="small" variant="contained" color="primary">
                  View Details
                </Button>
              </Box>
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
            <RatingTable />
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
