import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { SchemaField, TableData } from "../../type";
import moment from "moment";

interface Props {
  form: any;
  schema: SchemaField[];
  editEntry: TableData | null;
}

const EntryForm: React.FC<Props> = ({ form, schema, editEntry }) => {
  const getFieldInitialValue = (fieldName: string) => {
    if (editEntry) {
      return editEntry[fieldName];
    }

    return undefined;
  };

  return (
    <Form form={form} layout="vertical">
      {schema.map((field) => {
        if (field.component === "range_picker") {
          const initialValue = getFieldInitialValue(field.name[0]);
          console.log(initialValue);
          return (
            <React.Fragment key={field.name[0]}>
              <Form.Item
                label={`${field.label} (Start Date)`}
                name={`${field.name[0]}`}
                initialValue={initialValue && moment(initialValue)}
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
                initialValue={
                  getFieldInitialValue(field.name[1]) &&
                  moment(getFieldInitialValue(field.name[1]))
                }
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

        const initialValue = getFieldInitialValue(field.name);

        console.log(form.getFieldsValue());
        console.log(form.getFieldsValue());
        return (
          <Form.Item
            key={field.name}
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
    </Form>
  );
};

export default EntryForm;
