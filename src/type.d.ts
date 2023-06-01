export interface SchemaField {
  name: string | string[];
  component: string;
  label: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export interface TableData {
  id: string;
  [key: string]: string | undefined;
}

export interface FieldOption {
  label: string;
  value: string;
}