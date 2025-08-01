import { updateEmailLabels } from "@/api/emailApi.action";
import { getEmailByEmailId } from "@/api/emailsApi";
import EmailBox from "@/features/email/EmailBox";
import { useEmailMutations } from "@/hooks/useEmailMutations";
import useSystemView from "@/hooks/useSystemView";
import { useUIStore } from "@/store/UserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  Clock,
  LoaderIcon,
  Sparkles,
  Star,
  Trash,
} from "lucide-react";
import { memo, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useShallow } from "zustand/react/shallow";

function EmailDisplay({ emailId }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
  const { toggleStarred, archiveEmail, toggleUnread, isPending } =
    useEmailMutations(listQueryKey);

  const removeLastSegment = () => {
    const segments = pathname.split("/").filter(Boolean); // remove empty strings
    if (segments.length > 1) {
      segments.pop(); // remove the last param (like emailId)
      navigate("/" + segments.join("/"));
    }
  };

  useEffect(() => {
    if (email && email.is_unread) {
      toggleUnread(email);
    }
  }, [toggleUnread, email]);

  if (isLoading)
    return (
      <div className="h-full w-full items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-[8%] w-full flex-col items-center justify-between px-4 md:flex md:h-[6%] md:flex-row md:py-2">
        <div className="flex">
          <button className="text-accent-foreground/80 hover:text-accent-foreground">
            <ArrowLeft onClick={removeLastSegment} />
          </button>
          <div className="ml-4 overflow-auto">
            <h2 className="truncate pr-4 text-xl font-normal">
              {email?.subject}
            </h2>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center md:mt-0">
          <button
            onClick={() => archiveEmail(email)}
            className="cursor-pointer rounded-full p-2 text-accent-foreground/70 hover:text-accent-foreground"
            title="Read"
          >
            <Check size={20} />
          </button>
          <button
            className="cursor-pointer rounded-full p-2 text-accent-foreground/70 hover:text-accent-foreground"
            title="Star"
          >
            <Star
              size={20}
              fill={email?.is_starred ? "#F2CC21" : "none"}
              onClick={() => toggleStarred(email)}
              strokeWidth={email?.is_starred ? 0 : 2}
            />
          </button>
          <button
            // onClick={() => onTrash(email?.id)}
            className="cursor-pointer rounded-full p-2 text-accent-foreground/70 opacity-50 hover:text-accent-foreground"
            title="Schedule"
          >
            <Clock size={20} />
          </button>
          <button
            // onClick={() => onTrash(email?.id)}
            className="cursor-pointer rounded-full p-2 text-accent-foreground/70 opacity-50 hover:text-accent-foreground"
            title="Delete"
          >
            <Trash size={20} />
          </button>
          <button
            className="cursor-pointer rounded-full p-2 text-accent-foreground/70 opacity-50 hover:text-accent-foreground"
            title="AI"
          >
            <Sparkles size={20} />
          </button>
        </div>
      </div>
      <div className="mt-1 flex h-[92%] max-w-full flex-1 md:h-[94%]">
        {email && <EmailBox emailDetails={email} />}
      </div>
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
