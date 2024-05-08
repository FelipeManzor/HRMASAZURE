import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { agreePolicy } from "@/api/requests";

export default function Start() {
  const [agree, setAgree] = useState(false);
  const token = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto h-full py-10">
      <div className="w-full flex justify-center h-[34rem] bg-bridge bg-cover">
        <div className="w-2/3 h-full overflow-y-auto bg-deepblue bg-opacity-20 p-10">
          <h1 className="font-medium text-4xl">WELCOME</h1>
          <br />
          <p className="text-2xl">
            To complete the HR maturity assessment, carefully consider each
            question and select the answer that best reflects your
            organization's current practices.
          </p>
          <br />
          <p className="text-2xl">
            For each question, choose "Yes" if the statement accurately
            describes your organization's approach, "No" if it does not, and
            "Somewhat" if it partially applies.
          </p>
          <br />
          <p className="text-2xl">
            Additionally, you can upload related files for each question to
            provide further context or evidence to support your answer. There
            are 14 categories of questions, each focusing on a different aspect
            of HR. Ensure your responses are based on factual information to
            accurately assess your organization's HR maturity.
          </p>
          <br />
          <p className="text-2xl">
            You can start answering the questionnaire by choosing any category
            from left sidebar.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-10 flex gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <p>
            I have read and agreed to the{" "}
            <a className="underline">Terms & Conditions</a>
          </p>
        </div>
        <button
          disabled={!agree}
          className="btn mt-5"
          onClick={() => {
            agreePolicy(token)
              .then(() => {
                navigate(`/${token}/welcome`);
              })
              .catch((e) => {alert(e)});
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
