import { IconCircle, IconCircleCheck } from "@tabler/icons-react";

export default function MenuItem({ item }) {
  return (
    <>
      <div>
        {item.isDone ? <IconCircleCheck size={32} color="green" /> : <IconCircle size={32} />}
      </div>
      <p className="font-black">{item.title}</p>
    </>
  );
}
