import { getCurrentUser } from "@/api/userApi";
import Avatars from "@/components/common/AccountSelection";
import TestComp from "@/components/common/TestComp";
import { useUIStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { Pen, Search, ToggleLeft } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

function OptionsHeader() {
  const { selectedEmailAccountIds, setSelectedEmailAccountIds } = useUIStore(
    useShallow((store) => ({
      selectedEmailAccountIds: store.selectedEmailAccountIds,
      setSelectedEmailAccountIds: store.setSelectedEmailAccountIds,
    }))
  );
  const { data: userEmailsData, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getCurrentUser,
    select: (user) => user.gmail_accounts,
  });

  useEffect(() => {
    async function createLabel() {
      const res = await fetch("http://localhost:3000/api/v1/labels", {
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // method: "POST",
        credentials: "include",
        // body: JSON.stringify({ name: "Test Label 2", color: "#ffffff" }),
      });
    }
    createLabel();
  }, []);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* {userEmailsData?.map((val) => (
        <div
          key={val.id}
          // onClick={() => setSelectedEmailAccountIds([val.id])}
          onDoubleClick={() =>
            setSelectedEmailAccountIds([...selectedEmailAccountIds, val.id])
          }
          className={`${selectedEmailAccountIds.includes(val.id) ? "bg-amber-300" : ""}`}
        >
          {val.gmail_address}
        </div>
      ))} */}
      <Avatars />
      <div className="flex items-center justify-center gap-4">
        <ToggleLeft />
        <Search />
        <Pen />
      </div>
    </div>
  );
}

export default OptionsHeader;
