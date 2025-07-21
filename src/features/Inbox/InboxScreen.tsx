import EmailListDisplay from "@/features/Inbox/components/EmailListDisplay";
import LabelOptions from "@/features/Inbox/components/LabelOptions";
import { Outlet } from "react-router";

function InboxScreen() {
  return (
    <div className="flex h-full flex-col gap-2">
      <LabelOptions />
      <div className="flex flex-1 overflow-auto">
        <div className="flex h-full flex-1 overflow-hidden">
          <EmailListDisplay />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default InboxScreen;
