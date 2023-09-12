import {LoginForm} from "@/components/login/LoginForm";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
export default function Login() {
    const {t} = useTranslation();

    return (
        <div className='bg-background fixed top-0 left-0 w-screen grid grid-cols-1 lg:grid-cols-[3fr_4fr] h-screen lg:p-4 transition-all'>
            <Card className='bg-primary rounded-none lg:rounded-2xl flex flex-col justify-between'>
                <CardHeader>
                    <Image width={200} height={25} src='/logo.svg' alt='wonderland' />
                    <section className='text-primary-foreground'></section>
                </CardHeader>
                <CardContent className='flex-1 flex justify-center items-center'>
                    <Card className='w-full lg:hidden'>
                        <LoginForm />
                    </Card>
                </CardContent>
                <CardFooter className='text-primary-foreground'>
                    <div className='w-full text-right'>
                        <CardTitle>{t`metadata.title`}</CardTitle>
                        <CardDescription className='text-primary-foreground/60'>{t`metadata.description`}</CardDescription>
                    </div>
                </CardFooter>
            </Card>
            <div className='hidden lg:flex flex-col justify-center items-center'>
                <LoginForm className='border-none shadow-none w-full max-w-xl' />
            </div>
        </div>
    )
}
