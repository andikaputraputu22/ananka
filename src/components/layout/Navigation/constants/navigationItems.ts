import { Compass, Home, PlusSquare, Search, User } from "lucide-react";
import { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'post', icon: PlusSquare, label: 'Post' },
    { id: 'profile', icon: User, label: 'Profile' }
];