import {ReactNode} from "react";
import {Header} from "@/components/base/layout/Header";
import {Sidebar} from "@/components/base/layout/Sidebar";

interface LayoutProps {
    children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='w-screen h-screen overflow-hidden flex flex-col'>
            <Header  />
            <div className='flex-1 w-full overflow-hidden grid grid-cols-[240px_5fr]'>
                <div className='border-r'>
                    <Sidebar/>
                </div>
                {children}
            </div>
            {/*<Toaster />*/}
        </div>
    )
}
