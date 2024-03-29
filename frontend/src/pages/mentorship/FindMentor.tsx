// import { Box, Divider, Grid, Typography } from "@mui/material";
// import SearchFilter from "../../components/MentorSearchFilter/SearchFilter";
// import MentorList from "../../components/MentorList/MentorList";

// const mentors = [
//   {
//     id: 1,
//     name: "Jane Smith",
//     experience: 5,
//     areaOfExpertise: "Data Science, Python, and Machine Learning",
//     rating: 5,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     experience: 8,
//     areaOfExpertise: "Web Development, JavaScript, React",
//     rating: 4,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/men/46.jpg",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     experience: 3,
//     areaOfExpertise: "UI/UX Design, Figma, Adobe XD",
//     rating: 3,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis..",
//     imageUrl: "https://randomuser.me/api/portraits/women/20.jpg",
//   },
//   {
//     id: 4,
//     name: "Mark Brown",
//     experience: 10,
//     areaOfExpertise: "Cloud Computing, AWS, Azure",
//     rating: 5,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/men/36.jpg",
//   },
//   {
//     id: 5,
//     name: "Emily White",
//     experience: 2,
//     areaOfExpertise: "Graphic Design, Illustrator, Photoshop",
//     rating: 4,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/women/30.jpg",
//   },
//   {
//     id: 6,
//     name: "David Green",
//     experience: 7,
//     areaOfExpertise: "Cybersecurity, Network Security, Ethical Hacking",
//     rating: 3,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
//   },
//   {
//     id: 7,
//     name: "Sophia Hill",
//     experience: 6,
//     areaOfExpertise: "Mobile App Development, Flutter, React Native",
//     rating: 3,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
//   },
//   {
//     id: 8,
//     name: "Ethan Moore",
//     experience: 9,
//     areaOfExpertise: "Big Data, Hadoop, Spark",
//     rating: 5,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/men/66.jpg",
//   },
//   {
//     id: 9,
//     name: "Isabella Taylor",
//     experience: 4,
//     areaOfExpertise: "SEO, Digital Marketing, Content Writing",
//     rating: 4,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/women/50.jpg",
//   },
//   {
//     id: 10,
//     name: "Michael Davis",
//     experience: 11,
//     areaOfExpertise: "Project Management, Agile, Scrum",
//     rating: 5,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.",
//     imageUrl: "https://randomuser.me/api/portraits/men/26.jpg",
//   },
// ];

// const FindMentor = () => {
//   return (
//     <Grid component="main" xs={12}>
//       <Typography variant="h5">Find a Mentor</Typography>
//       <Divider />
//       <Box marginTop={3}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={4} md={3}>
//             <SearchFilter />
//           </Grid>
//           <Grid item xs={12} sm={8} md={9}>
//             <MentorList mentors={mentors} />
//           </Grid>
//         </Grid>
//       </Box>
//     </Grid>
//   );
// };

// export default FindMentor;

import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/mentor");
        setMentors(response.data);
      } catch (err) {
        setError(err.message);
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
