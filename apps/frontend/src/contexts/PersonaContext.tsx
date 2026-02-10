'use client';

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { CustomerProfile } from '@/types/customer';
import type { CommunityProfile } from '@/types/community';

export interface SurveyAnswers {
  companyName: string;
  industry: string;
  product: string;
  why: string;
  other: string;
}

interface PersonaContextType {
  persona: string | null;
  setPersona: (persona: string) => void;
  customers: CustomerProfile[] | null;
  setCustomers: (customers: CustomerProfile[]) => void;
  communities: CommunityProfile[] | null;
  setCommunities: (communities: CommunityProfile[]) => void;
  surveyAnswers: SurveyAnswers;
  setSurveyAnswer: (key: keyof SurveyAnswers, value: string) => void;
  clearAll: () => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [persona, setPersona] = useState<string | null>(null);
  const [customers, setCustomers] = useState<CustomerProfile[] | null>(null);
  const [communities, setCommunities] = useState<CommunityProfile[] | null>(
    null,
  );
  const [surveyAnswers, setSurveyAnswersState] = useState<SurveyAnswers>({
    companyName: '',
    industry: '',
    product: '',
    why: '',
    other: '',
  });

  const setSurveyAnswer = (key: keyof SurveyAnswers, value: string): void => {
    setSurveyAnswersState((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = (): void => {
    setPersona(null);
    setCustomers(null);
    setCommunities(null);
    setSurveyAnswersState({
      companyName: '',
      industry: '',
      product: '',
      why: '',
      other: '',
    });
  };

  return (
    <PersonaContext.Provider
      value={{
        persona,
        setPersona,
        customers,
        setCustomers,
        communities,
        setCommunities,
        surveyAnswers,
        setSurveyAnswer,
        clearAll,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextType {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
