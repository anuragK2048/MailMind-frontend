import { getLabelOptions } from "@/api/labelsApi";
import LabelSettingsPopup from "@/features/Inbox/components/LabelSettingsPopup";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";

function LabelOptions() {
  const { emailId } = useParams();
  const {
    data: labels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userLabels"],
    queryFn: getLabelOptions,
  });
  if (isLoading) return <Loader />;
  if (error) return <div>{error.message}</div>;
  // if (labels) return <Navigate to={`${labels[0]?.id}`} />;
  return (
    <div className="flex items-center gap-10 bg-slate-500 text-2xl">
      {labels?.map((val) => (
        <Link
          to={`/inbox/${val.id}${emailId ? `/${emailId}` : ""}`}
          key={val.id}
        >
          {val.name}
        </Link>
      ))}

      <LabelSettingsPopup labels={labels} />
    </div>
  );
}

export default LabelOptions;
