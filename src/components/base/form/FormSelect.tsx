import { Selector } from '@/components/ui/Selector';
import {IOption} from "@/utils/optionUtil";
import {FormWrapper, IFormWrapperBaseProps} from "@/components/base/form/FormWrapper";

export interface IFormSelectProps extends IFormWrapperBaseProps {
	placeholder: string;
	options: IOption[];
}

export function FormSelect(props: IFormSelectProps) {
	return <FormWrapper {...props} render={({ field }) => <Selector {...props} {...field} />} />;
}
