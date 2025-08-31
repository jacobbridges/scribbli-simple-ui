import type {ReactNode} from 'react';
import type {Crumb} from "~/components/crumbly";
import {createContext, useContext, useState} from 'react';

interface SidebarLink {
  title: string;
  url: string;
  active?: boolean;
}
interface SidebarSection {
  title: string;
  items: SidebarLink[];
  highlight?: boolean;
}

interface LayoutContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;

  promotion: ReactNode | null;
  setPromotion: (promotion: ReactNode | null) => void;

  crumbs: Array<Crumb>;
  setCrumbs: (crumbs: Array<Crumb>) => void;

  leftSidebarSections: Array<SidebarSection>;
  setLeftSidebarSections: (sections: Array<SidebarSection>) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

interface DefaultLayoutProps {
  defaultPageTitle?: string | null;
  defaultPromotion?: ReactNode | null;
  defaultCrumbs?: Array<Crumb> | null;
  defaultLeftSidebarSections?: Array<SidebarSection> | null;
}

interface LayoutProviderProps
  extends DefaultLayoutProps {
  children: React.ReactNode;
}

export function LayoutProvider(props: LayoutProviderProps) {
  const { children, defaultPageTitle, defaultPromotion, defaultCrumbs, defaultLeftSidebarSections } = props;

  const [pageTitle, setPageTitle] = useState(defaultPageTitle || "");
  const [promotion, setPromotion] = useState<ReactNode | null>(defaultPromotion || null);
  const [crumbs, setCrumbs] = useState<Array<Crumb>>(defaultCrumbs || []);
  const [leftSidebarSections, setLeftSidebarSections] = useState<Array<SidebarSection>>(defaultLeftSidebarSections || []);

  return (
    <LayoutContext.Provider value={{
      pageTitle, setPageTitle,
      promotion, setPromotion,
      crumbs, setCrumbs,
      leftSidebarSections, setLeftSidebarSections,
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

// Custom hook for setting layout data
export function useLayoutConfig() {
  const { setPageTitle, setPromotion, setCrumbs } = useLayout();

  return {
    setPageTitle,
    setPromotion,
    setCrumbs,
  };
}