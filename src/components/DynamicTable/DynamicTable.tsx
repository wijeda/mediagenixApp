import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { SchemaField, TableData } from "../../type";
import { getColumns, getRows } from "./tableUtils";

interface Props {
  data: TableData[];
  schema: SchemaField[];
}

const DynamicTable: React.FC<Props> = ({ data, schema }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    // Fetch data from the mock server
    fetch("/api/data")
      .then((res) => res.json())
      .then((data: TableData[]) => {
        setTableData(data);
      });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Creating entry:", values);

        const { startDate, endDate, ...restFormValues } = values;

        const newEntry: TableData = {
          id: Math.random().toString(),
          startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
          endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
          ...restFormValues,
        };

        console.log("startDate");
        console.log(startDate);

        console.log("newEntry", newEntry);
        fetch("/api/data", {
          method: "POST",
          body: JSON.stringify(newEntry), // Convert the new entry to a JSON string
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        })
          .then((res) => res.json())
          .then((response: TableData) => {
            setTableData([...tableData, response]);
            setIsModalOpen(false);
            form.resetFields();
          });
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  // Add this useEffect hook to log the form values after they have been updated
  useEffect(() => {
    console.log("form values", form.getFieldsValue());
  }, [form]);

  const columns = getColumns(schema);
  const rows = getRows(tableData);

  console.log("schema", schema);
  console.log("rows", rows);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Entry
      </Button>

      <Table dataSource={rows} columns={columns} />

      <Modal
        title="Create Entry"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCreate}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          {schema.map((field) => {
            if (field.component === "range_picker") {
              return (
                <React.Fragment key={field.name}>
                  <Form.Item
                    label={`${field.label} (Start Date)`}
                    name={`${field.name[0]}`}
                    rules={[
                      {
                        required: field.required,
                        message: `Please enter ${field.label} (Start Date)`,
                      },
                    ]}
                  >
                    <DatePicker format="DD/MM/YYYY" />
                  </Form.Item>
                  <Form.Item
                    label={`${field.label} (End Date)`}
                    name={`${field.name[1]}`}
                    rules={[
                      {
                        required: field.required,
                        message: `Please enter ${field.label} (End Date)`,
                      },
                    ]}
                  >
                    <DatePicker format="DD/MM/YYYY" />
                  </Form.Item>
                </React.Fragment>
              );
            }

            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[
                  {
                    required: field.required,
                    message: `Please ${
                      field.component === "range_picker" ? "select" : "enter"
                    } ${field.label}`,
                  },
                ]}
              >
                {field.component === "text" ? (
                  <Input />
                ) : field.component === "textarea" ? (
                  <Input.TextArea />
                ) : field.component === "select" ? (
                  <Select options={field.options} />
                ) : null}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </>
  );
};

export default DynamicTable;
