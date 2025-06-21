import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
    isMobileMenuOpen: boolean;
    onToggleMenu: () => void;
}

export const MobileHeader = ({ isMobileMenuOpen, onToggleMenu }: MobileHeaderProps) => {
    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ananka
            </h1>
            <button
                onClick={onToggleMenu}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
    );
};