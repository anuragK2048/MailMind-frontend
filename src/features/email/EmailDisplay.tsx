import { getEmailByEmailId } from "@/api/emailsApi";
import EmailBox from "@/features/email/EmailBox";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { memo } from "react";
import { useParams } from "react-router";

function EmailDisplay() {
  const { emailId } = useParams();
  const { data: email, isLoading } = useQuery({
    queryKey: ["email", `${emailId}`],
    queryFn: () => getEmailByEmailId(emailId),
  });
  return (
    <div className="h-full w-8/12 overflow-hidden bg-amber-200">
      {isLoading && <LoaderIcon />}
      {email && <EmailBox emailDetails={email} />}
    </div>
  );
}

const EmailDisplayMemo = memo(
  EmailDisplay,
  (prev, next) => prev.emailId === next.emailId
);

const EmailDisplayWrapper = () => {
  const { emailId } = useParams();
  return <EmailDisplayMemo emailId={emailId} />;
};

export default EmailDisplayWrapper;
