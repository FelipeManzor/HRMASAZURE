import { apiGet } from "@/api/common";
import { redirect } from "react-router-dom";

/**
 * industry data loader, load industry list
 * @returns 
 */

export async function progressCaseLoader() {
    const resp = await apiGet("/progress-case");
    if (resp.ok) {
      const progresscase = await resp.json();
      return progresscase.map((x, idx) => {
        x.key = idx + 1;
        return x;
      });
    }
    throw redirect("/404");
  }