import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Link from 'next/link';
import useTranslation from "next-translate/useTranslation";
import {routes} from "@/utils/routes";
import {DropdownLogout} from "@/components/base/layout/DropdownLogout";

export function UserNav() {
	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src='https://avatars.githubusercontent.com/u/124599?v=4' alt='@shadcn' />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>Agent</p>
						<p className='text-xs leading-none text-muted-foreground'></p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={routes.changePassword}>
						<DropdownMenuItem>{t('changePassword.title')}</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownLogout>{t('ui.logout')}</DropdownLogout>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
