import { Menu } from "lucide-react";
import { navigationItems } from "../constants/navigationItems";
import { NavigationItemComponent } from "./NavigationItem";
import { WeddingButton } from "./WeddingButton";
import Image from "next/image";

interface DesktopSidebarProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const DesktopSidebar = ({ activeTab, onTabChange }: DesktopSidebarProps) => {
    return (
        <div className="hidden lg:flex lg:w-64 xl:w-60 border-r border-gray-200 flex-col">
            {/* Logo */}
            <div className="p-7 flex items-center gap-0">
                <Image
                    src="/images/logo_ananka.png"
                    alt="Ananka Logo"
                    width={36}
                    height={36}
                    priority
                    className="h-auto"
                    style={{ filter: "brightness(0) invert(72%) sepia(10%) saturate(400%) hue-rotate(80deg) brightness(0.95)" }} />
                <span className="text-xl font-semibold tracking-wide" style={{ color: '#9aaa97', fontFamily: "'Outfit', sans-serif", marginLeft: '-1px' }}>nanka</span>
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
            
            {/* Action Buttons */}
            <div className="p-6 space-y-3">
                <WeddingButton
                    variant="join"
                    onClick={() => alert('Join to Ananka')}>
                    Join
                </WeddingButton>
                <WeddingButton
                    variant="vendor"
                    onClick={() => alert('Become Ananka Vendor')}>
                    Become a Vendor
                </WeddingButton>
            </div>

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