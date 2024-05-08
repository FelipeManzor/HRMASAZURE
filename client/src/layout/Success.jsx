import CenterContainer from "@/component/CenterContainer";

export default function Success() {
  return (
    <CenterContainer>
      <h1 className="text-5xl font-semibold">
        You have submitted the assessment successfully
      </h1>
      <h2 className="text-3xl">
        Vincents staff will contact you as soon as possible
      </h2>
    </CenterContainer>
  );
}
