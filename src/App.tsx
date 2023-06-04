import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicTable from "./components/DynamicTable/DynamicTable";
import EntryFormModal from "./components/DynamicTable/EntryFormModal";
import { fetchData, searchEntries } from "./api/data";
import { handleCreate, handleDelete, handleUpdate } from "./helpers/handlers";
import { TableData } from "./type";
import "./App.css";

import schema from "./schemas/schema";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<TableData | null | undefined>();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [searchResults, setSearchResults] = useState<TableData[]>([]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const searchQuery = searchResults.join(" ");
      searchEntries(searchQuery).then((data: TableData[]) => {
        setSearchResults(data);
      });
    } else {
      fetchData().then((data: TableData[]) => {
        setTableData(data);
      });
    }
  }, [searchResults]);

  const handleEditRow = (entryId: string) => {
    const editEntry = tableData.find((entry) => entry.id === entryId);
    setEditEntry(editEntry);
    setIsModalOpen(true);
  };

  const handleEditRequest = (formData: TableData) => {
    if (editEntry) {
      handleUpdate(editEntry.id, formData, tableData, setTableData);
      setIsModalOpen(false);
      toast.success("Entry updated successfully!");
    }
  };

  const handleDeleteRow = (entryId: string) => {
    handleDelete(entryId, tableData, setTableData);
    toast.success("Entry deleted successfully!");
  };

  const handleCreateRow = () => {
    setEditEntry(null);
    setIsModalOpen(true);
  };

  const handleCreateRequest = (formData: TableData) => {
    handleCreate(formData, tableData, setTableData);
    setIsModalOpen(false);
    toast.success("Entry added successfully!");
  };

  return (
    <>
      <DynamicTable
        schema={schema}
        tableData={tableData}
        onEntryUpdate={handleEditRow}
        onEntryDelete={handleDeleteRow}
        onEntryCreate={handleCreateRow}
      />
      {isModalOpen && (
        <EntryFormModal
          schema={schema}
          handleModalCancel={() => setIsModalOpen(false)}
          handleEditRequest={handleEditRequest}
          handleCreateRequest={handleCreateRequest}
          editEntry={editEntry}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
