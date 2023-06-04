import { SchemaField } from "../type";

const schema: SchemaField[] = [
  {
    name: "title",
    component: "text",
    label: "Title",
    required: true,
  },
  {
    name: "type",
    component: "select",
    label: "Type",
    options: [
      { label: "Generic", value: "generic" },
      { label: "Holiday", value: "holiday" },
    ],
  },
  {
    name: ["startDate", "endDate"],
    component: "range_picker",
    label: "Date",
  },
  {
    name: "description",
    component: "textarea",
    label: "Description",
  },
];

export default schema;
