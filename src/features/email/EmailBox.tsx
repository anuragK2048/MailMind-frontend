import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Reply,
  ReplyAll,
  Forward,
  MoreHorizontal,
  Star,
  Trash,
  Archive,
  ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
// import DOMPurify from "dompurify"; // Import for security

// Helper to format dates, kept from your original code
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// The component now receives the full email object from your DB
function EmailBox({
  emailDetails,
  onStar,
  onArchive,
  onTrash,
}: {
  emailDetails: any;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [iframeHeight, setIframeHeight] = useState(400);
  const iframeRef = useRef(null);
  const [expanded, setExpanded] = useState(true);

  const removeLastSegment = () => {
    const segments = pathname.split("/").filter(Boolean); // remove empty strings
    if (segments.length > 1) {
      segments.pop(); // remove the last param (like emailId)
      navigate("/" + segments.join("/"));
    }
  };

  const updateIframeContent = (content) => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const sanitizedContent = content;

    // Create blob URL for iframe content
    const blob = new Blob([sanitizedContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    iframe.src = url;

    // Clean up blob URL after iframe loads
    iframe.onload = () => {
      URL.revokeObjectURL(url);

      // Auto-resize iframe based on content
      try {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        // Use body scrollHeight instead of documentElement, and add small delay for accurate measurement
        setTimeout(() => {
          const bodyHeight = iframeDocument.body.scrollHeight;
          const documentHeight = iframeDocument.documentElement.scrollHeight;
          // Use the smaller of the two heights to avoid double sizing
          const actualHeight = Math.min(bodyHeight, documentHeight);
          setIframeHeight(actualHeight + 10); // Reduced padding
        }, 100);
      } catch (e) {
        console.log("Cannot access iframe content for resize:", e);
      }
    };
  };

  // Update iframe when content changes
  useEffect(() => {
    updateIframeContent(emailDetails.body_html);
  }, [emailDetails, expanded]);

  if (!emailDetails) {
    // Can show a placeholder or skeleton loader here
    return <div>Select an email to view its details.</div>;
  }

  // --- Data from your database schema ---
  const {
    id,
    subject,
    from_name,
    from_address,
    to_addresses,
    sent_date,
    body_html,
    is_starred,
  } = emailDetails;

  // Create sanitized markup from the HTML content stored in your DB
  //   const createSanitizedMarkup = () => {
  //     // **SECURITY**: Sanitize HTML from email to prevent XSS attacks
  //     const sanitizedHtml = DOMPurify.sanitize(body_html || "");
  //     return { __html: sanitizedHtml };
  //   };

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="flex h-full flex-grow flex-col rounded-lg bg-white shadow-md">
      {/* Email Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="mb-2 flex items-center justify-between">
          <ArrowLeft onClick={removeLastSegment} />
          <h2 className="truncate pr-4 text-lg font-normal text-gray-800">
            {subject}
          </h2>
          <div className="flex items-center space-x-1 text-gray-500">
            {/* These buttons would call functions passed as props */}
            <button
              onClick={() => onArchive(id)}
              className="rounded-full p-2 hover:bg-gray-100"
              title="Archive"
            >
              <Archive size={18} />
            </button>
            <button
              onClick={() => onTrash(id)}
              className="rounded-full p-2 hover:bg-gray-100"
              title="Delete"
            >
              <Trash size={18} />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100" title="More">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Email Body & Details */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center">
            {/* Avatar */}
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
              {from_name ? from_name.charAt(0).toUpperCase() : "?"}
            </div>
            {/* Sender/Recipient Info */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-semibold text-gray-800">
                  {from_name || "Unknown Sender"}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {from_address}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                to {to_addresses?.join(", ") || "undisclosed-recipients"}
                <button
                  onClick={toggleExpand}
                  className="ml-2 inline-block align-middle text-gray-500"
                >
                  {expanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center pl-2 text-xs whitespace-nowrap text-gray-600">
            {formatDate(sent_date)}
            <button
              onClick={() => onStar(id, !is_starred)}
              className="ml-3 text-gray-400 hover:text-yellow-500"
              title={is_starred ? "Unstar" : "Star"}
            >
              <Star
                size={16}
                className={is_starred ? "fill-current text-yellow-400" : ""}
              />
            </button>
          </div>
        </div>

        {/* Collapsible Email Content */}
        {expanded && (
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-white p-8 pb-0">
            <iframe
              ref={iframeRef}
              className="w-full border-none"
              style={{ height: `${iframeHeight + 10}px` }}
              sandbox="allow-same-origin"
              title="Email Content"
            />
          </div>
        )}
      </div>

      {/* Action Buttons Footer */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <button className="flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:shadow-sm">
            <Reply size={16} className="mr-2" />
            Reply
          </button>
          <button className="flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:shadow-sm">
            <ReplyAll size={16} className="mr-2" />
            Reply all
          </button>
          <button className="flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:shadow-sm">
            <Forward size={16} className="mr-2" />
            Forward
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailBox;
