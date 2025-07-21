import { NavigationItem } from "../types";
import { NavigationBadge } from "./NavigationBadge";

interface NavigationItemProps {
    item: NavigationItem;
    isActive: boolean;
    onClick: (id: string) => void;
}

export const NavigationItemComponent = ({ item, isActive, onClick }: NavigationItemProps) => {
    const Icon = item.icon;

    return (
        <button
            onClick={() => onClick(item.id)}
            className={`w-full flex items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors relative`}
        >
            <Icon className={`w-6 h-6 ${isActive ? 'text-[#A8B5A0]' : 'text-gray-500'}`} />
            <span className={`ml-4 ${isActive ? 'text-[#A8B5A0] font-medium' : 'text-gray-500'}`}>
                {item.label}
            </span>
            {isActive && (
                <div className="absolute right-0 top-3 bottom-3 w-1 bg-[#A8B5A0] rounded-l-full"></div>
            )}
            {item.badge && <NavigationBadge count={item.badge} />}
        </button>
    );
};