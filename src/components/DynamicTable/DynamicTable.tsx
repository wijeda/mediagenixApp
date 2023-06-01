import React from "react";
import { Table, TableColumnsType } from "antd";
import { SchemaField, TableData } from "../../type";

interface Props {
  data: TableData[];
  schema: SchemaField[];
}

const DynamicTable: React.FC<Props> = ({ data, schema }) => {
  console.log("schema");
  console.log(schema);
  const columns: TableColumnsType<TableData> = schema.map((field) => ({
    title: field.label,
    dataIndex: Array.isArray(field.name) ? field.name.join(".") : field.name,
    key: Array.isArray(field.name) ? field.name.join(".") : field.name,
  }));

  const rows: TableData[] = data.map((row, index) => ({
    ...row,
    key: String(index + 1), // Adding a "key" property using the index + 1 as the value
  }));

  console.log("columns");
  console.log(columns);
  console.log("rows");
  console.log(rows);

  return <Table dataSource={rows} columns={columns} />;
};

export default DynamicTable;
