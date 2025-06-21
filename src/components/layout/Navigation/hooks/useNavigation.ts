import { useState } from "react"

export const useNavigation = (defaultTab: string = 'home') => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return {
        activeTab,
        isMobileMenuOpen,
        handleTabChange,
        toggleMobileMenu,
        setIsMobileMenuOpen
    };
};