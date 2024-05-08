import { apiGet, apiPut, apiPost, apiDelete } from "@/api/common";
import { redirect } from "react-router-dom";
import { api } from "./common";

/**
 * industry data loader, load industry list
 * @returns 
 */
export async function questionLoader() {
  const resp = await apiGet("/question");
  if (resp.ok) {
    const question = await resp.json();
    return question

  }
  throw redirect("/404");
}

export async function categoryLoader() {
  const resp = await apiGet("/category");
  if (resp.ok) {
    const category = await resp.json();
    return category
  }
  throw redirect("/404");
}

export async function cuestionSetLoader() {
  const resp = await apiGet("/questionset");
  if (resp.ok) {
    const category = await resp.json();
    return category
  }
  throw redirect("/404");
}

export async function cuestionSetLoaderlvl2(id) {
  const resp = await apiGet(`/questionset/${id}`);
  if (resp.ok) {
    console.log(resp.json);
    return await resp.json();
  }
  throw new Error(await resp.text());
  
}

export async function questionSet(set) {
  const resp = await apiPost("/questionset",set);
  if (resp.ok) {
    const category = await resp.json();
    return category
  }
  throw redirect("/404");
}

/**
 * update industry
 * @param {*} industry the industry object with latest info
 * @returns 

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
 
export async function deleteIndustry(id) {
  const resp = await apiDelete(`/industry/${id}`);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
  
}
*/