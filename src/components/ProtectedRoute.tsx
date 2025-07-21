import { getCurrentUser } from "@/api/userApi";
import { useUIStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

function ProtectedRoute({ children }) {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getCurrentUser,
  });

  const primary = userData?.gmail_accounts.find(
    (val) => val.type === "secondary"
  );

  if (primary) {
    useUIStore.getState().setSelectedEmailAccountIds([primary.id]);
  }

  let component = null;
  if (isLoading) component = <Loader />;
  else if (!userData || error) component = <div>Unable to fetch your data</div>;

  return (
    <>
      {component ? (
        <div className="flex items-center justify-center">{component}</div>
      ) : (
        <div className="h-full">{children}</div>
      )}
    </>
  );
}

export default ProtectedRoute;
