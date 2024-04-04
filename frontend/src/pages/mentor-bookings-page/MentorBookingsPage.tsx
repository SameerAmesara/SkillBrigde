import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import { useStores } from "../../stores/RootStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const MentorBookingsPage = observer(() => {
  const { bookingStore } = useStores();
  const { mentorBookings, isBookingsLoading } = bookingStore;
  const navigate = useNavigate();

  useEffect(() => {
    bookingStore.fetchMentorBookings();
  }, []);

  const handleViewDetails = (mentorId: string) => {
    navigate(`/mentorprofile/${mentorId}`);
  };

  const handleRateMentor = (mentorId: string) => {
    navigate(`/ratementor/${mentorId}`);
  };

  return (
    <Grid container display="flex" alignItems="flex-start" gap={2}>
      <Box width={"100%"} mb={1}>
        <Typography variant="h5">Mentor bookings</Typography>
      </Box>
      {isBookingsLoading ? (
        [1, 2, 3].map((value, index) => (
          <Skeleton key={value + index} width={250} height={250} />
        ))
      ) : mentorBookings.length > 0 ? (
        mentorBookings.map((booking, index) => (
          <Paper
            elevation={2}
            key={booking.id + index}
            sx={{ width: "100%", maxWidth: { xs: "100%", sm: 300, lg: 250 } }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              py={3}
              px={5}
              gap={1}
            >
              <Avatar
                alt={booking.mentorName}
                src={booking.mentorImg ?? ""}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6">{booking.mentorName}</Typography>
              <Typography variant="body1">{`${dayjs(booking.date).format(
                "MM/DD/YYYY"
              )} at ${booking.time}`}</Typography>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleViewDetails(booking.mentorId)}
              >
                View mentor
              </Button>
              <Button
                color="info"
                variant="contained"
                onClick={() => handleRateMentor(booking.mentorId)}
              >
                Rate mentor
              </Button>
            </Box>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No bookings found.</Typography>
      )}
    </Grid>
  );
});

export default MentorBookingsPage;
