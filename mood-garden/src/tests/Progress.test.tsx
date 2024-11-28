import { render, screen } from "@testing-library/react";
import { Progress } from "../pages/Progress";
import { AuthProvider } from "../context/AuthContext";

test("renders Progress page", () => {
  render(
    <AuthProvider>
      <Progress />
    </AuthProvider>
  );

  const calendarTitle = screen.getByText(/Your Sleep Journey/i);
  expect(calendarTitle).toBeInTheDocument();

  const nextPlant = screen.getByText(
    /Keep tracking your sleep to grow your next plant!/i
  );
  expect(nextPlant).toBeInTheDocument();
});
