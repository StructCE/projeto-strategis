import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Cria o tipo para o contexto
interface CompanyContextType {
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
}

// Cria o contexto com valor inicial
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Provider para o contexto
export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Hook para usar o contexto em outras partes do código
export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany deve ser usado dentro de um CompanyProvider");
  }
  return context;
};
