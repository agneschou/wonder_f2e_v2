import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {changePasswordApi} from "@/domain/changePassword/api/changePasswordApi";
import {useRouter} from "next/router";
import {cookieClient} from "@/utils/cookieClient";

const changePasswordSchema = z.object({
    oldPassword: z.string().max(20),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter'),
});

export type IChangePasswordInput = z.infer<typeof changePasswordSchema>;

interface useChangePasswordProps {
    isFirstLogin?: boolean;
}

export const useChangePassword = ({isFirstLogin}: useChangePasswordProps) => {
    const router = useRouter();
    const form = useForm<IChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        },
    });

    const onSubmit = form.handleSubmit(async (values) => {
        await changePasswordApi.changePassword(values);
        cookieClient.delete('isFirstLogin');
        isFirstLogin ?
            router.back() :
            router.replace(`/`);
    });

    const onClose = () => {
        if(isFirstLogin) return;
        router.back();
    };

    return {
        form,
        onSubmit,
        onClose
    }
}
