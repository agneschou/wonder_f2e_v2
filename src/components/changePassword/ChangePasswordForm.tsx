import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { ModalGround } from '../ui/ModalGround';
import {ButtonLoading} from "@/components/base/button/ButtonLoading";
import useTranslation from "next-translate/useTranslation";
import {useChangePassword} from "@/components/changePassword/useChangePassword";

type Props = {
	isFirstLogin?: boolean;
};

export function ChangePasswordForm({ isFirstLogin = false }: Props) {
	const { t } = useTranslation();
	const scopedT = (key: string) => t(`changePassword.${key}`);
	const { onSubmit, onClose, form } = useChangePassword({ isFirstLogin });

	return (
		<ModalGround close={onClose} className='h-fit'>
			<div >
				<CardHeader>
					<CardTitle>{scopedT('title')}</CardTitle>
					<CardDescription>{scopedT('description')}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={onSubmit} className={cn('space-y-8')}>
							<FormField
								control={form.control}
								name='oldPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{scopedT('oldPassword.label')}</FormLabel>
										<FormControl>
											<Input type='password' placeholder={scopedT('oldPassword.placeholder')} {...field} />
										</FormControl>
										<FormDescription>{scopedT('oldPassword.description')}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{scopedT('newPassword.label')}</FormLabel>
										<FormControl>
											<Input type='password' placeholder={scopedT('newPassword.placeholder')} {...field} />
										</FormControl>
										<FormDescription>{scopedT('newPassword.description')}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<ButtonLoading type='submit' loading={form.formState.isSubmitting} className='w-full'>
								{scopedT('button')}
							</ButtonLoading>
						</form>
					</Form>
				</CardContent>
			</div>
		</ModalGround>
	);
}
