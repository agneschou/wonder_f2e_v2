import {Layout} from "@/components/base/layout/Layout";
import {PromotionApplicationLayout} from "@/components/base/layout/PromotionApplicationLayout";
import {SearchGameEventHeader} from "@/components/streamer/SearchGameEventHeader";
import {Card, CardContent, CardHeader} from "@/components/ui/Card";
import {SearchGameEventDataTable} from "@/components/streamer/SearchGameEventDataTable";
import {Button} from "@/components/ui/Button";
import useTranslation from "next-translate/useTranslation";
import {useState} from "react";
import dynamic from 'next/dynamic'
import Link from "next/link";

const CreateStreamerEvent = dynamic(() => import('@/components/streamer/CreateStreamerEvent'), {
    ssr: false,
})

export default function Streamer() {
    const { t} = useTranslation();
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    return (
        <Layout>
            <PromotionApplicationLayout>
                {
                    isOpenCreate ? <CreateStreamerEvent onClose={()=>setIsOpenCreate(false)}/> : null
                }
                <Card>
                    <CardHeader>
                        <div className='flex justify-between '>
                            <SearchGameEventHeader/>
                            <Button asChild className='mt-10 ml-auto' onClick={()=>setIsOpenCreate(true)}>
                                <Link href="">{t('ui.create')}</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <SearchGameEventDataTable />
                    </CardContent>
                </Card>
            </PromotionApplicationLayout>
        </Layout>
    )
}
