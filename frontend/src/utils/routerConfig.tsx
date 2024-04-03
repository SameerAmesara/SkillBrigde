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
import PaymentPage from "../pages/payment-page/PaymentPage";
import SavedCardsPage from "../pages/saved-cards-page/SavedCardsPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ProfilePage from "../pages/profile-page/ProfilePage";
import DiscussionsPage from "../pages/discussions/discussions";
import DiscussionView from "../pages/discussions/discussionView";
import NewDiscussion from "../pages/discussions/newDiscussion";

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
        children: [
          { path: "/pay", element: <PaymentPage /> },
          { path: "/saved-cards", element: <SavedCardsPage /> },
          {
            path: "/profile",
            element: <ProfilePage uid={""} />,
          },
          {
            path: "/discussions",
            element: <DiscussionsPage />,
          },
          {
            path: "/discussions/:discussionId",
            element: <DiscussionView />,
          },
          {
            path: "/discussions/new",
            element: <NewDiscussion />,
          },
        ],
      },
    ],
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
