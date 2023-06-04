import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../../App";

jest.mock("../../api/data", () => ({
  fetchData: jest.fn(() => Promise.resolve([{ id: 1, title: "Test Entry" }])),
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

  it("should render the table with correct data on load", async () => {
    // Wait for data to be fetched and rendered
    await screen.findByText("Test Entry");

    // Assert that a table row contains the expected data
    const tableRows = screen.getAllByRole("row");
    const rowWithTestEntry = tableRows.find((row) =>
      row.textContent?.includes("Test Entry")
    );
    console.log("rorowWithTestEntryw");
    console.log(rowWithTestEntry);
    expect(rowWithTestEntry).toBeInTheDocument();
  });
});
