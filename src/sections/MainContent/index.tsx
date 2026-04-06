import { PageHeader } from "@/sections/MainContent/components/PageHeader";
import { TableFilters } from "@/sections/MainContent/components/TableFilters";
import { TransactionTable } from "@/sections/MainContent/components/TransactionTable";

export const MainContent = () => {
  return (
    <main id="transactions" className="flex-1 min-w-0 max-w-6xl mx-auto w-full p-4 md:p-10 animate-fade-in">
      <div>
        <PageHeader />
        <TableFilters />
        <TransactionTable />
      </div>
    </main>
  );
};
