import { FormWrapper, IFormWrapperBaseProps } from '@/components/base/formField/FormWrapper';
import { Selector } from '@/components/ui/Selector';
import {IOption} from "@/utils/optionUtil";

export interface IFormSelectProps extends IFormWrapperBaseProps {
	placeholder: string;
	options: IOption[];
}

export function FormSelect(props: IFormSelectProps) {
	return <FormWrapper {...props} render={({ field }) => <Selector {...props} {...field} />} />;
}
