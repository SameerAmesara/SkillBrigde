import { Box, Button, FormControl, Grid, OutlinedInput } from "@mui/material";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect } from "react";
import { useStores } from "../../mobx/RootStore";
import SavedCard from "../saved-card/SavedCard";
import { observer } from "mobx-react";

interface PaymentFormProps {
  buttonText?: string;
  onSubmit?: () => void;
  isPayment?: boolean;
}

const PaymentForm = observer(
  ({ buttonText, onSubmit, isPayment }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { paymentsStore } = useStores();
    const { cards, payment } = paymentsStore;

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardNumberElement)!;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log("[error]", error);
      } else {
        const payload = {
          paymentMethodId: paymentMethod.id,
          createdAt: new Date(),
          userId: sessionStorage.getItem("userId") ?? "",
        };
        paymentsStore.updatePayment({ ...payload });
        if (onSubmit) {
          onSubmit();
        }
      }
    };

    useEffect(() => {
      console.log(paymentsStore.transactions);
    }, [paymentsStore]);

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        gap={2}
      >
        {isPayment
          ? cards.map((card, index) => (
              <SavedCard
                key={card.id + index}
                {...card}
                isClickable={true}
                isActive={payment.paymentMethodId === card.id}
                handleClick={() =>
                  paymentsStore.updatePayment({ paymentMethodId: card.id })
                }
              />
            ))
          : null}
        <Box sx={INPUT_WRAPPER_STYLE}>
          <CardNumberElement
            options={{ ...CARD_OPTIONS, showIcon: true, iconStyle: "solid" }}
          />
        </Box>
        <Grid container gap={1}>
          <Grid item sx={INPUT_WRAPPER_STYLE} flexGrow={1}>
            <CardExpiryElement options={CARD_OPTIONS} />
          </Grid>
          <Grid item sx={INPUT_WRAPPER_STYLE} flexGrow={1}>
            <CardCvcElement options={CARD_OPTIONS} />
          </Grid>
        </Grid>
        <FormControl>
          <OutlinedInput placeholder="Postal code" />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ maxWidth: "300px", m: "0 auto" }}
        >
          {buttonText ?? "Pay"}
        </Button>
      </Box>
    );
  }
);

const INPUT_WRAPPER_STYLE = {
  p: "18px 10px",
  border: "1px solid #a6a6a6",
  borderRadius: 1,
  ":hover": {
    border: "1px solid black",
  },
  ":visited": {
    border: "1px solid black",
  },
};

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
      border: "1px solid black",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default PaymentForm;
