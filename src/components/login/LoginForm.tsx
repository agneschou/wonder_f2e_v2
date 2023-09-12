import {cn} from "@/lib/utils";
import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/Form";
import {Separator} from "@/components/ui/Separator";
import {Input} from "@/components/ui/Input";
import React from "react";
import {ButtonLoading} from "@/components/base/button/ButtonLoading";
import {LanguageSelector} from "@/components/login/LanguageSelector";
import useTranslation from "next-translate/useTranslation";
import {useLoginForm} from "@/domain/login/useLoginForm";

export const LoginForm = ({className}: {className?:string}) => {
    const {t} = useTranslation();
    const {form, onSubmit} = useLoginForm();

    return (
        <div className={cn(className)}>
            <CardHeader>
                <CardTitle>{t('login.title')}</CardTitle>
                <CardDescription>{t('login.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form  {...form}>
                    <form onSubmit={onSubmit} className={cn('space-y-8')}>
                        <FormField
                            control={form.control}
                            name='agentId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('login.agentId.label')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('login.agentId.placeholder')} {...field} />
                                    </FormControl>
                                    <FormDescription>{t('login.agentId.description')}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('login.password.label')}</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder={t('login.password.placeholder')} {...field} />
                                    </FormControl>
                                    <FormDescription>{t('login.password.description')}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField name='root' render={() => <FormMessage />} />
                        <ButtonLoading type='submit'   loading={form.formState.isSubmitting} className='w-full'>
                            {t('login.button')}
                        </ButtonLoading>
                    </form>
                </Form>
            </CardContent>
            <div className='relative h-6 mx-4 my-6'>
                <Separator />
                <span className='text-center whitespace-nowrap px-1 bg-background text-muted-foreground absolute -translate-y-1/2 left-1/2 -translate-x-1/2'>
					{t('language.hint')}
				</span>
            </div>
            <CardFooter className='flex flex-col gap-12'>
                <LanguageSelector placeholder={t('language.input.placeholder')} />
            </CardFooter>
        </div>
    );
}
