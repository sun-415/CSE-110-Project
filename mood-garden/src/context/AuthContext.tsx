import { User } from "../types/User";
import { createContext, useContext, useEffect, useState } from "react";
import decodeJwt from "../utils/decodeJwt";
import { createUser, getUserById } from "../api/users";

interface AuthContextType {
  user: User | null;
  login: (credential: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updatePoints: (point: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing token and validate expiration
    const storedToken = localStorage.getItem("authToken");
    const tokenExpiry = localStorage.getItem("authTokenExpiry");

    if (
      storedToken &&
      tokenExpiry &&
      new Date().getTime() < Number(tokenExpiry)
    ) {
      const { payload } = decodeJwt(storedToken);
      getUserById(payload.sub).then((response) => {
        if (response.success) {
          setUser(response.data);
        } else {
          console.log("redirect to create user page");
        }
      });
    } else {
      // Clear expired token
      localStorage.removeItem("authToken");
      localStorage.removeItem("authTokenExpiry");
    }
  }, []);

  const login = (credential: string) => {
    const { payload } = decodeJwt(credential);
    getUserById(payload.sub).then((response) => {
      if (response.success) {
        setUser(response.data);
      } else {
        createUser({
          _id: payload.sub,
          email: payload.email,
          name: payload.name,
          targetSleepTime: 8,
          score: 0,
        }).then((response) => {
          if (response.success) {
            setUser(response.data);
          } else {
            console.log(response.error);
          }
        });
      }
    });

    // Store token and set expiration (2 days in milliseconds)
    localStorage.setItem("authToken", credential);
    localStorage.setItem(
      "authTokenExpiry",
      (new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toString()
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiry");
  };

  const updatePoints = (point: number) => {
    // TODO: Update points in state and backend
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updatePoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
