
import React from "react";

function LoginButton({ loginWithRedirect}) {
  return (
    <div>
      <button onClick={loginWithRedirect}>Log In</button>
    </div>
  )
}

export default LoginButton;