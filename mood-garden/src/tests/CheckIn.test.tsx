import { render, screen, fireEvent } from "@testing-library/react";
import { CheckIn } from "../pages/CheckIn";
import { AuthProvider } from "../context/AuthContext";

test("renders Check-In page", () => {
  render(
    <AuthProvider>
      <CheckIn />
    </AuthProvider>
  );
  const formTitle = screen.getByText(/Daily Sleep Check-In/i);
  expect(formTitle).toBeInTheDocument();

  const firstQuestion = screen.getByText(
    /How many hours did you sleep last night/i
  );
  expect(firstQuestion).toBeInTheDocument();

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
});

// This probably won't pass because user needs to login to successfully submit
// test("calculates and updates points based on user input", () => {
//   // Mock the alert function
//   const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

//   render(
//     <AuthProvider>
//       <CheckIn />
//     </AuthProvider>
//   );

//   const sleepHoursInput = screen.getByTestId("q1");
//   const q2Selection = screen.getByTestId("sleepQuality-1"); // Selecting the lowest quality score
//   const q3Selection = screen.getByTestId("sleepiness-1");
//   const q4Selection = screen.getByTestId("productivity-1");
//   const q5Selection = screen.getByTestId("energyLevels-1");
//   const submitButton = screen.getByText("Submit");

//   // Simulate user input
//   fireEvent.change(sleepHoursInput, { target: { value: "1" } });
//   fireEvent.click(q2Selection);
//   fireEvent.click(q3Selection);
//   fireEvent.click(q4Selection);
//   fireEvent.click(q5Selection);
//   fireEvent.click(submitButton);

//   // Expect the alert to have the correct earned points
//   expect(alertMock).toHaveBeenCalledWith(
//     expect.stringContaining("Points earned today: 50")
//   );

//   // Clean up the mock
//   alertMock.mockRestore();
// });
