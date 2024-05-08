import { IconCloudUpload } from "@tabler/icons-react";
import { upload } from "@/api/requests";

export default function Upload({ id, responses, token, setResponses }) {
  function fileInput(e) {
    const file = e.target.files[0];
    const responseId = responses[id].id;
    upload(responseId, token, file)
      .then((attachmentId) => {
        const newResponses = [...responses];
        newResponses[id].attachments.push({
          id: attachmentId,
          name: file.name,
          size: Math.ceil(file.size / 1024),
        });
        setResponses(newResponses);
      })
      .catch((e) => alert(e));
  }
  return (
    <>
      <input id={id} type="file" onChange={fileInput} className="hidden" />
      <button
        onClick={() => {
          const upload = document.getElementById(id);
          upload.click();
        }}
      >
        <IconCloudUpload size={32} />
      </button>
    </>
  );
}
