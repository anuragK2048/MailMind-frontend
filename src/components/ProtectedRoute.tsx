import { getCurrentUser } from "@/api/userApi";
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
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  let component = null;
  if (isLoading) component = <Loader />;
  else if (!userData || error) component = <div>Unable to fetch your data</div>;

  return (
    <>
      {component ? (
        <div className="flex items-center justify-center">{component}</div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}

export default ProtectedRoute;
