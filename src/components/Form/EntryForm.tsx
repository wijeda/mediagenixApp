import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { SchemaField } from "../../type";

interface Props {
  form: any;
  schema: SchemaField[];
}

const EntryForm: React.FC<Props> = ({ form, schema }) => {
  return (
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
                <DatePicker format="YYYY-MM-DD" />
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
                <DatePicker format="YYYY-MM-DD" />
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
  );
};

export default EntryForm;
