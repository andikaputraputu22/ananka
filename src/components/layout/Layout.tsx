import { MainNavigation } from "./Navigation";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <MainNavigation>
            {children}
        </MainNavigation>
    );
};