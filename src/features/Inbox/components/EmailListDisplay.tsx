import { getEmailsByLabel } from "@/api/emailsApi";
import { wrapString } from "@/lib/strings";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

function EmailListDisplay() {
  const { labelId } = useParams();
  const { data: emails, isLoading } = useQuery({
    queryKey: ["inbox", `${labelId}`],
    queryFn: () => getEmailsByLabel(labelId),
  });
  if (isLoading) return <Loader />;
  return (
    <div className="@container flex h-full w-full flex-col gap-2 overflow-x-hidden overflow-y-auto bg-slate-300 text-lg">
      {emails?.map((val) => (
        <EmailListItem key={val.id} email={val} />
      ))}
    </div>
  );
}

export default EmailListDisplay;

function EmailListItem({ email }) {
  return (
    <div className="relative flex bg-slate-200 py-2 hover:border-l-2 hover:border-accent-foreground hover:bg-accent hover:pl-1">
      <div className="flex w-11/12 flex-col @5xl:flex-row">
        <div className="truncate pr-4 text-xl font-semibold whitespace-nowrap @5xl:w-2/12">
          {email.from_name}
        </div>
        <div className="flex w-10/12 gap-2 text-xl @5xl:pl-2">
          <div className="truncate font-medium whitespace-nowrap @4xl:overflow-visible @4xl:text-clip">
            {email.subject}
          </div>
          <div className="ml-4 hidden truncate pr-8 font-light whitespace-nowrap @5xl:block">
            {wrapString(email.snippet, 110 - email.subject.length)}
          </div>
        </div>
      </div>
      <div className="absolute right-0 mr-4">
        {email.received_date.slice(0, -15)}
      </div>
      <div className="w-3/12 text-left text-xl whitespace-nowrap @5xl:w-1/12"></div>
    </div>
  );
}
