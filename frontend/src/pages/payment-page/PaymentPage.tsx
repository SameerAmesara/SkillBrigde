import { Container, Grid } from "@mui/material";
import PaymentForm from "../../components/payment-form/PaymentForm";

const PaymentPage = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={7}>
          Payment details
        </Grid>
        <Grid item xs={12} sm={5}>
          <PaymentForm isPayment={true} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;
