import { TableData } from "../type";

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

export const updateEntry = (entryId: string, entry: TableData): Promise<TableData> => {
  return fetch(`/api/data/${entryId}`, {
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

export const searchEntries = async (query: string): Promise<TableData[]> => {
  const response = await fetch(`/api/search?query=${query}`);
  const data = await response.json();
  return data;
};
