import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import { getColumns, getRows } from "./tableUtils";
import { SchemaField, TableData } from "../../type";
import "./DynamicTable.css"; // Import the CSS file for custom styles

interface Props {
  schema: SchemaField[];
  tableData: TableData[];
  onEntryUpdate: (id: string) => void;
  onEntryDelete: (id: string) => void;
  onEntryCreate: () => void;
}

const DynamicTable: React.FC<Props> = ({
  schema,
  tableData,
  onEntryUpdate,
  onEntryDelete,
  onEntryCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = searchQuery
    ? tableData.filter(
        (row) =>
          row.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tableData;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const columns = getColumns(schema);
  const rows = getRows(searchQuery ? searchResults : tableData);

  return (
    <div>
      <div className="search-input-container">
        <Input.Search
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Table
        dataSource={rows}
        columns={[
          ...columns,
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: TableData) => (
              <>
                <Button onClick={() => onEntryUpdate(record.id)}>Edit</Button>
                <Button onClick={() => onEntryDelete(record.id)}>Delete</Button>
              </>
            ),
          },
        ]}
      />
      <Button type="primary" onClick={() => onEntryCreate()}>
        Add Entry
      </Button>
    </div>
  );
};

export default DynamicTable;
