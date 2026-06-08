import { Menu, X } from "lucide-react";
import Image from "next/image";

interface MobileHeaderProps {
    isMobileMenuOpen: boolean;
    onToggleMenu: () => void;
}

export const MobileHeader = ({ isMobileMenuOpen, onToggleMenu }: MobileHeaderProps) => {
    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-0">
                <Image
                    src="/images/logo_ananka.png"
                    alt="Ananka Logo"
                    width={28}
                    height={28}
                    priority
                    className="h-auto"
                    style={{ filter: "brightness(0) invert(55%) sepia(60%) saturate(500%) hue-rotate(240deg) brightness(1.1)" }}
                />
                <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif", marginLeft: '-1px' }}>
                    nanka
                </h1>
            </div>
            <button
                onClick={onToggleMenu}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
    );
};