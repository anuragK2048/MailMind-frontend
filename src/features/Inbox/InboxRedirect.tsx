import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getLabelOptions } from "@/api/labelsApi";
import { useEffect } from "react";
import { useUIStore } from "@/store/UserStore";
import { useShallow } from "zustand/react/shallow";
import { LoadingText } from "@/components/motion-primitives/LoadingText";
import { toast } from "sonner";

function InboxRedirect() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: labels, error: labelError } = useQuery({
    queryKey: ["userLabels"],
    queryFn: getLabelOptions,
  });

  console.log("rerendered");

  if (labelError) {
    toast("Unable to retrieve user emails");
  }

  useEffect(() => {
    if (labels && !params.labelId) {
      // const defaultLabel = labels.find((val) => val.name === "Education"); // TODO sequence labels in DB
      // const defaultLabel = labels?.at(0); // TODO sequence labels in DB
      navigate(`/inbox/all`, { replace: true });
    }
  }, [labels, navigate]);

  return <LoadingText displayText={"Redirecting..."} />;
}

export default InboxRedirect;
