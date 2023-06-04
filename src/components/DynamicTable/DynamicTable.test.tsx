import { render, screen, act } from "@testing-library/react";
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
    await screen.findByText("Start of the year");

    // Assert that a table row contains the expected data
    const tableRows = screen.getAllByRole("row");
    const rowWithTestData = tableRows.find((row) =>
      row.textContent?.includes("Start of the year")
    );

    expect(rowWithTestData).toBeInTheDocument();
    expect(rowWithTestData).toHaveTextContent("Start of the year");
    expect(rowWithTestData).toHaveTextContent("generic");
    expect(rowWithTestData).toHaveTextContent("2022-01-01");
    expect(rowWithTestData).toHaveTextContent("2022-12-01");
    expect(rowWithTestData).toHaveTextContent(
      "This is an event about the start of this year"
    );
  });
});
