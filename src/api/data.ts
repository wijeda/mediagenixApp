// api/data.ts

import { TableData } from "../type";

// Fetch data from the server
export const fetchData = (): Promise<TableData[]> => {
  return fetch("/api/data")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

// Create a new entry on the server
export const createEntry = (entry: TableData): Promise<TableData> => {
  return fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error creating entry:", error);
      throw error;
    });
};
