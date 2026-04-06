import { AppProvider } from "@/context/AppContext";
import { Sidebar } from "@/sections/Sidebar";
import { MainContent } from "@/sections/MainContent";

const App = () => {
  return (
    <AppProvider>
      <div className="text-slate-900 dark:text-slate-100 text-base font-normal bg-gray-50 dark:bg-slate-950 min-h-screen font-inter transition-colors duration-300">
        <div className="flex flex-col min-h-screen md:flex-row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
};
export default App;
