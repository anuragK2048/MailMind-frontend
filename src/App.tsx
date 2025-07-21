import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "@/features/Landing/LandingPage";
import AppLayout from "@/layouts/AppLayout";
import { ThemeProvider } from "@/components/theme-provider";
import InboxScreen from "@/features/Inbox/InboxScreen";
import ProtectedRoute from "@/components/ProtectedRoute";
import DoneScreen from "@/features/done/DoneScreen";
import InboxRedirect from "@/features/Inbox/InboxRedirect";

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
              <Route path="/inbox/:labelId" element={<InboxScreen />} />
              <Route path="done" element={<DoneScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
