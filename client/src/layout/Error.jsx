import CenterContainer from "@/component/CenterContainer";

export default function Error() {
  return (
    <CenterContainer>
      <h1 className="text-5xl font-semibold">
        Sorry, the survey link is invalid
      </h1>
      <h2 className="text-3xl">
        Might caused by wrong or missing survey token
      </h2>
    </CenterContainer>
  );
}
