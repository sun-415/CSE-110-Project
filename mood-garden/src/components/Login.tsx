import { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import decodeJwt from "../utils/decodeJwt";
import "../styles/login.css";




export default function Login() {

  const [name, setName] = useState<string | null>(null);

  function handleError() {
    console.log("Login failed");
  }


  function handleSuccess(credentialResponse: CredentialResponse) {
    console.log("credentialResponse", credentialResponse);

    if (credentialResponse.credential) {
      const { payload } = decodeJwt(credentialResponse.credential);
      console.log("payload credential", payload);
      setName(payload.name);
    }
  }

  /*return (
    <div>
      <div className="google-login-container">
        <GoogleLogin
          onError={handleError}
          onSuccess={handleSuccess}
        />
      </div>
      {name && <p>Welcome: {name}</p>}
    </div>
  );
};
*/

  return <div className="my-custom-container">

    {name == null &&

      <GoogleLogin
        onError={handleError}
        onSuccess={handleSuccess} />}

    {name && <h1> Welcome: {name}! </h1>}



  </div>
}




// import decodeJwt from "../utils/decodeJwt";
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState<string | null>(null);
//   async function handleSuccess(credentialResponse: CredentialResponse) {
//     console.log("credentialResponse", credentialResponse);
//     if (credentialResponse.credential) {
//       const { payload } = decodeJwt(credentialResponse.credential);
//       console.log("payload credential", payload);
//       const response = await fetch("/api/google", {
//         method: "POST",
//         body: JSON.stringify({
//           token: credentialResponse.credential,
//         }),
//       });
//       const json = await response.json();
//       console.log("verify", json);
//       setEmail(json.email);
//     }
//   }
//   function handleError() {
//     console.log("Login failed");
//   }

//   return (
//     <div>
//       {!email && (
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           useOneTap
//         />
//       )}
//       {email && <p>hello: {email}</p>}
//     </div>
//   );
// }


