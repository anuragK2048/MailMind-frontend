import EmailListDisplay from "@/features/Inbox/components/EmailListDisplay";
import LabelOptions from "@/features/Inbox/components/LabelOptions";

function InboxScreen() {
  return (
    <div className="flex h-full flex-col gap-2">
      <LabelOptions />
      <div className="flex h-full w-[400px] overflow-hidden">
        <EmailListDisplay />
      </div>

      {/* Email Look */}
      <div className="h-full flex-1 bg-amber-200"></div>
    </div>
  );
}

export default InboxScreen;
