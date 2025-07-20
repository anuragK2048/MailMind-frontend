import { getLabelOptions } from "@/api/labelsApi";
import LabelSettingsPopup from "@/features/Inbox/components/LabelSettingsPopup";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

function LabelOptions() {
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
  return (
    <div className="flex gap-10">
      {labels?.map((val) => (
        <div key={val.id}>{val.name}</div>
      ))}
      <div>
        <LabelSettingsPopup labels={labels} />
      </div>
    </div>
  );
}

export default LabelOptions;
