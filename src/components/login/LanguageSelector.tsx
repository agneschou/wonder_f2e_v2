import { Selector } from '../ui/Selector';
import {useLanguage} from "@/domain/language/useLanguage";

export function LanguageSelector({ placeholder = '' }: { placeholder?: string }) {
	const { languageOptions, onChange, currentLanguage } = useLanguage();

	return (
		<Selector
			className='w-[180px]'
			options={languageOptions}
			value={currentLanguage}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
}
