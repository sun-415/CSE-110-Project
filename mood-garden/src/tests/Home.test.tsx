import { render, screen } from "@testing-library/react";
import { Home } from "../pages/Home";

test("renders Homepage", () => {
  render(<Home />);
  const homepageMessage = screen.getByText(/Plant the Seeds of Better Sleep/i);
  expect(homepageMessage).toBeInTheDocument();

  const anotherMessage = screen.getByText(
    /Track your sleep, tend to your garden, and watch your healthy habits bloom./i
  );
  expect(anotherMessage).toBeInTheDocument();
});
