import {
  BarChart3,
  Bell,
  Box,
  Calendar,
  DollarSign,
  Home,
  Search,
  Settings,
  Sun,
  UserCircle,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { FinancialNavMenu } from "./financial-nav-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { DashboardNavMenu } from "./dashboard-nav-menu";
import { StockNavMenu } from "./stock-nav-menu";
import { CalendarNavMenu } from "./calendar-nav-menu";
import { SettingsNavMenu } from "./settings-nav-menu";
import { PatientNavMenu } from "./patient-nav-menu";
import { HomeNavMenu } from "./home-nav-menu";

export function Header() {
  const location = useLocation();
  let pageTitle;
  let pageIcon;
  let pageKey;

  if (location.pathname.startsWith("/home")) {
    pageTitle = "Página inicial";
    pageIcon = <Home size={18} />;
    pageKey = <HomeNavMenu />;
  } else if (location.pathname.startsWith("/patient")) {
    pageTitle = "Pacientes";
    pageIcon = <Users size={18} />;
    pageKey = <PatientNavMenu />;
  } else if (location.pathname.startsWith("/settings")) {
    pageTitle = "Configurações";
    pageIcon = <Settings size={18} />;
    pageKey = <SettingsNavMenu />;
  } else if (location.pathname.startsWith("/calendar")) {
    pageTitle = "Agenda";
    pageIcon = <Calendar size={18} />;
    pageKey = <CalendarNavMenu />;
  } else if (location.pathname.startsWith("/stock")) {
    pageTitle = "Estoque";
    pageIcon = <Box size={18} />;
    pageKey = <StockNavMenu />;
  } else if (location.pathname.startsWith("/financial")) {
    pageTitle = "Financeiro";
    pageIcon = <DollarSign size={18} />;
    pageKey = <FinancialNavMenu />;
  } else if (location.pathname.startsWith("/dashboard")) {
    pageTitle = "Dashboard";
    pageIcon = <BarChart3 size={18} />;
    pageKey = <DashboardNavMenu />;
  }

  return (
    <div className="left-0 top-0 flex h-14 w-full items-center justify-between bg-brown3 px-12">
      {/* <div className="flex items-center text-white bg-[#574436] px-4 justify-center shadow-lg shadow-[#574436] h-full relative">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {pageIcon}
                <span className="text-sm ml-2 -mr-2">{pageTitle}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>{pageKey}</NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}

      <div />

      <div className="flex gap-12">
        <div className="flex items-center gap-8 whitespace-nowrap text-sm text-white">
          <Search />

          <Sun />
          <Bell />
          <div className="flex items-center gap-2 whitespace-nowrap text-sm text-white">
            <UserCircle />
            <span>Guilherme Michels</span>
          </div>
        </div>
      </div>
    </div>
  );
}
