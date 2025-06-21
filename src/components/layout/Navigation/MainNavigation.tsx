import { DesktopSidebar } from "./components/DesktopSidebar";
import { MobileHeader } from "./components/MobileHeader";
import { useNavigation } from "./hooks/useNavigation";

interface MainNavigationProps {
    children?: React.ReactNode;
}

export const MainNavigation = ({ children }: MainNavigationProps) => {
    const { activeTab, isMobileMenuOpen, handleTabChange, toggleMobileMenu } = useNavigation();

    return (
        <div className="flex h-screen text-white">
            <MobileHeader 
                isMobileMenuOpen={isMobileMenuOpen}
                onToggleMenu={toggleMobileMenu}
            />
      
            <DesktopSidebar 
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {/* Main Content */}
            <div className="flex-1 pt-16 lg:pt-0">
                {(
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Area Konten Utama
                            </h2>
                            <p className="text-gray-500">
                                Active menu: <span className="text-blue-800 font-medium capitalize">{activeTab}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};