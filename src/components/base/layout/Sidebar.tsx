import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/ScrollArea";
import {Button} from "@/components/ui/Button";
import Link from "next/link";
import {useRouter} from "next/router";
import { User } from 'lucide-react';
import useTranslation from "next-translate/useTranslation";

const sidebarGroup = [
    {
        label: 'sidebar.user',
        list: [
            {
                label: 'sidebar.accountManagement',
                path: '/user/accountManagement',
                icon: <User size={16} />,
            },
            {
                label: 'sidebar.accountProfileManagement',
                path: '/user/accountProfileManagement',
                icon: <User size={16} />,
            },
        ],
    },
    {
        label: 'sidebar.promotionManagement',
        list: [
            {
                label: 'sidebar.promotionApplication',
                path: '/promotion/application/streamer',
                icon: <User size={16} />,
            },
            {
                label: 'sidebar.manualPointGiveaway',
                path: '/promotionManagement/manualPointGiveaway',
                icon: <User size={16} />,
            },
        ],
    },
];;

export const Sidebar = () => {
    const { t } = useTranslation();
    return (
        <div className={cn('pb-12')}>
            <div className='space-y-4 py-4'>
                {sidebarGroup.map(({ label, list }) => (
                    <div className='px-3 py-2' key={label}>
                        <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>{t(label)}</h2>
                        <ScrollArea className={`h-[${Math.min(300, list.length * 44 - 4)}px]`}>
                            <div className='space-y-1'>
                                {list.map((item) => (
                                    <NavButton key={item.label} {...item} path={item.path} />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                ))}
            </div>
        </div>
    );
}

function NavButton({ path, icon, label }: { label: string; path: string; icon: JSX.Element }) {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <Button variant={router.pathname.indexOf(path) > -1 ? 'secondary' : 'ghost'} asChild className='w-full justify-start'>
            <Link href={path} className='flex items-center gap-1'>
                {icon}
                <span>{t(label)}</span>
            </Link>
        </Button>
    );
}
