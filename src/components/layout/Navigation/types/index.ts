import { LucideIcon } from "lucide-react";

export interface NavigationItem {
    id: string;
    icon: LucideIcon;
    label: string;
    badge?: number;
}

export interface NavigationProps {
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
}