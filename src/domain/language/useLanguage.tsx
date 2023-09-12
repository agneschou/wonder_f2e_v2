import {languages} from "../../../config";
import {useRouter} from "next/router";
import {cookieClient} from "@/utils/cookieClient";

export function useLanguage() {
    const router = useRouter();

    const languageOptions = Object.keys(languages).map((locale) => ({
        value: locale,
        label: languages[locale as keyof typeof languages],
    }));

    const onChange = (lang: string) => {
        cookieClient.set('NEXT_LOCALE', lang);
        router.replace(router.asPath, undefined, { locale: lang });
    }

    return {
        languageOptions,
        onChange,
        currentLanguage: router.locale
    }
}
