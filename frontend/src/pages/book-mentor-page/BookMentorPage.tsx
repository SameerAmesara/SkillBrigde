import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStores } from "../../mobx/RootStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { getDayNumber } from "../../utils/helpers";
import LoadingButton from "@mui/lab/LoadingButton";

const BookMentorPage = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingStore, paymentsStore } = useStores();
  const { bookMentor } = bookingStore;
  const { bookingDetails, mentorDetails } = bookMentor;
  const { availability } = mentorDetails;

  useEffect(() => {
    bookingStore.updateMentorDetails({
      availability: [
        { day: "Monday", startTime: "09:00", endTime: "17:00" },
        { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
      ],
    });
  }, []);

  const handleBack = () => {
    navigate(location.state?.prevUrl ?? "/");
  };

  const handleDateChange = (date: Dayjs | null) => {
    bookingStore.updateBookingDetails({ date });
  };

  const handleDisableDate = (date: Dayjs) => {
    const day = date.day();
    const available = availability.find(
      (item) => day === getDayNumber(item.day)
    );
    if (available) return false;
    return true;
  };

  const handleTimeChange = (event: SelectChangeEvent) => {
    bookingStore.updateBookingDetails({ time: event.target.value as string });
  };

  const handleBookClick = () => {
    paymentsStore.updatePaymentDetails({
      amount: 10.0,
      description: "Mentor description",
      type: "BOOK_MENTOR",
      referenceId: "abcd",
      name: "Book mentor",
      paymentInfo: `${bookingDetails.date?.format("MM/DD/YYYY")} ${
        bookingDetails.time
      }`,
    });
    paymentsStore.updatePayment({ amount: 10.0 * 1.15 });
    navigate("/pay", { state: { prevUrl: location.pathname } });
  };

  return (
    <Container>
      <Box pt={3}>
        <Button startIcon={<ArrowBack />} onClick={handleBack}>
          Go back
        </Button>
      </Box>
      <Grid
        container
        spacing={3}
        pt={2}
        alignItems={{ xs: "center", sm: "flex-start" }}
        justifyContent="center"
        sx={{ width: "100%", margin: "0 auto" }}
      >
        <Grid item xs={12} sm={6} md={7}>
          Booking details
        </Grid>
        <Paper elevation={2} sx={{ pt: 2, pb: 4, px: { xs: 0, md: 3 } }}>
          <Typography px={{ xs: 3, sm: 3 }} variant="h6">
            Select date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={bookingDetails.date}
              onChange={handleDateChange}
              disablePast
              disableHighlightToday
              renderLoading={() => <DayCalendarSkeleton />}
              shouldDisableDate={handleDisableDate}
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
          <Box px={3}>
            <Typography variant="h6" mb={2}>
              Select time
            </Typography>
            <FormControl fullWidth sx={{ maxWidth: "200px" }}>
              <InputLabel id="time-select-label">Time</InputLabel>
              <Select
                labelId="time-select-label"
                id="time-select"
                value={bookingDetails.time}
                label="Time"
                onChange={handleTimeChange}
              >
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="20:00">20:00</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {bookingDetails.date || bookingDetails.time ? (
            <Box px={3} mt={3}>
              <Typography variant="h6" mb={1}>
                Booking details
              </Typography>
              {bookingDetails.date ? (
                <Box mb={1} display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">Booking date:</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {bookingDetails.date?.format("MM/DD/YYYY")}
                  </Typography>
                </Box>
              ) : null}

              {bookingDetails.time ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">Booking time:</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {bookingDetails.time}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          ) : null}
          <LoadingButton
            fullWidth
            loading={false}
            disabled={!(bookingDetails.date && bookingDetails.time)}
            variant="contained"
            sx={{ maxWidth: "250px", margin: "30px auto 0", display: "flex" }}
            type="button"
            onClick={handleBookClick}
          >
            Book now
          </LoadingButton>
        </Paper>
      </Grid>
    </Container>
  );
});

export default BookMentorPage;
