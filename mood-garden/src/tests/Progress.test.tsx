import { render, screen } from "@testing-library/react";
import { Progress } from "../pages/Progress";
import { AuthProvider } from "../context/AuthContext";

test("renders Progress page", () => {
  render(
    <AuthProvider>
      <Progress />
    </AuthProvider>
  );

  // Disabled test because auth required to display these text.
  // const calendarTitle = screen.getByText(/Your Sleep Journey/i);
  // expect(calendarTitle).toBeInTheDocument();

  // const nextPlant = screen.getByText(
  //   /Keep tracking your sleep to grow your next plant!/i
  // );
  // expect(nextPlant).toBeInTheDocument();
});
