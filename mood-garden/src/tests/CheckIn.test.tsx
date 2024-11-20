import { render, screen, fireEvent} from "@testing-library/react";
import { CheckIn } from "../pages/CheckIn";
import { PointsProvider } from "../context/PointsContext";

test("renders Check-In page", () => {
  render(<CheckIn />);
  const formTitle = screen.getByText(/Daily Sleep Check-In/i);
  expect(formTitle).toBeInTheDocument();

  const firstQuestion = screen.getByText(
    /How many hours did you sleep last night/i
  );
  expect(firstQuestion).toBeInTheDocument();

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
});

test("calculates and updates points based on user input", () => {
  // Mock the alert function
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(
    <PointsProvider>
      <CheckIn />
    </PointsProvider>
  );

  const sleepHoursInput = screen.getByTestId("q1");
  const q2Selection = screen.getByTestId("sleepQuality-1"); // Selecting the lowest quality score
  const q3Selection = screen.getByTestId("sleepiness-1"); 
  const q4Selection = screen.getByTestId("productivity-1"); 
  const q5Selection = screen.getByTestId("energyLevels-1"); 
  const submitButton = screen.getByText("Submit"); 

  // Simulate user input
  fireEvent.change(sleepHoursInput, { target: { value: "1" } });
  fireEvent.click(q2Selection);
  fireEvent.click(q3Selection);
  fireEvent.click(q4Selection);
  fireEvent.click(q5Selection);
  fireEvent.click(submitButton);

  // Expect the alert to have the correct earned points
  expect(alertMock).toHaveBeenCalledWith(
    expect.stringContaining("Points earned today: 50")
  );

  // Clean up the mock
  alertMock.mockRestore();

});
