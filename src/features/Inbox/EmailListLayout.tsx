import EmailListDisplay from "@/features/Inbox/components/EmailListDisplay";
import LabelOptions from "@/features/Inbox/components/LabelOptions";

function EmailListLayout() {
  return (
    <div className="flex h-full w-full flex-col">
      <LabelOptions />
      <EmailListDisplay />
    </div>
  );
}

export default EmailListLayout;
