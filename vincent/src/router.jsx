import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Welcome from "@/page/Welcome";
import Archive from "@/page/Archive";
import CategoryList from "@/page/CategoryList";
import CreateCase from "@/page/CreateCase";
import ImportQuestion from "@/page/ImportQuestion";
import IndustryList from "@/page/IndustryList";
import InProgressCase from "@/page/InProgressCase";
import NewQuestion from "@/page/NewQuestion";
import NewQuestionSet from "@/page/NewQuestionSet";
import QuestionList from "@/page/QuestionList";
import QuestionSetList from "@/page/QuestionSetList";
import CaseDetails from "@/page/CaseDetails";
import ArchiveView from "@/page/ArchiveView";
import AdjustRisks from "@/page/AdjustRisks";
import ArchiveDetails from "@/page/ArchiveDetails";
import QuestionSetListDetail from "@/page/QuestionSetListDetail";
import NotFound from "@/page/NotFound";

import { industryLoader } from "@/api/industry";

import { questionSetLoader } from "@/api/createcase";
import { progressCaseLoader } from "@/api/progresscase";
import { caseDetailsLoader } from "@/api/casedetails";
import { responseLoader } from "@/api/adjustrisks";
import { categoryLoader } from "@/api/adjustrisks";
import { archiveCaseLoader } from "@/api/archivecase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/case/create",
        element: <CreateCase />,
        loader: async () => {
          const industryData = await industryLoader();
          const questionSetData = await questionSetLoader();
          return { industryData, questionSetData };
        },
      },
      {
        path: "/case/inprogress",
        element: <InProgressCase />,
        loader: async () => {
          const industryData = await industryLoader();
          const progressCaseData = await progressCaseLoader();
          return { industryData, progressCaseData };
        },
      },
      {
        path: "/case/archive",
        element: <Archive />,
        loader: async () => {
          const industryData = await industryLoader();
          const archiveCaseData = await archiveCaseLoader();
          return { industryData, archiveCaseData };
        },
      },
      {
        path: "/question/list",
        element: <QuestionList />,
      },
      {
        path: "/question/create",
        element: <NewQuestion />,
      },
      {
        path: "/question/import",
        element: <ImportQuestion />,
      },
      {
        path: "/category/list",
        element: <CategoryList />,
      },
      {
        path: "/questionset/create",
        element: <NewQuestionSet />,
      },
      {
        path: "/questionset/list",
        element: <QuestionSetList />,
      },
      {
        path: "/questionset/list/:questionSet", // Parameterized route for details
        element: <QuestionSetListDetail />,
      },
      {
        path: "/industry/list",
        element: <IndustryList />,
        loader: industryLoader,
      },
      {
        path: "/case/details/:survey",
        element: <CaseDetails />,
        loader: async ({params})=>{
          return caseDetailsLoader(params.survey)
        }
      },
      {
        path: "/case/archiveview/:survey",
        element: <ArchiveView />,
        loader: async ({params})=>{
          const categoryData = await categoryLoader();
          const responseData = await responseLoader(params.survey);
          return { categoryData, responseData };
        }
      },
      {
        path: "/case/adjust/:survey",
        element: <AdjustRisks />,
        loader: async ({params})=>{
          const categoryData = await categoryLoader();
          const responseData = await responseLoader(params.survey);
          return { categoryData, responseData };
        }
      },
      {
        path: "/case/archivedetails/:survey",
        element: <ArchiveDetails />,
        loader: async ({params})=>{
          return caseDetailsLoader(params.survey)
        }
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
