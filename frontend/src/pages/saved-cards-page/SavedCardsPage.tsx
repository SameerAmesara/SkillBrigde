import { Box, Button, Grid, Icon, Typography } from "@mui/material";
import { useState } from "react";
import AddCardDialog from "../../components/add-card-dialog/AddCardDialog";
import SavedCard from "../../components/saved-card/SavedCard";
import { AddCircle } from "@mui/icons-material";
import { useStores } from "../../mobx/RootStore";

const SavedCardsPage = () => {
  const [isAddCardOpen, setAddCardOpen] = useState(false);

  const { paymentsStore } = useStores();
  const { cards } = paymentsStore;

  const handleModalClose = () => {
    setAddCardOpen(false);
  };

  return (
    <Box maxWidth={500} m="0 auto">
      <AddCardDialog handleClose={handleModalClose} isOpen={isAddCardOpen} />
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" fontWeight={500}>
          Saved Cards
        </Typography>
        <Button
          type="button"
          variant="contained"
          size="small"
          startIcon={<AddCircle />}
          onClick={() => setAddCardOpen(true)}
        >
          Add Card
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <SavedCard key={card.id + index} {...card} />
          ))
        ) : (
          <Typography>No saved cards available!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SavedCardsPage;
