import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "antd";
import { getColumns, getRows } from "./tableUtils";
import EntryForm from "../Form/EntryForm";
import { fetchData } from "../../api/data";
import { SchemaField, TableData } from "../../type";
import {
  handleCreate,
  handleCancel,
  handleDelete,
} from "../../helpers/handlers";

interface Props {
  schema: SchemaField[];
}

const DynamicTable: React.FC<Props> = ({ schema }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    // Fetch data from the server
    fetchData().then((data: TableData[]) => {
      setTableData(data);
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  console.log("getRows(tableData)");
  console.log(getRows(tableData));

  const columns = getColumns(schema);
  const rows = getRows(tableData);

  const handleDeleteRow = (id: string) => {
    handleDelete(id, tableData, setTableData);
  };

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
              <Button onClick={() => handleDeleteRow(record.id)}>Delete</Button>
            ),
          },
        ]}
      />

      <Button type="primary" onClick={showModal}>
        Add Entry
      </Button>

      <Modal
        title="Create Entry"
        open={isModalOpen}
        onCancel={() => handleCancel(setIsModalOpen)}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={() => handleCancel(setIsModalOpen)}>
            Cancel
          </Button>,
          <Button
            key="create"
            type="primary"
            onClick={() =>
              handleCreate(form, tableData, setTableData, setIsModalOpen)
            }
          >
            Create
          </Button>,
        ]}
      >
        <EntryForm form={form} schema={schema} />
      </Modal>
    </>
  );
};

export default DynamicTable;
