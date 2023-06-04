import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";

jest.mock("../../api/data", () => ({
  fetchData: jest.fn(() =>
    Promise.resolve([
      {
        id: "1",
        title: "Start of the year",
        type: "generic",
        startDate: "2022-01-01",
        endDate: "2022-12-01",
        description: "This is an event about the start of this year",
      },
    ])
  ),
  createEntry: jest.fn((entry) =>
    Promise.resolve({
      id: "2",
      ...entry,
    })
  ),
}));

jest.mock("../../schemas/schema", () => ({
  __esModule: true,
  default: [
    {
      name: "title",
      component: "text",
      label: "Title",
      required: true,
    },
    {
      name: "description",
      component: "textarea",
      label: "Description",
    },
  ],
}));

describe("App", () => {
  beforeEach(async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    await act(async () => {
      render(<App />);
    });
  });

  it("should fill in fields in the modal and show toast message on success", async () => {
    const addButton = screen.getByText("Add Entry");
    fireEvent.click(addButton);

    await act(async () => {
      const titleInput = screen.getByLabelText("Title");
      const descriptionInput = screen.getByLabelText("Description");

      fireEvent.change(titleInput, { target: { value: "New Entry" } });

      fireEvent.change(descriptionInput, {
        target: { value: "This is a new entry" },
      });

      const submitButton = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(submitButton);
    });

    await screen.findByText("Entry added successfully!");

    const toastMessage = screen.getByText("Entry added successfully!");
    expect(toastMessage).toBeInTheDocument();

    await screen.findByText("New Entry");

    const tableRows = screen.getAllByRole("row");
    const rowWithNewEntry = tableRows.find((row) =>
      row.textContent?.includes("New Entry")
    );
    expect(rowWithNewEntry).toBeInTheDocument();
    expect(rowWithNewEntry).toHaveTextContent("New Entry");
    expect(rowWithNewEntry).toHaveTextContent("This is a new entry");
  });

  it("should display validation error messages for required fields", async () => {
    const addButton = screen.getByText("Add Entry");
    fireEvent.click(addButton);

    await act(async () => {
      const submitButton = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(submitButton);
    });

    const validationError = screen.getByRole("alert");
    expect(validationError).toHaveTextContent("Please enter Title");
  });
});
