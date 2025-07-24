import AlertDialogue from "@/components/common/AlertDialogue";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sidebar } from "@/components/ui/sidebar";
import { useStore, useUIStore } from "@/store/UserStore";
import { stat } from "fs";
import { useEffect, useState } from "react";
// import { useStore } from "@/store/UserStore";
import { Link, useLocation, useNavigate } from "react-router";
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

async function handleLogout() {
  const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  console.log(result);
}

async function handleDeleteAccount() {
  const response = await fetch("http://localhost:3000/api/v1/users/me", {
    method: "DELETE",
    credentials: "include",
  });
  if (response.status == 200) {
    window.location.href = "/landing";
  }
}

export function AppSidebar() {
  const userData = useUIStore((store) => store.userData);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState("/");
  // console.log(pathname);

  useEffect(() => {
    const path = "/" + pathname.split("/")[1];
    setCurrentTab(path);
  }, [pathname]);

  async function handleUnlinkAccount(accountId) {
    const response = await fetch(
      `http://localhost:3000/api/v1/gmail-accounts/${accountId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.status == 200) {
      navigate("/inbox");
    }
  }

  return (
    <Sidebar>
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="text-xl text-sidebar-foreground">
              {userData?.full_name}
            </div>
            <ModeToggle />
          </div>
          <div className="flex flex-col items-start gap-1">
            {sidebarItems.map((item, i) => {
              // console.log(item.path);
              // console.log(currentTab);
              return (
                <Link
                  to={item.path}
                  key={i}
                  className={`${currentTab === item.path ? "border-l-2 border-sidebar-accent-foreground bg-sidebar-accent" : ""} w-full cursor-pointer py-2 pl-2 text-left text-lg text-sidebar-foreground hover:border-l-2 hover:border-sidebar-accent-foreground hover:bg-sidebar-accent`}
                >
                  {item.name}
                </Link>
              );
            })}
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

          <AlertDialogue
            onContinue={handleLogout}
            description={
              "This would revoke your session and you have to go through OAuth again to login"
            }
          >
            <Button>Logout</Button>
          </AlertDialogue>
          <AccountSettingsDialogue
            disablePrimary={true}
            title={"Unlink Account"}
            cb={handleUnlinkAccount}
            userData={userData}
          />
          <AlertDialogue
            onContinue={handleDeleteAccount}
            description={
              "This action cannot be undone. This will permanently delete your account and remove your data from the server."
            }
          >
            <Button>Delete User</Button>
          </AlertDialogue>
        </div>
      </div>
    </Sidebar>
  );
}

function AccountSettingsDialogue({ disablePrimary, cb, userData, title }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4 pt-5">
          {userData?.gmail_accounts.map((account) => (
            <AlertDialogue
              onContinue={() => cb(account.id)}
              description={
                "This action cannot be undone. This will permanently delete your selected account data from the server."
              }
            >
              <Button
                key={account.id}
                variant={"outline"}
                className={`text-md`}
                disabled={disablePrimary && account.type === "primary"}
                onClick={() => cb(account.id)}
              >
                {account.gmail_address}
              </Button>
            </AlertDialogue>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
