import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


test('renders learn react link', () => {
  render(<BrowserRouter>   <GoogleOAuthProvider clientId="130824139626-b0tcvptr6rr7ka9l8c0ipmvfik3fc2e5.apps.googleusercontent.com"> <App /> </GoogleOAuthProvider> </BrowserRouter>);
  const homepageMessage = screen.getByText(/Plant the Seeds of Better Sleep/i);
  expect(homepageMessage).toBeInTheDocument();
});
