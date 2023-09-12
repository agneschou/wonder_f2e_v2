import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { ReactNode } from 'react';
import {logoutService} from "@/domain/logout/service";

export function DropdownLogout({ children }: { children: ReactNode }) {
	const handleLogout = () => {
		logoutService.logout();
	};
	return <DropdownMenuItem onClick={handleLogout}>{children}</DropdownMenuItem>;
}
