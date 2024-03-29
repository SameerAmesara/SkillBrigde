import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
} from "@mui/material";

// Define the criteria type
type Criteria = {
  id: string;
  label: string;
};

const criteriaList: Criteria[] = [
  { id: "clarity", label: "Clarity of Guidance Provided" },
  { id: "professionalism", label: "Professionalism and Conduct" },
  { id: "communication", label: "Effectiveness of Communication" },
  { id: "goalAchievement", label: "Mentorship Goals Achievement" },
  { id: "overallExperience", label: "Overall Experience" },
];

const RatingTable: React.FC = () => {
  // Normally you would manage state to handle the selected values for each criteria

  const [selectedValues, setSelectedValues] = useState({
    clarity: "",
    professionalism: "",
    communication: "",
    goalsAchievement: "",
    overallExperience: "",
  });

  // Function to handle the radio button change
  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    criteriaId: string
  ) => {
    setSelectedValues({ ...selectedValues, [criteriaId]: event.target.value });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="feedback table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#89CFF0" }}>
            <TableCell />
            {[1, 2, 3, 4, 5].map((number) => (
              <TableCell key={number} align="center">
                {number}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {criteriaList.map((criteria) => (
            <TableRow key={criteria.id}>
              <TableCell component="th" scope="row">
                {criteria.label}
              </TableCell>
              {[1, 2, 3, 4, 5].map((value) => (
                <TableCell key={value} align="center">
                  <Radio
                    checked={selectedValues[criteria.id] === String(value)}
                    onChange={(e) => handleRadioChange(e, criteria.id)}
                    value={String(value)}
                    name={criteria.id}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RatingTable;
