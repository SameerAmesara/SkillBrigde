import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Paper,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  Input,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import AvailabilityComponent from "../../components/AvailabilityComponent/AvailabilityComponent";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const subjects = [
  "Data Science",
  "Python",
  "Machine Learning",
  "Web Development",
  "JavaScript",
  "React",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Cloud Computing",
  "AWS",
  "Azure",
  "Graphic Design",
  "Illustrator",
  "Photoshop",
  "Cybersecurity",
  "Network Security",
  "Ethical Hacking",
  "Mobile App Development",
  "Flutter",
  "React Native",
  "Big Data",
  "Hadoop",
  "Spark",
  "SEO",
  "Digital Marketing",
  "Content Writing",
  "Project Management",
  "Agile",
  "Scrum",
];

const initialSchedule: DaySchedule[] = [
  { day: "Monday", from: "00:00", to: "00:00", isActive: false },
  { day: "Tuesday", from: "00:00", to: "00:00", isActive: false },
  { day: "Wednesday", from: "00:00", to: "00:00", isActive: false },
  { day: "Thursday", from: "00:00", to: "00:00", isActive: false },
  { day: "Friday", from: "00:00", to: "00:00", isActive: false },
  { day: "Saturday", from: "00:00", to: "00:00", isActive: false },
  { day: "Sunday", from: "00:00", to: "00:00", isActive: false },
];

const ApplyMentor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [experience, setExperience] = useState(0);
  const [pay, setPay] = useState(0);
  const [areaOfExpertise, setAreaOfExpertise] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [gender, setGender] = useState("");
  const [availability, setAvailability] =
    useState<DaySchedule[]>(initialSchedule);

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExperience(parseInt(event.target.value, 10));
    setPay(parseFloat(event.target.value) * 3.5);
  };

  const handleChange = (event: SelectChangeEvent<typeof areaOfExpertise>) => {
    const value = event.target.value;
    setAreaOfExpertise(typeof value === "string" ? value.split(",") : value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedAvailability = availability
      .filter((a) => a.isActive)
      .map((a) => ({
        day: a.day,
        startTime: a.from,
        endTime: a.to,
      }));

    let imageURL = "";
    if (gender == "Male") {
      imageURL =
        "https://randomuser.me/api/portraits/men/" +
        (Math.floor(Math.random() * 100) + 1) +
        ".jpg";
    } else if (gender == "Female") {
      imageURL =
        "https://randomuser.me/api/portraits/women/" +
        (Math.floor(Math.random() * 100) + 1) +
        ".jpg";
    }

    const ratings = "0";
    const bio =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie, metus quis blandit mattis, ligula augue molestie lectus, id volutpat sem diam nec arcu. Sed vel tincidunt lacus, a sodales nisi. Vestibulum ac enim felis.";

    const mentorData = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      imageUrl: imageURL,
      ratings: ratings,
      bio: bio,
      email: email,
      phoneNumber: phoneNumber.toString(),
      experience: experience.toString(),
      pay: pay.toString(),
      expertise: areaOfExpertise.join(", "),
      resume: file?.name,
      availability: JSON.stringify(formattedAvailability),
      termsAccepted: checked.toString(),
    };

    console.log(mentorData);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/mentor",
        data: mentorData,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Grid container component="main">
      <Typography variant="h5">Apply as a Mentor</Typography>
      <Divider />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ padding: 2, borderRadius: "0.5rem" }} elevation={3}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone Number"
                  type="number"
                  id="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(parseInt(e.target.value, 10))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="experience"
                  label="Years of Experience"
                  type="number"
                  id="experience"
                  value={experience}
                  onChange={handleExperienceChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="expertise-label">
                    Area of Expertise
                  </InputLabel>
                  <Select
                    labelId="expertise-label"
                    id="expertise"
                    name="expertise"
                    multiple
                    value={areaOfExpertise}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Area of Expertise"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {subjects.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <AvailabilityComponent
                  availability={availability}
                  setAvailability={setAvailability}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <TextField
                    disabled
                    fullWidth
                    value={file ? file.name : "No file chosen"}
                    sx={{ mr: 2 }}
                  />
                  <label htmlFor="upload-button-file">
                    <Input
                      id="upload-button-file"
                      type="file"
                      onChange={handleFileChange}
                      sx={{ display: "none" }}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadOutlined />}
                      sx={{ height: "56px" }}
                    >
                      Upload
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleTermsChange}
                      color="primary"
                    />
                  }
                  label="I agree to the Terms and Conditions*"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};

export default ApplyMentor;
