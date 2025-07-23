import { updateEmailLabels } from "@/api/emailApi.action";
import { getEmailByEmailId } from "@/api/emailsApi";
import EmailBox from "@/features/email/EmailBox";
import { useEmailMutations } from "@/hooks/useEmailMutations";
import useSystemView from "@/hooks/useSystemView";
import { useUIStore } from "@/store/UserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderIcon, Star } from "lucide-react";
import { memo } from "react";
import { useParams } from "react-router";
import { useShallow } from "zustand/react/shallow";

function EmailDisplay({ emailId }) {
  // const { emailId } = useParams();
  const { systemView } = useSystemView();
  const { labelId } = useParams();
  const selectedEmailAccountIds = useUIStore(
    useShallow((store) => store.selectedEmailAccountIds)
  );
  const { data: email, isLoading } = useQuery({
    queryKey: ["email", `${emailId}`],
    queryFn: () => getEmailByEmailId(emailId),
  });

  const listQueryKey = [
    "emails",
    { systemView, labelId, accounts: selectedEmailAccountIds },
  ];
  const { toggleStarred } = useEmailMutations(listQueryKey);

  return (
    <div className="h-full w-full overflow-hidden bg-amber-200">
      <div className="flex w-full items-center justify-center bg-blue-200 p-2">
        <Star
          fill={email?.is_starred ? "yellow" : "none"}
          onClick={() => toggleStarred(email)}
        />
      </div>
      {isLoading && <LoaderIcon />}
      {email && <EmailBox emailDetails={email} />}
    </div>
  );
}

const EmailDisplayMemo = memo(
  EmailDisplay,
  (prev, next) => prev.emailId === next.emailId
);

const EmailDisplayWrapper = ({ emailId }) => {
  // const { emailId } = useParams();
  return <EmailDisplayMemo emailId={emailId} />;
};

export default EmailDisplayWrapper;
