import { SchemaField, TableData } from "../../type";

export const getColumns = (schema: SchemaField[]) => {
  return schema
    .map((field) => {
      if (Array.isArray(field.name)) {
        return [
          {
            title: field.name[0],
            dataIndex: field.name[0],
            key: field.name[0],
          },
          {
            title: field.name[1],
            dataIndex: field.name[1],
            key: field.name[1],
          },
        ];
      } else {
        return {
          title: field.label,
          dataIndex: field.name,
          key: field.name,
        };
      }
    })
    .flat();
};

export const getRows = (data: TableData[]) => {
  return data.map((row, index) => ({
    ...row,
    key: String(index + 1),
  }));
};
