import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "../pages/Home";
import { GoogleOAuthProvider } from '@react-oauth/google';

test("renders Homepage", async () => {
  render(
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Home />
    </GoogleOAuthProvider>
  );

  // Check if the static text is rendered initially
  const homepageMessage = screen.getByText(/Plant the Seeds of Better Sleep/i);
  expect(homepageMessage).toBeInTheDocument();

  const anotherMessage = screen.getByText(
    /Track your sleep, tend to your garden, and watch your healthy habits bloom./i
  );
  expect(anotherMessage).toBeInTheDocument();

  // Wait for the Google login button to be rendered (it might appear asynchronously)
  const googleLoginButton = screen.getByText(/Sign in with Google/i);
  expect(googleLoginButton).toBeInTheDocument();

  // If the login happens successfully and the name is set, you can test for the welcome message
  await waitFor(() => {
    const welcomeMessage = screen.getByText(/Welcome, /i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
