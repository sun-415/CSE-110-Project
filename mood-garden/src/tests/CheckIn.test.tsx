import { render, screen } from "@testing-library/react";
import { CheckIn } from "../pages/CheckIn";

test("renders Check-In page", () => {
  render(<CheckIn/>);
  const formTitle = screen.getByText(/Daily Sleep Check-In/i);
  expect(formTitle).toBeInTheDocument();

  const firstQuestion = screen.getByText(/How many hours did you sleep last night/i);
  expect(firstQuestion).toBeInTheDocument();

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();

});