import { apiGet, apiPut } from "@/api/common";
import { redirect } from "react-router-dom";

/**
 * industry data loader, load industry list
 * @returns 
 */

export async function responseLoader(id) {
    const resp = await apiGet(`/case/progress/${id}`);    
    if (resp.ok) {
      const responses = await resp.json();
      return responses.map((x, idx) => {
        x.key = idx + 1;
        return x;
      });
    }
    throw redirect("/404");
  }

export async function categoryLoader() {
    const resp = await apiGet("/category");
    if (resp.ok) {
      const category = await resp.json();
      return category.map((x, idx) => {
        x.key = idx + 1;
        return x;
      });
    }
    throw redirect("/404");
  }

/**
 * update adjustment
 * @param {*} response the response object with latest info
 * @returns 
 */
export async function updateResponse(response) {
  const resp = await apiPut("/adjust/case", response);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}