import React from "react";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

interface AvailabilityComponentProps {
  availability: DaySchedule[];
  setAvailability: (newAvailability: DaySchedule[]) => void;
}

const AvailabilityComponent: React.FC<AvailabilityComponentProps> = ({
  availability,
  setAvailability,
}) => {
  const handleCheckboxChange = (index: number) => {
    const newSchedule = availability.map((item, i) =>
      i === index ? { ...item, isActive: !item.isActive } : item
    );
    setAvailability(newSchedule);
  };

  const handleTimeChange = (
    index: number,
    type: "from" | "to",
    time: string
  ) => {
    const newSchedule = availability.map((item, i) =>
      i === index ? { ...item, [type]: time } : item
    );
    setAvailability(newSchedule);
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6">Availability</Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Grid container spacing={2} alignItems="center">
        {availability.map((daySchedule, index) => (
          <React.Fragment key={daySchedule.day}>
            <Grid item xs={5}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={daySchedule.isActive}
                    onChange={() => handleCheckboxChange(index)}
                  />
                }
                label={daySchedule.day}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="time"
                disabled={!daySchedule.isActive}
                value={daySchedule.from}
                onChange={(e) =>
                  handleTimeChange(index, "from", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }} // 5 min
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={1}>
              <Box textAlign="center">To</Box>
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="time"
                disabled={!daySchedule.isActive}
                value={daySchedule.to}
                onChange={(e) => handleTimeChange(index, "to", e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }} // 5 min
                sx={{ width: "100%" }}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default AvailabilityComponent;
