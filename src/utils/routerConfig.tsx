import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";
import LandingPage from "../pages/landing-page/LandingPage";
import FaqPage from "../pages/faq-page/FaqPage";
import { NavigationItem } from "../models/NavigationItem.model";
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
    ],
  },
]);

export const navigationItems: NavigationItem[] = [
  { path: "contact-us", label: "Contact Us" },
  { path: "faqs", label: "FAQs" },
];
