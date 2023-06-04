import React from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import { SchemaField, TableData } from "../../type";
import moment from "moment";

interface Props {
  form: any;
  schema: SchemaField[];
  editEntry: TableData | null | undefined;
  onCancel: () => void;
  onFinish: (formData: TableData) => void;
}

const EntryForm: React.FC<Props> = ({
  form,
  schema,
  editEntry,
  onCancel,
  onFinish,
}) => {
  const getFieldInitialValue = (fieldName: string | string[]) => {
    if (editEntry) {
      if (Array.isArray(fieldName)) {
        return fieldName.map((name) => editEntry[name]);
      }
      return editEntry[fieldName];
    }

    return undefined;
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {schema.map((field) => {
        if (field.component === "range_picker") {
          const initialValue = getFieldInitialValue(field.name[0]);
          return (
            <React.Fragment key={field.name[0]}>
              <Form.Item
                label={`Start Date`}
                name={`${field.name[0]}`}
                initialValue={initialValue && moment(initialValue)}
                rules={[
                  {
                    required: field.required,
                    message: `Please enter Start Date`,
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
                label={`End Date`}
                name={`${field.name[1]}`}
                initialValue={
                  getFieldInitialValue(field.name[1]) &&
                  moment(getFieldInitialValue(field.name[1]))
                }
                rules={[
                  {
                    required: field.required,
                    message: `Please enter End Date`,
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </React.Fragment>
          );
        }

        const initialValue = getFieldInitialValue(field.name);

        return (
          <Form.Item
            key={String(field.name)}
            label={field.label}
            name={field.name}
            initialValue={initialValue}
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
      <Form.Item>
        <Button onClick={onCancel}>cancel</Button>
        <Button htmlType="submit">submit</Button>
      </Form.Item>
    </Form>
  );
};

export default EntryForm;
