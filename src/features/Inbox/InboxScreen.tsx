import { useLocation } from "react-router";

function InboxScreen() {
  const location = useLocation();
  const from = location.state?.from;

  console.log("Redirected from:", from?.pathname);
  return <div>Inbox</div>;
}

export default InboxScreen;
