import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { Button } from './Button';
import { X } from 'lucide-react';

interface IModalGround extends HTMLAttributes<HTMLDivElement> {
	close?: () => void;
}

export function ModalGround({ className, children, close, ...props }: IModalGround) {
	return (
		<div
			className={cn(
				'animate-in fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-6 flex justify-center items-center'
			)}
			{...props}
		>
			{close && <div className='w-screen h-screen bg-transparent -z-10 absolute' onClick={close}></div>}
			<div
				className={cn(
					'duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] w-full max-w-3xl border bg-background p-6 shadow-lg sm:rounded-lg md:w-full md:max-w-3xl overflow-hidden h-fit relative',
					className
				)}
			>
				{close && (
					<Button
						variant='ghost'
						size='icon'
						className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none bg-accent text-muted-foreground'
						onClick={close}
					>
						<X className='h-4 w-4' />
					</Button>
				)}
				{children}
			</div>
		</div>
	);
}
