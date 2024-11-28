import { render, screen } from "@testing-library/react";
import { Home } from "../pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "../context/AuthContext";

test("renders Homepage", async () => {
  render(
    <GoogleOAuthProvider clientId="130824139626-b0tcvptr6rr7ka9l8c0ipmvfik3fc2e5.apps.googleusercontent.com">
      <AuthProvider>
        <Home />
      </AuthProvider>
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
  // const googleLoginButton = screen.getByText(/Sign in with Google/i);
  // expect(googleLoginButton).toBeInTheDocument();
});
