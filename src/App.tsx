import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DynamicTable from "./components/DynamicTable/DynamicTable";

function App() {
  let dataArray = [
    {
      id: "1",
      title: "Start of the year",
      type: "generic",
      startDate: "2022-01-01", //format in YYYY-MM-DD
      endDate: "2022-12-01", //format in YYYY-MM-DD
      description: "This is an event about the start of this year",
    },
    {
      id: "2",
      title: "Mediagenix holiday",
      type: "holiday",
      startDate: "2022-04-04", //format in YYYY-MM-DD
      endDate: "2022-04-05", //format in YYYY-MM-DD
      description: "Celebrating Mediagenix",
    },
  ];

  let schemaArray = [
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

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DynamicTable data={dataArray} schema={schemaArray} />
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
