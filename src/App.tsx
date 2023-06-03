import "./App.css";
import DynamicTable from "./components/DynamicTable/DynamicTable";
import { SchemaField, TableData } from "./type";
import { useEffect, useState } from "react";
import EntryFormModal from "./components/DynamicTable/EntryFormModal";
import { fetchData, searchEntries } from "./api/data";
import { handleCreate, handleDelete, handleUpdate } from "./helpers/handlers";

const schema: SchemaField[] = [
  {
    name: "title",
    component: "text",
    label: "Title",
    required: true,
  },
  {
    name: "type",
    component: "select",
    label: "Type",
    options: [
      { label: "Generic", value: "generic" },
      { label: "Holiday", value: "holiday" },
    ],
  },
  {
    name: ["startDate", "endDate"],
    component: "range_picker",
    label: "Date",
  },
  {
    name: "description",
    component: "textarea",
    label: "Description",
  },
];

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
    console.log(formData);
    if (editEntry) {
      handleUpdate(editEntry.id, formData, tableData, setTableData);
      setIsModalOpen(false);
    }
  };

  const handleDeleteRow = (entryId: string) => {
    handleDelete(entryId, tableData, setTableData);
  };

  const handleCreateRow = () => {
    setEditEntry(null);
    setIsModalOpen(true);
  };

  const handleCreateRequest = (formData: TableData) => {
    handleCreate(formData, tableData, setTableData);
    setIsModalOpen(false);
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
    </>
  );
}

export default App;
