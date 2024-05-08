import { apiGet, apiPut } from "@/api/common";
import { redirect } from "react-router-dom";

/**
 * industry data loader, load industry list
 * @returns 
 */

export async function caseDetailsLoader(id) {
    const resp = await apiGet(`/case/${id}`);

    if (resp.ok) {
      return await resp.json();
    //   return casedetails.map((x, idx) => {
    //     x.key = idx + 1;
    //     return x;
    //   });
    }
    throw redirect("/404");
  }

/**
 * update survey
 * @param {*} survey the survey object with latest info
 * @returns 
 */
export async function updateCase(params) {
  const resp = await apiPut(`/archive/case/${params}`);

  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}