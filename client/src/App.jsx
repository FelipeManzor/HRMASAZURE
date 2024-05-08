import "@/global.scss";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function App({ children }) {
  const main = children ? children : <Outlet />;
  return (
    <>
      <header className="flex justify-between items-center border-b border-black h-20">
        <h1 className="text-3xl font-normal italic ml-4">
          HR Maturity Assessment
        </h1>
        <img className="h-9 mr-16" src="/vincent-logo.svg" />
      </header>
      <main className="overflow-hidden">
        <Suspense>{main}</Suspense>
      </main>
      <footer className="h-12 bg-gradient-to-r from-deepblue to-lightblue"></footer>
    </>
  );
}

export default App;
