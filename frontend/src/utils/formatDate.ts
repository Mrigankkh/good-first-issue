import { time } from "console";

export function formatTimestamp(timestamp: string | null): string {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    console.log("Formatted Date:", timestamp);
    return date.toLocaleString("en-US", {
    
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }