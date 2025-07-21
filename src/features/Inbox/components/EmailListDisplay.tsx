import { getEmailsByLabel, getSelectedEmailsByLabel } from "@/api/emailsApi";
import LabelOptions from "@/features/Inbox/components/LabelOptions";
import { wrapString } from "@/lib/strings";
import { useUIStore } from "@/store/UserStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader, LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useShallow } from "zustand/react/shallow";

function EmailListDisplay() {
  const { labelId } = useParams();
  const selectedEmailAccountIds = useUIStore(
    useShallow((store) => store.selectedEmailAccountIds)
  );

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["inbox", `${labelId}`, JSON.stringify(selectedEmailAccountIds)],
    queryFn: ({ pageParam }) =>
      getSelectedEmailsByLabel(labelId, selectedEmailAccountIds, pageParam, 8),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!labelId,
  });

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      console.log("called");
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("triggered");
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage]
  );

  console.log(data);
  if (error) {
    console.error(error);
  }
  console.log(isFetchingNextPage);
  if (isLoading) return <Loader />;
  console.log("rerendered");
  return (
    <>
      <div className="@container flex h-full w-full flex-col gap-2 overflow-x-hidden bg-slate-300 text-lg">
        {data?.pages?.map((page, index) =>
          page.emails.map((val, i) => {
            const isLastElement =
              index === data.pages.length - 1 && i === page.emails.length - 1;
            return (
              <div ref={isLastElement ? lastElementRef : null} key={val.id}>
                <EmailListItem email={val} />
              </div>
            );
          })
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}
      </div>
    </>
  );
}

export default EmailListDisplay;

function EmailListItem({ email }) {
  const { labelId } = useParams();
  const navigate = useNavigate();
  return (
    <div
      className="group relative flex bg-slate-200 py-2 hover:border-l-2 hover:border-accent-foreground hover:bg-accent hover:pl-1"
      data-id={email.id}
      onClick={() => navigate(`/inbox/${labelId}/${email.id}`)}
    >
      <div className="flex w-11/12 flex-col @5xl:flex-row">
        <div className="truncate pr-12 text-xl font-semibold whitespace-nowrap @5xl:w-2/12 @5xl:pr-4">
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
      <div className="absolute right-0 mr-4 group-hover:mr-5">
        {email.received_date.slice(0, -15)}
      </div>
      <div className="w-3/12 text-left text-xl whitespace-nowrap @5xl:w-1/12"></div>
    </div>
  );
}
