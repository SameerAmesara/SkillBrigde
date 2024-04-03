import { Button, Container, Grid, Typography } from "@mui/material";
import PaymentForm from "../../components/payment-form/PaymentForm";
import { observer } from "mobx-react";
import { useStores } from "../../mobx/RootStore";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSuccessDialog from "../../components/payment-success-dialog/PaymentSuccessDialog";

const PaymentPage = observer(() => {
  const { paymentsStore } = useStores();
  const { payment, paymentDetails } = paymentsStore;
  const navigate = useNavigate();
  const location = useLocation();

  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    paymentsStore.fetchSavedCards();
    paymentsStore.updatePaymentDetails({
      amount: 10,
      name: "Book Mentor",
      paymentInfo: "Dec 25 2024, 10:00 AM to 11:00AM",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      type: "BOOK_MENTOR",
    });
    paymentsStore.updatePayment({ amount: 10 * 1.15 });
  }, []);

  const handleSubmit = async () => {
    const response = await paymentsStore.pay();
    if (response.status === 201) {
      setPaymentSuccessful(true);
      setTimeout(() => {
        navigate(location?.state?.redirectUrl ?? "/");
      }, 1000);
    }
    return response;
  };

  const handleBack = () => {
    navigate(location.state?.prevUrl ?? "/");
  };

  return (
    <Container>
      <PaymentSuccessDialog open={isPaymentSuccessful} />
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={7}
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="flex-start"
        >
          <Button startIcon={<ArrowBack />} onClick={handleBack}>
            Go back
          </Button>
          <Typography variant="h6">{paymentDetails.name}</Typography>
          <Typography variant="body1">
            Amount: ${paymentDetails.amount}
          </Typography>
          <Typography variant="body1">
            Tax: ${(paymentDetails.amount ?? 0) * 0.15}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Total: ${payment.amount}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {paymentDetails.paymentInfo}
          </Typography>
          <Typography variant="body1">{paymentDetails.description}</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <PaymentForm isPayment={true} onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </Container>
  );
});

export default PaymentPage;
