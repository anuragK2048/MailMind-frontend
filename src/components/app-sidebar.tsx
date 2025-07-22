import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { useStore } from "@/store/UserStore";
import { stat } from "fs";
// import { useStore } from "@/store/UserStore";
import { Link } from "react-router";
import { useShallow } from "zustand/react/shallow";

const sidebarItems = [
  { name: "Inbox", path: "/inbox" },
  { name: "Starred", path: "/starred" },
  { name: "Drafts", path: "/drafts" },
  { name: "Sent", path: "/sent" },
  { name: "Done", path: "/done" },
  { name: "Spam", path: "/spam" },
  { name: "Scheduled", path: "/scheduled" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="text-xl text-sidebar-foreground">Anurag Kodle</div>
            <ModeToggle />
          </div>
          <div className="flex flex-col items-start gap-1">
            {sidebarItems.map((item, i) => (
              <Link
                to={item.path}
                key={i}
                className="w-full cursor-pointer py-2 pl-2 text-left text-lg text-sidebar-foreground hover:border-l-2 hover:border-sidebar-accent-foreground hover:bg-sidebar-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/api/v1/auth/google/link")
            }
          >
            Add Account +
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
