import { redirect } from "react-router-dom";
import { api } from "@/api/const";

/**
 * Check if the status of the survey to determine where should the page go
 * 200: the survey token is valid and client has not accepted the agreement
 * 403: the survey token is valid but client has accepted the agreement
 * 404: the survey does not exist
 * @param {*} token survey token
 * @returns
 */
export async function startLoader(token) {
  const resp = await fetch(`${api}/survey/${token}/status`);
  if (!resp.ok) throw redirect("/");
  const status = await resp.json();
  switch (status) {
    case 0: return token;
    case 1: return redirect(`/${token}/welcome`);
    default: throw redirect("/success");
  }
}

/**
 * fetch all sections of a questionnaire for sidebar
 * 200: the survey token is valid and client has accepted the agreement
 * 403: the survey token is valid but client has not accepted the agreement
 * 404: the survey does not exist
 * @param {*} token survey token
 * @returns
 */
export async function menuLoader(token) {
  const resp = await fetch(`${api}/survey/${token}/menu`);
  if (resp.ok) return { menu: await resp.json(), token: token };
  else if (resp.status === 403) return redirect(`/${token}`);
  else throw redirect("/");
}

export async function progressLoader(token, section) {
  const resp = await fetch(`${api}/survey/${token}/progress/${section}`);
  if (resp.ok) {
    const data = { quest: [], resp: [], token: token, section: section };
    const progress = await resp.json();
    progress.forEach((x) => {
      data.quest.push({title: x.title, body: x.body});
      data.resp.push({
        id: x.id,
        value: x.value,
        attachments: x.attachments,
      });
    });
    return data;
  } else if (resp.status === 403) return redirect(`/${token}`);
  else throw redirect("/");
}
