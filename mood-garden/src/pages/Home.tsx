import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

export const Home = () => {
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState<string | null>(null);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle login success
    const handleLoginSuccess = async (response: any) => {
        console.log("Google Login Success:", response);

        if (response?.access_token) {
            try {

                const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                    },
                });

                const userInfo = await userInfoResponse.json();
                console.log("User Info:", userInfo);


                if (userInfo?.name) {
                    setName(userInfo.name);
                } else {
                    console.error("No name found in user info:", userInfo);
                }

            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        } else {
            console.error("No access token found in response:", response);
        }
    };


    const handleLoginError = () => {
        console.error("Google Login Failed");
    };


    const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: handleLoginError,
        scope: "profile",
    });

    return (
        <div className="backgroundWrapper">
            <div className="homeContainer">
                <section className="mainSection">
                    <div className="clockDisplay">
                        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                    </div>
                    <div className="welcomeBox">
                        <h1>Plant the Seeds of Better Sleep</h1>
                        <p>Track your sleep, tend to your garden, and watch your healthy habits bloom.</p>

                        {!name ? (
                            <button
                                onClick={() => login()}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "10px 20px",
                                    backgroundColor: "black",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    margin: "0 auto",
                                }}
                            >
                                <span>Sign in with Google</span>
                            </button>
                        ) : (
                            <h1 className="welcomeMessage">
                                Welcome, {name}!</h1>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;


/*import "../styles/home.css";
import { useState, useEffect } from "react";

export const Home = () => {
  const [time, setTime] = useState(new Date());

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="backgroundWrapper"></div>
      <div className="homeContainer">
        <section className="mainSection">
          <div className="clockDisplay">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <div className="welcomeBox">
            <h1>Plant the Seeds of Better Sleep</h1>
            <p>
              Track your sleep, tend to your garden, and watch your healthy
              habits bloom.
            </p>
            <div style={{ height: "40px" }}>
              {!isAuthenticated ? <Login /> : <div>Welcome, {user?.name}!</div>}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
