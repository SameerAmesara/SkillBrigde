import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";
import LandingPage from "../pages/landing-page/LandingPage";
import FaqPage from "../pages/faq-page/FaqPage";
import SignIn from "../components/SignIn/SignIn";
import { NavigationItem } from "../models/NavigationItem.model";
import SignUp from "../components/SignUp/SignUp";
import ContactUsPage from "../pages/contact-us/ContactUsPage";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import CardDetailsForm from "../components/card-details-form/CardDetailsForm";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ProfilePage from "../pages/profile-page/ProfilePage";

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
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/payment", element: <CardDetailsForm /> }],
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfilePage uid={""} />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export const navigationItems: NavigationItem[] = [
  { path: "contact-us", label: "Contact Us", isProtected: false },
  { path: "faqs", label: "FAQs", isProtected: false },
];
