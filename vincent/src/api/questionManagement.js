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

export async function updateQuestion(question) {
  const resp = await apiPut("/question", question);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}

export async function addQuestion(question) {
  const resp = await apiPost("/question", question);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
}


export async function importQuestion(file) {
  const formData = new FormData();
  formData.append('file', file); // Assuming 'file' is the file object obtained from the file input
  
  const resp = await fetch(`${api}/admin/import/question`, {
    method: 'POST',
    body: formData,
  });

  if (resp.ok) {
    return await resp; // Assuming the server returns JSON data
  } else {
    throw new Error(await resp.text());
  }
}


export async function categoryCreate(category) {
  const resp = await apiPost("/category",category);
  if (resp.ok) {
    const category = await resp.json();
    return category
  }
  throw redirect("/404");
}

export async function deleteCategory(id) {
  const resp = await apiDelete(`/category/${id}`);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
  
}

export async function editCategory(item) {
  const resp = await apiPut(`/category`,item);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(await resp.text());
  
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