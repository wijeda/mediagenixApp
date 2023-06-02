import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "antd";
import { getColumns, getRows } from "./tableUtils";
import EntryForm from "../Form/EntryForm";
import {
  fetchData,
  createEntry,
  deleteEntry,
  updateEntry,
} from "../../api/data";
import { SchemaField, TableData } from "../../type";

interface Props {
  schema: SchemaField[];
}

const DynamicTable: React.FC<Props> = ({ schema }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<TableData | null>(null); // New state variable to store the editEntry
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    fetchData().then((data: TableData[]) => {
      setTableData(data);
    });
  }, []);

  const showModal = (entryId: string | null) => {
    setEditEntry(tableData.find((entry) => entry.id === entryId) || null); // Set the editEntry based on the entryId
    setIsModalOpen(true);
  };

  const handleEditRow = (entryId: string) => {
    showModal(entryId);
  };

  const handleDeleteRow = (entryId: string) => {
    deleteEntry(entryId)
      .then(() => {
        const updatedTableData = tableData.filter(
          (entry) => entry.id !== entryId
        );
        setTableData(updatedTableData);
      })
      .catch((error: Error) => {
        console.error("Error deleting entry:", error);
      });
  };

  const handleUpdateRow = () => {
    form.validateFields().then((values: any) => {
      console.log("Updating entry:", values);

      const { startDate, endDate, ...restFormValues } = values;

      const updatedEntry: TableData = {
        id: editEntry?.id!,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
        endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
        ...restFormValues,
      };

      updateEntry(updatedEntry)
        .then((response: TableData) => {
          const updatedTableData = tableData.map((entry) =>
            entry.id === response.id ? response : entry
          );
          setTableData(updatedTableData);
          setIsModalOpen(false);
          form.resetFields();
        })
        .catch((error: Error) => {
          console.error("Error updating entry:", error);
        });
    });
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values: any) => {
        console.log("Creating entry:", values);

        const { startDate, endDate, ...restFormValues } = values;

        const newEntry: TableData = {
          startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
          endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
          ...restFormValues,
        };

        createEntry(newEntry)
          .then((response: TableData) => {
            setTableData([...tableData, response]);
            setIsModalOpen(false);
            form.resetFields();
          })
          .catch((error: Error) => {
            console.error("Error creating entry:", error);
          });
      })
      .catch((error: Error) => {
        console.error("Validation error:", error);
      });
  };

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
                <Button onClick={() => handleEditRow(record.id)}>Edit</Button>
                <Button onClick={() => handleDeleteRow(record.id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
      />

      <Button type="primary" onClick={() => showModal(null)}>
        Add Entry
      </Button>

      <Modal
        title={editEntry ? "Edit Entry" : "Create Entry"}
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={editEntry ? handleUpdateRow : handleCreate}
          >
            {editEntry ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <EntryForm form={form} schema={schema} editEntry={editEntry} />
      </Modal>
    </>
  );
};

export default DynamicTable;
