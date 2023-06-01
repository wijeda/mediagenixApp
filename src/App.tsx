import reactLogo from "./assets/react.svg";
import viteLogo from "../public/vite.svg";
import "./App.css";
import DynamicTable from "./components/DynamicTable/DynamicTable";
import { server } from "./server/mockServer";
import { SchemaField } from "./type";

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

function App() {
  server.start();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DynamicTable schema={schema} />
    </>
  );
}

export default App;
