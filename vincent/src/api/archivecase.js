import { apiGet } from "@/api/common";
import { redirect } from "react-router-dom";

/**
 * industry data loader, load industry list
 * @returns 
 */

export async function archiveCaseLoader() {
    const resp = await apiGet("/archived-case");
    if (resp.ok) {
      const archivecase = await resp.json();
      return archivecase.map((x, idx) => {
        x.key = idx + 1;
        return x;
      });
    }
    throw redirect("/404");
  }