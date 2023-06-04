import { TableData } from "../type";
import { createEntry, deleteEntry, updateEntry } from "../api/data";

export const handleCreate = (
  formData: TableData,
  tableData: TableData[],
  setTableData: (data: TableData[]) => void,
) => {

  const { startDate, endDate, ...restFormValues } = formData;

  const newEntry: TableData = {
    startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
    endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
    ...restFormValues,
  };
  createEntry(newEntry).then((response: TableData) => {
    setTableData([...tableData, response]);
  });
};

export const handleUpdate = (
  entryId: string,
  formData: TableData,
  tableData: TableData[],
  setTableData: (data: TableData[]) => void,
) => {
  const { startDate, endDate, ...restFormValues } = formData;

  const updatedEntry: TableData = {
    startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
    endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
    ...restFormValues,
  };
  console.log('entryId')
  console.log(entryId)

  updateEntry(entryId, updatedEntry)
    .then((response: TableData) => {
      const updatedTableData = tableData.map((entry) =>
        entry.id === response.id ? response : entry
      );
      setTableData(updatedTableData);
    })
    .catch((error: Error) => {
      console.error("Error updating entry:", error);
    });
};

export const handleDelete = (
  id: string,
  tableData: TableData[],
  setTableData: (data: TableData[]) => void
) => {
  deleteEntry(id)
    .then(() => {
      const updatedTableData = tableData.filter((entry) => entry.id !== id);
      setTableData(updatedTableData);
    })
    .catch((error: Error) => {
      console.error("Error deleting entry:", error);
    });
};