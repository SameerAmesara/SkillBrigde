import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  Paper,
} from "@mui/material";

function SearchFilter() {
  return (
    <Paper>
      <Box sx={{ p: 3, width: "100%", minWidth: 200 }}>
        <Typography variant="h6">Filters</Typography>
        <FormGroup>
          <FormControl variant="outlined" sx={{ mt: 2 }}>
            <InputLabel>Area of Expertise</InputLabel>
            <Select label="Area of Expertise">
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
            </Select>
          </FormControl>

          <Typography id="experience-slider" gutterBottom sx={{ mt: 2 }}>
            Professional Experience
          </Typography>
          <Slider
            aria-labelledby="experience-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
          />

          <Typography id="rating-slider" gutterBottom sx={{ mt: 2 }}>
            Ratings
          </Typography>
          <Slider
            aria-labelledby="rating-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={5}
          />

          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Search
          </Button>
        </FormGroup>
      </Box>
    </Paper>
  );
}

export default SearchFilter;
