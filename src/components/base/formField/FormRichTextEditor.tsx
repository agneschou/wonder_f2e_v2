import { cn } from '@/lib/utils';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../ui/Form';
import { IFormWrapperBaseProps } from './FormWrapper';
import {TextEditor} from "@/components/base/editor/TextEditor";
import useTranslation from "next-translate/useTranslation";

export function FormRichTextEditor({
	control,
	name,
	label,
	description,
	className,
	setErrMsg,
	inputLimit,
}: IFormWrapperBaseProps & {
	setErrMsg: (isError: boolean, name: any, message: string) => boolean;
	inputLimit: {
		textLength: number;
	};
}) {
	const t = useTranslation().t;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('p-2', className)}>
					<FormLabel>{label}</FormLabel>
					<FormDescription>{description}</FormDescription>
					<FormControl>
						<TextEditor
							value={field.value}
							onChange={(value: string) => field.onChange(value)}
							validateTextLength={(length) =>
								setErrMsg(length > inputLimit.textLength, field.name, t('errorMessage.textLength'))
							}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
