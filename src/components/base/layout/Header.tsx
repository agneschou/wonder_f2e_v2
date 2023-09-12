import Link from "next/link";
import Image from 'next/image';

import {LanguageSelector} from "@/components/login/LanguageSelector";
import {UserNav} from "@/components/base/layout/UserNav";

export const Header = () => {
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4 gap-6'>
                <Link href='/'>
                    <Image src='/logo_bg.svg' width={100} height={12.5} alt='wonderland' className='rounded' />
                </Link>
                <LanguageSelector />
                <div className='ml-auto flex items-center space-x-4'>
                    <UserNav />
                </div>
            </div>
        </div>
    )
}
