export interface SchemaField {
  name: string | string[];
  component: string;
  label: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

interface TableData {
  id: string;
  date?: {
    startDate?: any;
    endDate?: any;
  } | string;
  [key: string]: any;
}



export interface FieldOption {
  label: string;
  value: string;
}