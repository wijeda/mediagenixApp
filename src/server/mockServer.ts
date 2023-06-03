import { rest, setupWorker } from "msw";
import { SchemaField, TableData } from "../type";
import { v4 as uuidv4 } from "uuid";

let data: TableData[] = [
  {
    id: "1",
    title: "Start of the year",
    type: "generic",
    startDate: "2022-01-01",
    endDate: "2022-12-01",
    description: "This is an event about the start of this year",
  },
  {
    id: "2",
    title: "Mediagenix holiday",
    type: "holiday",
    startDate: "2022-04-04",
    endDate: "2022-04-05",
    description: "Celebrating Mediagenix",
  },
];

let schema: SchemaField[] = [
  {
    name: "title",
    label: "Title",
    component: "text",
    required: true,
  },
  {
    name: "type",
    component: "select",
    label: "Type",
    options: [
      {
        label: "Generic",
        value: "generic",
      },
      {
        label: "Holiday",
        value: "holiday",
      },
    ],
  },
  {
    name: ["startDate", "endDate"],
    component: "range_picker",
    label: "Date",
  },
  {
    name: "description",
    label: "Description",
    component: "textarea",
  },
];

// Create a new mock server instance
const server = setupWorker();

// Set up request handlers
server.use(
  // Get data
  rest.get("/api/data", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),

  // Create data
  rest.post<TableData>("/api/data", (req, res, ctx) => {
    const newData: TableData = req.body;
    const newEntry = { ...newData, id: uuidv4() };
    data.push(newEntry);
    return res(ctx.status(201), ctx.json(newEntry));
  }),

  // Update data
  rest.put<TableData>("/api/data/:id", (req, res, ctx) => {
    const { id } = req.params;
    const newData: TableData = req.body;
    const index = data.findIndex((entry) => entry.id === id);
    if (index !== -1) {
      data[index] = { ...newData, id };
      return res(ctx.status(200), ctx.json(data[index]));
    } else {
      return res(ctx.status(404));
    }
  }),

  // Delete data
  rest.delete("/api/data/:id", (req, res, ctx) => {
    const { id } = req.params;
    const index = data.findIndex((entry) => entry.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      return res(ctx.status(200));
    } else {
      return res(ctx.status(404));
    }
  }),

  // Get schema
  rest.get("/api/schema", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(schema));
  }),

  // Update schema
  rest.put<SchemaField[]>("/api/schema", (req, res, ctx) => {
    const newSchema: SchemaField[] = req.body;
    schema = newSchema;
    return res(ctx.status(200), ctx.json(schema));
  }),

  // Search data
  rest.get("/api/search", (req, res, ctx) => {
    const query = req.url.searchParams.get("query");
    const searchResults = data.filter(
      (row) =>
        row.title?.toLowerCase().includes(query?.toLowerCase()) ||
        row.description?.toLowerCase().includes(query?.toLowerCase())
    );
    return res(ctx.status(200), ctx.json(searchResults));
  })

);

export { server };
export { schema };
