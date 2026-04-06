import React, { createContext, useContext, useState, useCallback } from "react";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  merchant: string;
  category: string;
  amount: string;
  isIncome: boolean;
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "Mar 28, 2026", description: "Prescription refill", merchant: "CVS Pharmacy", category: "Healthcare", amount: "-$62.00", isIncome: false },
  { id: "2", date: "Mar 22, 2026", description: "Movie night", merchant: "AMC Theaters", category: "Entertainment", amount: "-$35.00", isIncome: false },
  { id: "3", date: "Mar 20, 2026", description: "Electronics", merchant: "Best Buy", category: "Shopping", amount: "-$145.00", isIncome: false },
  { id: "4", date: "Mar 18, 2026", description: "Friends brunch", merchant: "Morning Cafe", category: "Food", amount: "-$75.00", isIncome: false },
  { id: "5", date: "Mar 15, 2026", description: "Freelance project", merchant: "Client XYZ", category: "Investment", amount: "+$500.00", isIncome: true },
  { id: "6", date: "Mar 12, 2026", description: "Car service", merchant: "AutoZone", category: "Transport", amount: "-$250.00", isIncome: false },
  { id: "7", date: "Mar 10, 2026", description: "Weekly groceries", merchant: "Safeway", category: "Food", amount: "-$88.00", isIncome: false },
  { id: "8", date: "Mar 8, 2026", description: "Home office supplies", merchant: "Staples", category: "Other", amount: "-$150.00", isIncome: false },
  { id: "9", date: "Mar 5, 2026", description: "Rent payment", merchant: "Landlord Properties", category: "Housing", amount: "-$1,200.00", isIncome: false },
  { id: "10", date: "Mar 3, 2026", description: "Monthly salary", merchant: "Employer Corp", category: "Income", amount: "+$4,500.00", isIncome: true },
  { id: "11", date: "Feb 25, 2026", description: "Streaming subscriptions", merchant: "Netflix", category: "Entertainment", amount: "-$28.00", isIncome: false },
  { id: "12", date: "Feb 22, 2026", description: "Grocery run", merchant: "Whole Foods", category: "Food", amount: "-$95.00", isIncome: false },
  { id: "13", date: "Feb 20, 2026", description: "Book purchases", merchant: "Amazon", category: "Shopping", amount: "-$60.00", isIncome: false },
  { id: "14", date: "Feb 18, 2026", description: "Dental cleaning", merchant: "Bright Smile Dental", category: "Healthcare", amount: "-$320.00", isIncome: false },
  { id: "15", date: "Feb 16, 2026", description: "Stock sale profit", merchant: "Robinhood", category: "Investment", amount: "+$400.00", isIncome: true },
  { id: "16", date: "Feb 14, 2026", description: "Valentines Day dinner", merchant: "Bistro 21", category: "Entertainment", amount: "-$180.00", isIncome: false },
  { id: "17", date: "Feb 12, 2026", description: "Parking fees", merchant: "City Parking", category: "Transport", amount: "-$55.00", isIncome: false },
  { id: "18", date: "Feb 10, 2026", description: "Weekly groceries", merchant: "Trader Joes", category: "Food", amount: "-$92.30", isIncome: false },
  { id: "19", date: "Feb 7, 2026", description: "Rent payment", merchant: "Landlord Properties", category: "Housing", amount: "-$1,200.00", isIncome: false },
  { id: "20", date: "Feb 5, 2026", description: "Monthly salary", merchant: "Employer Corp", category: "Income", amount: "+$4,500.00", isIncome: true },
  { id: "21", date: "Jan 28, 2026", description: "Monthly transit pass", merchant: "City Transit", category: "Transport", amount: "-$30.00", isIncome: false },
  { id: "22", date: "Jan 25, 2026", description: "Dinner out", merchant: "The Italian Place", category: "Food", amount: "-$78.00", isIncome: false },
  { id: "23", date: "Jan 22, 2026", description: "Winter clothing", merchant: "Gap", category: "Shopping", amount: "-$210.00", isIncome: false },
  { id: "24", date: "Jan 20, 2026", description: "Concert tickets", merchant: "Ticketmaster", category: "Entertainment", amount: "-$65.00", isIncome: false },
  { id: "25", date: "Jan 18, 2026", description: "Doctor visit co-pay", merchant: "City Medical Center", category: "Healthcare", amount: "-$120.00", isIncome: false },
  { id: "26", date: "Jan 15, 2026", description: "Dividend payment", merchant: "Vanguard", category: "Investment", amount: "+$200.00", isIncome: true },
  { id: "27", date: "Jan 12, 2026", description: "Gas station fill-up", merchant: "Shell", category: "Transport", amount: "-$45.00", isIncome: false },
  { id: "28", date: "Jan 10, 2026", description: "Weekly groceries", merchant: "Whole Foods", category: "Food", amount: "-$85.50", isIncome: false },
  { id: "29", date: "Jan 8, 2026", description: "Rent payment", merchant: "Landlord Properties", category: "Housing", amount: "-$1,200.00", isIncome: false },
  { id: "30", date: "Jan 5, 2026", description: "Monthly salary", merchant: "Employer Corp", category: "Income", amount: "+$4,500.00", isIncome: true },
];

export const CATEGORIES = [
  "All Types", "Food", "Shopping", "Entertainment", "Healthcare",
  "Housing", "Transport", "Income", "Investment", "Other",
];



type AppContextType = {
  isDark: boolean;
  toggleDark: () => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  role: "Admin" | "Viewer";
  setRole: (r: "Admin" | "Viewer") => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<"Admin" | "Viewer">("Admin");

  const toggleDark = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return next;
    });
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions(prev => [{ ...t, id: Date.now().toString() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((t: Transaction) => {
    setTransactions(prev => prev.map(x => x.id === t.id ? t : x));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(x => x.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      isDark, toggleDark,
      transactions, addTransaction, updateTransaction, deleteTransaction,
      searchQuery, setSearchQuery,
      selectedCategory, setSelectedCategory,
      isMobileMenuOpen, setMobileMenuOpen,
      role, setRole,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
