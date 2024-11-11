import { render, screen } from "@testing-library/react";
import { Progress } from "../pages/Progress/Progress";

test("renders Progress page", () => {
  render(<Progress />);

  const calendarTitle = screen.getByText(/Your Sleep Journey/i);
  expect(calendarTitle).toBeInTheDocument();

  const nextPlant = screen.getByText(
    /Keep tracking your sleep to grow your next plant!/i
  );
  expect(nextPlant).toBeInTheDocument();
});
