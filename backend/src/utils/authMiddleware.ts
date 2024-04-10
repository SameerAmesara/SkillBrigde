import * as admin from "firebase-admin";
import serviceAccount from "./skill-bridge-firebase.json";
import { NextFunction, Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const auth = admin.auth();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers.authorization?.split("Bearer ")[1] ?? "";

  if (!token) {
    return res
      .status(500)
      .json({ message: "Error verifying Firebase token: Token missing" });
  }

  return auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      (req as AuthRequest).user = decodedToken;
      return next();
    })
    .catch((error) => {
      console.error("Error verifying Firebase token:", error);
      return res
        .status(500)
        .json({ message: "Error verifying Firebase token: Invalid token" });
    });
};
