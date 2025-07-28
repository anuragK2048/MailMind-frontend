import { TextShimmer } from "@/components/motion-primitives/text-shimmer";

export function LoadingText({ displayText }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <TextShimmer className="font-mono text-sm" duration={2}>
        {displayText}
      </TextShimmer>
    </div>
  );
}
