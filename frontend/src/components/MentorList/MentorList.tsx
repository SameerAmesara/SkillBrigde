import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MentorCard from "../MentorCard/MentorCard";

type Mentor = {
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

type MentorListProps = {
  mentors: Mentor[];
};

const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // Set the number of items you want per page

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };

  // Calculate the current items to display
  const currentItems = mentors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box>
      <Box sx={{ overflowX: "auto" }}>
        <Grid container spacing={2}>
          {currentItems.map((mentor, index) => (
            <Grid item key={index} xs={12}>
              <MentorCard {...mentor} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack spacing={1} alignItems="center" marginTop={2}>
        <Pagination
          count={Math.ceil(mentors.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default MentorList;
