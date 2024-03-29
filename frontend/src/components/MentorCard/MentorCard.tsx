// MentorCard.tsx
import React from "react";
import { Typography, Button, Box, Grid, Paper, Rating } from "@mui/material";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

type MentorCardProps = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  ratings: string;
  bio: string;
  experience: string;
  pay: string;
  expertise: string;
};

const MentorCard: React.FC<MentorCardProps> = ({
  firstName,
  lastName,
  experience,
  expertise,
  ratings,
  bio,
  pay,
  imageUrl,
}) => {
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} sm={2} md={3}>
          <Box>
            <img
              src={imageUrl}
              alt="Profile Image"
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "10px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} md={7}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="h5" component="h5">
              {firstName} {lastName}
            </Typography>
            <Rating
              name="read-only"
              value={parseInt(ratings)}
              precision={0.5}
              readOnly
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            />
          </Box>

          <Typography variant="subtitle2">
            Experience : {experience} years
          </Typography>
          <Typography variant="subtitle2">
            Area of Expertise : {expertise}
          </Typography>
          <Box marginTop={2}>
            <Typography variant="body2" component="p">
              {bio}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          px={0}
          mt={{ xs: 3, md: 0 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems={{ xs: "center" }}
        >
          <Rating
            name="read-only"
            value={parseInt(ratings)}
            precision={0.5}
            readOnly
            sx={{
              display: { xs: "none", md: "inline-flex" },
            }}
          />
          <LocalAtmRoundedIcon /> $ {parseFloat(pay)}/hr
          <Box>
            <Button size="small" variant="contained" color="primary">
              View Details
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MentorCard;
