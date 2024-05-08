import { apiPut } from "@/api/common";

/**
 * update archive
 * @param {*} archive the archive object with latest info
 * @returns 
 */
export async function updateArchive(params) {
    const resp = await apiPut(`/unarchive/case/${params}`);
  
    if (resp.ok) {
      return await resp.json();
    }
    throw new Error(await resp.text());
  }