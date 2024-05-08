import { api } from "@/api/const";

export async function fetchResponses(token, section) {
  const resp = await fetch(`${api}/survey/${token}/response/${section}`);
  if (resp.ok) return await resp.json();
  else throw new Error(await resp.text());
}

export async function agreePolicy(token) {
  const resp = await fetch(`${api}/survey/${token}/agree`, {
    method: "PUT",
  });
  if (resp.ok) return await resp.json();
  else throw new Error(await resp.text());
}

export async function save(token, section, data) {
  const resp = await fetch(`${api}/survey/${token}/progress/${section}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (resp.ok) return await resp.json();
  else throw new Error(await resp.text());
}

export async function upload(responseId, token, file) {
  const formData = new FormData();
  formData.append("file", file);
  const resp = await fetch(`${api}/survey/${token}/upload/${responseId}`, {
    method: "POST",
    body: formData,
  });
  if (resp.ok) return await resp.json();
  else throw new Error(await resp.text());
}

export async function submit(token) {
  const resp = await fetch(`${api}/survey/${token}/submit`, {
    method: "PUT",
  });
  if (resp.ok) return await resp.json();
  else throw new Error(await resp.text());
}
