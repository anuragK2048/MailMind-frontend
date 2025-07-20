import { useLocation } from "react-router";

function LandingPage() {
  const location = useLocation();
  console.log(location.state?.from?.pathname);
  function handleLogin() {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  }
  return (
    <div>
      <button onClick={handleLogin}>Login/Signup</button>
    </div>
  );
}

export default LandingPage;
