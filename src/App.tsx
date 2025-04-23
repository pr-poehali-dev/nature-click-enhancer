
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClockApp from "./pages/ClockApp";
import YandexApp from "./pages/YandexApp";
import StickmanApp from "./pages/StickmanApp";
import VirusApp from "./pages/VirusApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clock" element={<ClockApp />} />
          <Route path="/yandex" element={<YandexApp />} />
          <Route path="/stickman" element={<StickmanApp />} />
          <Route path="/virus" element={<VirusApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
