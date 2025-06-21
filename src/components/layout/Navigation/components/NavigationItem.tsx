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
            className={`w-full flex items-center px-6 py-6 text-left hover:bg-gray-300 transition-colors relative`}
        >
            <Icon className={`w-6 h-6 ${isActive ? 'text-gray-800' : 'text-gray-500'}`} />
            <span className={`ml-4 ${isActive ? 'text-gray-800 font-bold' : 'text-gray-500'}`}>
                {item.label}
            </span>
            {item.badge && <NavigationBadge count={item.badge} />}
        </button>
    );
};