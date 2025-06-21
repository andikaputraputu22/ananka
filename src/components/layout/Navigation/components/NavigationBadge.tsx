interface NavigationBadgeProps {
    count: number;
}

export const NavigationBadge = ({ count }: NavigationBadgeProps) => {
    if (!count) return null;
    return (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {count}
        </span>
    );
};