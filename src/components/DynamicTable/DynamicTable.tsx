import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "antd";
import { getColumns, getRows } from "./tableUtils";
import EntryForm from "../Form/EntryForm";
import { fetchData } from "../../api/data";
import { SchemaField, TableData } from "../../type";
import {
  handleCreate,
  handleUpdate,
  handleDelete,
} from "../../helpers/handlers";

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
  const columns = getColumns(schema);
  const rows = getRows(tableData);

  return (
    <>
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
    </>
  );
};

export default DynamicTable;
