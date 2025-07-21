interface WeddingButtonProps {
    children: React.ReactNode;
    variant?: 'join' | 'vendor';
    onClick?: () => void;
    className?: string;
}

export const WeddingButton = ({
    children,
    variant = 'join',
    onClick,
    className = ''
}: WeddingButtonProps) => {
    const baseClasses = "w-full px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5";
    const variantClasses = {
        join: "bg-[#E8B4B8] hover:bg-[#D4A5A5] active:bg-[#C19396]",
        vendor: "bg-[#A8B5A0] hover:bg-[#9CAF88] active:bg-[#8FA076]"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </button>
    );
};