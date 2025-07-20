import { getCurrentUser } from "@/api/userApi";
import { useUserStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function OptionsHeader() {
  const { data: userEmailsData, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getCurrentUser,
    select: (user) => user.gmail_accounts,
  });
  console.log(userEmailsData);

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
      const response = await res.json();
      console.log(response);
    }
    createLabel();
  }, []);

  return (
    <div className="ml-10 flex gap-4">
      {userEmailsData?.map((val) => (
        <div key={val.id}>{val.gmail_address}</div>
      ))}
    </div>
  );
}

export default OptionsHeader;
