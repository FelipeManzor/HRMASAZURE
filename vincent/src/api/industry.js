import { apiGet, apiPut, apiPost, apiDelete } from "@/api/common";
import { redirect } from "react-router-dom";

/**
 * industry data loader, load industry list
 * @returns 
 */
export async function industryLoader() {
  const resp = await apiGet("/industry");
  if (resp.ok) {
    const industries = await resp.json();
    return industries.map((x, idx) => {
      x.key = idx + 1;
      return x;
    });
  }
  throw redirect("/404");
}

/**
 * update industry
 * @param {*} industry the industry object with latest info
 * @returns 
 */
export async function updateIndustry(industry) {
  const resp = await apiPut("/industry", industry);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}

/**
 * add a new industry
 * @param {*} industry the industry to be added
 * @returns 
 */
export async function addIndustry(industry) {
  const resp = await apiPost("/industry", industry);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}

/**
 * delete an industry
 * @param {*} id the id of the industry
 * @returns 
 */
export async function deleteIndustry(id) {
  const resp = await apiDelete(`/industry/${id}`);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}
