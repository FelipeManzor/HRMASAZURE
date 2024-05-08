import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import Radio from "@/component/Radio";
import Upload from "@/component/Upload";
import { save } from "@/api/requests";

export default function QuestionForm() {
  const { quest, resp, section, token } = useLoaderData();
  const [questions, setQuestions] = useState(quest);
  const [responses, setResponses] = useState(resp);
  const [menu, setMenu] = useOutletContext();

  useEffect(() => {
    setQuestions(quest);
    setResponses(resp);
  }, [section]);

  function changeOption(index, value) {
    const newResponses = [...responses];
    newResponses[index].value = value;
    setResponses(newResponses);
  }

  return (
    <div className="ml-10 w-[900px]">
      {questions.map((item, index) => (
        <div className="my-8" key={index}>
          <div className="bg-lightgray px-2 py-6 rounded-lg font-medium">
            <p className="text-2xl">{index + 1}. {item.title}</p>
            <p className="text-xl">{item.body}</p>
          </div>
          <div className="mt-5 flex justify-evenly">
            <Radio
              name={index}
              score={2}
              value={responses[index].value}
              onChange={changeOption}
            />
            <Radio
              name={index}
              score={0}
              value={responses[index].value}
              onChange={changeOption}
            />
            <Radio
              name={index}
              score={1}
              value={responses[index].value}
              onChange={changeOption}
            />
          </div>
          <div className="flex justify-center items-center gap-2 text-xl mt-10">
            <p>Click to upload supporting documents</p>
            <Upload
              id={index}
              responses={responses}
              setResponses={setResponses}
              token={token}
            />
          </div>
          <div className="mt-5">
            {responses[index].attachments.map((file, fileIndex) => (
              <div
                key={fileIndex}
                className="grid grid-cols-8 text-themeblue odd:bg-oddgray even:bg-evengray py-2"
              >
                <p className="col-span-2 col-start-2 truncate">{file.name}</p>
                <p className="col-span-1 col-start-6">{file.size} KB</p>
                <button
                  className="col-span-1"
                  onClick={() => {
                    const newResponses = [...responses];
                    newResponses[index].attachments.splice(fileIndex, 1);
                    setResponses(newResponses);
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-save fixed bottom-20 right-5"
        onClick={() => {
          save(token, section, responses)
            .then((data) => {
              alert(data);
              const isDone = Object.values(responses).every(
                (v) => v.value !== null
              );
              const newMenu = menu.map((item) => {
                if (item.id == section) {
                  item.isDone = isDone;
                }
                return item;
              });
              setMenu(newMenu);
            })
            .catch((e) => {
              alert(e);
            });
        }}
      >
        Save
        <IconDeviceFloppy size={25} />
      </button>
    </div>
  );
}
