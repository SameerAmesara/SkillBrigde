import {
  Box,
  FormControl,
  Grid,
  OutlinedInput,
  Skeleton,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useStores } from "../../mobx/RootStore";
import SavedCard from "../saved-card/SavedCard";
import { observer } from "mobx-react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface PaymentFormProps {
  buttonText?: string;
  onSubmit?: (paymentMethodId: string) => void;
  isPayment?: boolean;
}

const PaymentForm = observer(
  ({ buttonText, onSubmit, isPayment }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { paymentsStore } = useStores();
    const { cards, payment, isCardsLoading } = paymentsStore;
    const [isLoading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const postalCode = form.elements.namedItem(
        "postalCode"
      ) as HTMLInputElement;

      if (paymentsStore.payment.paymentMethodId) {
        setFormError("");
        if (onSubmit) {
          try {
            setLoading(true);
            await onSubmit("");
            setLoading(false);
          } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            if (axiosError.response?.data) {
              const { message } = axiosError.response.data;
              toast.error(message);
            }
          }
        }
        return;
      }

      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardNumberElement)!;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setFormError(error.message ?? "Invalid card details");
      } else {
        if (!postalCode.value) {
          setFormError("Enter valid postal code.");
          return;
        }

        setFormError("");

        if (onSubmit) {
          setLoading(true);
          paymentsStore.updatePayment({ paymentMethodId: paymentMethod.id });
          await onSubmit(paymentMethod.id);
          setLoading(false);
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
        {isPayment ? (
          isCardsLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={70}
              sx={{ maxWidth: 500 }}
            />
          ) : (
            cards.map((card, index) => (
              <SavedCard
                key={card.id + index}
                {...card}
                isClickable={true}
                isActive={payment.paymentMethodId === card.id}
                handleClick={() => {
                  if (paymentsStore.payment.paymentMethodId === card.id) {
                    paymentsStore.updatePayment({ paymentMethodId: "" });
                  } else {
                    paymentsStore.updatePayment({ paymentMethodId: card.id });
                  }
                }}
                hideDelete={true}
              />
            ))
          )
        ) : null}
        <Box sx={INPUT_WRAPPER_STYLE}>
          <CardNumberElement
            onFocus={() => paymentsStore.updatePayment({ paymentMethodId: "" })}
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
          <OutlinedInput placeholder="Postal code" name="postalCode" />
        </FormControl>
        {formError ? (
          <Typography variant="subtitle1" color="red">
            {formError}
          </Typography>
        ) : null}
        <LoadingButton
          variant="contained"
          type="submit"
          fullWidth
          sx={{ maxWidth: "300px", m: "0 auto" }}
          loading={isLoading}
        >
          {buttonText ?? "Pay"}
        </LoadingButton>
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
