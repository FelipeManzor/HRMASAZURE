import CenterContainer from "@/component/CenterContainer";

export default function Error() {
  return (
    <CenterContainer>
      <div className=" w-[85%] p-10 bg-lightgray">
        <h1 className="text-4xl">Assessment Instruction</h1>
        <br />
        <p className="text-2xl">
          To complete the HR maturity assessment, carefully consider each
          question and select the answer that best reflects your organization's
          current practices.
        </p>
        <br />
        <p className="text-2xl">
          For each question, choose "Yes" if the statement accurately describes
          your organization's approach, "No" if it does not, and "Somewhat" if
          it partially applies.
        </p>
        <br />
        <p className="text-2xl">
          Additionally, you can upload related files for each question to
          provide further context or evidence to support your answer. There are
          14 categories of questions, each focusing on a different aspect of HR.
          Ensure your responses are based on factual information to accurately
          assess your organization's HR maturity.
        </p>
        <br />
        <p className="text-2xl">
          You can start answering the questionnaire by choosing any category
          from left sidebar.
        </p>
      </div>
    </CenterContainer>
  );
}
