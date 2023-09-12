import { cn } from '@/lib/utils';
import { ImageUploadInput } from '../../ui/ImageUploadInput';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';
import useTranslation from "next-translate/useTranslation";

interface IFormUploadImageProps extends IFormWrapperBaseProps {
	inputLimit: {
		fileSizeLessThanKB: number;
		imageHeightEqualPx: number;
		imageWidthEqualPx: number;
	};
	setErrMsg: (isError: boolean, name: any, message: string) => boolean;
	disabled?: boolean;
	inputClassName?: string;
	accept?: string;
}

export function FormUploadImage({
	control,
	name,
	label,
	description,
	className,
	inputClassName,
	setErrMsg,
	inputLimit,
	disabled,
	accept,
}: IFormUploadImageProps) {
	const { t } = useTranslation();
	return (
		<FormWrapper
			name={name}
			control={control}
			className={className}
			label={label}
			description={description}
			render={({ field: { value, ...field } }) => (
				<ImageUploadInput
					{...field}
					className={cn(inputClassName)}
					accept={accept}
					validateSize={(size) =>
						setErrMsg(
							size > 1024 * inputLimit.fileSizeLessThanKB,
							field.name,
							t('errorMessage.fileSizeLessThanKB', { kb: inputLimit.fileSizeLessThanKB })
						)
					}
					validateHeight={(height) =>
						setErrMsg(
							height > inputLimit.imageHeightEqualPx,
							field.name,
							t('errorMessage.imageHeightEqualPx', { px: inputLimit.imageHeightEqualPx })
						)
					}
					validateWidth={(width) =>
						setErrMsg(
							width > inputLimit.imageWidthEqualPx,
							field.name,
							t('errorMessage.imageWidthEqualPx', { px: inputLimit.imageWidthEqualPx })
						)
					}
					disabled={disabled}
				/>
			)}
		/>
	);
}
