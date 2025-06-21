import { Menu } from "lucide-react";
import { navigationItems } from "../constants/navigationItems";
import { NavigationItemComponent } from "./NavigationItem";

interface DesktopSidebarProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const DesktopSidebar = ({ activeTab, onTabChange }: DesktopSidebarProps) => {
    return (
        <div className="hidden lg:flex lg:w-64 xl:w-72 border-r border-gray-200 flex-col">
            {/* Logo */}
            <div className="p-7">
                <h1 className="text-3xl font-bold text-gray-800 bg-clip-text">
                    ANANKA
                </h1>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-2">
                {navigationItems.map((item) => (
                    <NavigationItemComponent
                        key={item.id}
                        item={item}
                        isActive={activeTab === item.id}
                        onClick={onTabChange}
                    />
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-6">
                <button className="w-full flex items-center text-gray-500 hover:text-gray-600 transition-colors">
                    <Menu className="w-6 h-6" />
                    <span className="ml-4">Others</span>
                </button>
            </div>
        </div>
    );
};