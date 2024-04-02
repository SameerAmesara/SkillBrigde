import { Close } from "@mui/icons-material";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import PaymentForm from "../payment-form/PaymentForm";

interface AddCardDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}
const AddCardDialog = ({ isOpen, handleClose }: AddCardDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth
      PaperProps={{ sx: { maxWidth: 500 } }}
    >
      <Box
        sx={{
          p: { xs: "10px 30px", sm: "30px" },
          borderRadius: "6px",
          width: "100%",
          m: 0,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" mb={2}>
          Add Card
        </Typography>
        <PaymentForm buttonText="Save card" />
      </Box>
    </Dialog>
  );
};

export default AddCardDialog;
