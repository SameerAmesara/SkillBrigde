import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";
import LandingPage from "../pages/landing-page/LandingPage";
import FaqPage from "../pages/faq-page/FaqPage";
import SignIn from "../components/SignIn/SignIn";
import { NavigationItem } from "../models/NavigationItem.model";
import SignUp from "../components/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/faqs",
        element: <FaqPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export const navigationItems: NavigationItem[] = [
  { path: "contact-us", label: "Contact Us" },
  { path: "faqs", label: "FAQs" },
  { path: "sign-in", label: "SignIn" },
  { path: "sign-up", label: "SignUp" }
];
