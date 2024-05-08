import { createBrowserRouter } from "react-router-dom";
import { startLoader, menuLoader, progressLoader } from "./api/loader";
import App from "@/App";
import { lazy } from "react";

const Start = lazy(() => import("@/layout/Start"));
const Survey = lazy(() => import("@/layout/Survey"));
const QuestionForm = lazy(() => import("@/layout/QuestionForm"));
const Error = lazy(() => import("@/layout/Error"));
const Success = lazy(() => import("@/layout/Success"));
const Welcome = lazy(() => import("@/layout/Welcome"));

const router = createBrowserRouter([
  {
    path: "/:surveyToken",
    element: <App />,
    children: [
      {
        index: true,
        element: <Start />,
        loader: ({ params }) => {
          return startLoader(params.surveyToken);
        },
      },
      {
        element: <Survey />,
        loader: ({ params }) => {
          return menuLoader(params.surveyToken);
        },
        shouldRevalidate: () => false,
        children: [
          {
            path: "welcome",
            element: <Welcome />,
          },
          {
            path: ":section",
            element: <QuestionForm />,
            loader: ({ params }) => {
              return progressLoader(params.surveyToken, params.section);
            },
            shouldRevalidate: ({ currentUrl, nextUrl }) => {
              return currentUrl.pathname !== nextUrl.pathname;
            },
          },
        ],
      },
    ],
  },
  {
    path: "/success",
    element: (
      <App>
        <Success />
      </App>
    ),
  },
  {
    path: "*",
    element: (
      <App>
        <Error />
      </App>
    ),
  },
]);

export default router;
