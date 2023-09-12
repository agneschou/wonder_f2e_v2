import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginService} from "@/domain/login/service";
import {LoginError, LoginErrorType} from "@/domain/login/model/LoginError";
import useTranslation from "next-translate/useTranslation";

const loginSchema = z.object({
    agentId: z.string(),
    password: z.string(),
});

type ILoginInput = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
    const { t } = useTranslation();
    const form = useForm<ILoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            agentId: '',
            password: '',
        },
    });

    const onSubmit = form.handleSubmit(async function (values: ILoginInput) {
        try {
            await loginService.login(values.agentId, values.password);
        } catch (e) {
           if(e instanceof LoginError) {
               form.setError('root', {
                   message: t(e.type.toString()),
               });
           } else {
               form.setError('root', {
                   message: t(LoginErrorType.unknownError),
               });
           }
        }
    });

    return {
        onSubmit,
        form,
    }
}
