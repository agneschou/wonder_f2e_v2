import {LinkTabsList, TabsLink} from "@/components/ui/LinkTabs";
import {useRouter} from "next/router";
import {ReactNode} from "react";

interface PromotionApplicationLayoutProps {
    children: ReactNode
}

const links = [
    {
        href: '/promotion/application/streamer',
        label: 'Streamer'
    },
    {
        href: '/promotion/application/traffic',
        label: 'Traffic'
    }
]

export const PromotionApplicationLayout = ({children}: PromotionApplicationLayoutProps) => {
    const router = useRouter();

    return (
        <div className='p-2 w-full overflow-hidden flex flex-col'>
            <LinkTabsList className='grid grid-cols-2'>
                {
                    links.map((link) => (
                        <TabsLink key={link.href} href={link.href} isActive={router.pathname === link.href}>
                            {link.label}
                        </TabsLink>
                    ))
                }
            </LinkTabsList>
            {children}
        </div>
    )
}
