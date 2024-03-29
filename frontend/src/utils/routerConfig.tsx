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
import ApplyMentor from "../pages/mentorship/ApplyMentor";
import FindMentor from "../pages/mentorship/FindMentor";
import RateMentor from "../pages/mentorship/RateMentor";

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
        path: "/findmentor",
        element: <FindMentor />,
      },
      {
        path: "/applymentor",
        element: <ApplyMentor />,
      },
      {
        path: "/ratementor",
        element: <RateMentor />,
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/payment", element: <div>Payments</div> }],
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
]);

export const navigationItems: NavigationItem[] = [
  { path: "contact-us", label: "Contact Us", isProtected: false },
  { path: "faqs", label: "FAQs", isProtected: false },
  { path: "findmentor", label: "Find Mentor", isProtected: false },
  { path: "applymentor", label: "Apply Mentor", isProtected: false },
  { path: "ratementor", label: "Rate Mentor", isProtected: false },
];
