import { getCurrentUser } from "@/api/userApi";
import { useUIStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

function ProtectedRoute({ children }) {
  const { setSelectedEmailAccountIds, setUserData } = useUIStore(
    useShallow((store) => ({
      setSelectedEmailAccountIds: store.setSelectedEmailAccountIds,
      setUserData: store.setUserData,
    }))
  );
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    // check for is_sync_active
    userData?.gmail_accounts?.forEach((account) => {
      console.log(account);
      if (account.is_sync_active)
        toast(`Syncing emails for ${account.gmail_address}`);
    });
    const allAccount = userData?.gmail_accounts?.map((val) => val.id);
    if (allAccount) {
      setSelectedEmailAccountIds(allAccount);
    }
    setUserData(userData);
  }, [userData, setSelectedEmailAccountIds, setUserData]);

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
