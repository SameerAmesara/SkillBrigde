import express, { Request, Response } from "express";
import paymentsService from "../services/paymentsService";

const router = express.Router();
router.post("/save-card", async (req: Request, res: Response) => {
  try {
    const { paymentMethodId, userId } = req.body;
    const response = await paymentsService.saveCardToStripe(
      paymentMethodId,
      userId
    );
    return res.status(201).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/fetch-saved-cards/:userId",
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const cards = await paymentsService.fetchSavedCardsFromStripe(userId);
      return res.status(201).json(cards);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/delete-card/:userId/:paymentMethodId",
  async (req: Request, res: Response) => {
    try {
      const { userId, paymentMethodId } = req.params;
      const response = await paymentsService.deleteSavedCardFromStripe(
        userId,
        paymentMethodId
      );
      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.post("/pay", async (req: Request, res: Response) => {
  try {
    const { userId, paymentMethodId, amount, description } = req.body;
    const response = await paymentsService.payUsingStripe({
      userId,
      paymentMethodId,
      amount,
      description,
    });
    return res.status(201).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/transactions/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const response = await paymentsService.fetchTransactions(
      userId,
      page,
      limit
    );
    return res.status(201).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
