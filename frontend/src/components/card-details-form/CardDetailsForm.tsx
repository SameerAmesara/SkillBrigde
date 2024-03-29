import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import countries from "../../utils/countries.json";

const CardDetailsForm = () => {
  return (
    <Box
      component="form"
      onSubmit={() => {
        console.log("Submitted");
      }}
      display="flex"
      flexDirection={"column"}
      gap={2}
      alignItems="center"
    >
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-card-number">
          Card number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-card-number"
          type={"number"}
          endAdornment={
            <InputAdornment position="end">
              {/* <img src={visaIcon} width={30} /> */}
              <CreditCard fontSize="large" />
            </InputAdornment>
          }
          label="Card number"
          placeholder="Card number"
        />
      </FormControl>
      <FormGroup row sx={{ gap: 1, width: "100%" }}>
        <FormControl variant="outlined" sx={{ flex: "1 1 0px" }}>
          <InputLabel htmlFor="outlined-expiration">Expiration</InputLabel>
          <OutlinedInput
            id="outlined-expiration"
            type={"number"}
            label="Expiration"
            placeholder="MM/YY"
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ flex: "1 1 0px" }}>
          <InputLabel htmlFor="outlined-cvv">CVC</InputLabel>
          <OutlinedInput
            id="outlined-cvv"
            type={"number"}
            label="CVC"
            placeholder="CVC"
          />
        </FormControl>
      </FormGroup>
      <Autocomplete
        fullWidth
        disablePortal
        id="autocomplete-country"
        options={countries.map((country) => {
          return { label: country.name, code: country.code };
        })}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-postal-code">Postal code</InputLabel>
        <OutlinedInput
          id="outlined-postal-code"
          type={"text"}
          label="Postal code"
          placeholder="Postal code"
        />
      </FormControl>
      <Button variant="contained" sx={{ width: "100%", maxWidth: "300px" }}>
        Pay
      </Button>
    </Box>
  );
};

export default CardDetailsForm;
