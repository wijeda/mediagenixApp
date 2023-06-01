import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "antd";
import { getColumns, getRows } from "./tableUtils";
import EntryForm from "../Form/EntryForm";
import { fetchData } from "../../api/data";
import { SchemaField, TableData } from "../../type";
import { handleCreate, handleCancel } from "../../helpers/handlers";

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

  const columns = getColumns(schema);
  const rows = getRows(tableData);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Entry
      </Button>

      <Table dataSource={rows} columns={columns} />

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
