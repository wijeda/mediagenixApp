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

// Delete an entry from the server
export const deleteEntry = (id: string): Promise<void> => {
  return fetch(`/api/data/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      console.log("Entry deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting entry:", error);
      throw error;
    });
};

export const updateEntry = (entry: TableData): Promise<TableData> => {
  return fetch(`/api/data/${entry.id}`, {
    method: "PUT",
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
      console.error("Error updating entry:", error);
      throw error;
    });
};
