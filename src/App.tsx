import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "@/features/Landing/LandingPage";
import AppLayout from "@/layouts/AppLayout";
import { ThemeProvider } from "@/components/theme-provider";
import InboxScreen from "@/features/Inbox/InboxScreen";
import ProtectedRoute from "@/components/ProtectedRoute";
import EmailScreen from "@/features/done/EmailScreen";
import InboxRedirect from "@/features/Inbox/InboxRedirect";
import EmailDisplayWrapper from "@/features/email/EmailDisplay";
import SchedulerComingSoon from "@/components/common/ComingSoonScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/inbox" element={<InboxRedirect />} />
              <Route path="/inbox/:labelId/:emailId?" element={<InboxScreen />}>
                {/* <Route path=":emailId" element={<EmailDisplayWrapper />} /> */}
              </Route>
              <Route
                path="starred/:emailId?"
                element={
                  <EmailScreen systemView={"STARRED"} navigateTo={`/starred`} />
                }
              />
              <Route
                path="drafts/:emailId?"
                element={
                  <EmailScreen systemView={"DRAFT"} navigateTo={`/drafts`} />
                }
              />
              <Route
                path="sent/:emailId?"
                element={
                  <EmailScreen systemView={"SENT"} navigateTo={`/sent`} />
                }
              />
              <Route
                path="done/:emailId?"
                element={
                  <EmailScreen systemView={"UNREAD"} navigateTo={`/done`} />
                }
              />
              <Route
                path="spam/:emailId?"
                element={
                  <EmailScreen systemView={"SPAM"} navigateTo={`/done`} />
                }
              />
              <Route path="/scheduled" element={<SchedulerComingSoon />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
