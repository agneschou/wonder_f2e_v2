import {Form} from "@/components/ui/Form";
import {FormDateRange} from "@/components/base/form/FormDateRange";
import {FormSelect} from "@/components/base/form/FormSelect";
import {Button} from "../ui/Button";
import useTranslation from "next-translate/useTranslation";
import {useStreamerHeader} from "@/domain/streamer/hook/useStreamerHeader";
import {IOption, OptionType} from "@/utils/optionUtil";

const statusList: IOption[] = [
    { value: OptionType.All, label: OptionType.All },
    { value: OptionType.Approve, label: OptionType.Approve },
    { value: OptionType.Pending, label: OptionType.Pending },
    { value: OptionType.Reject, label: OptionType.Reject },
];

export const SearchGameEventHeader = () => {
    const { t } = useTranslation();
    const { form , gameCodeList, onSubmit } = useStreamerHeader();
    return (
        <div className='flex gap-2'>
            <Form {...form}>
                <form onSubmit={onSubmit} className='flex gap-2'>
                    <FormDateRange
                        control={form.control}
                        formatType='MMMM dd'
                        name='eventRange'
                        label={t('promotionApplication.streamer.eventRange.label')}
                        placeholder={t('promotionApplication.streamer.eventRange.placeholder')}
                        description={t('promotionApplication.streamer.eventRange.description')}
                    />
                    <FormSelect
                        name='gameCode'
                        options={gameCodeList}
                        control={form.control}
                        label={t('promotionApplication.streamer.gameCode.label')}
                        placeholder={t('promotionApplication.streamer.gameCode.placeholder')}
                        description={t('promotionApplication.streamer.gameCode.description')}
                    />
                    <FormSelect
                        name='status'
                        control={form.control}
                        options={statusList}
                        label={t('promotionApplication.streamer.status.label')}
                        placeholder={t('promotionApplication.streamer.status.placeholder')}
                        description={t('promotionApplication.streamer.status.description')}
                    />
                    <Button type='submit' className='mt-10'>
                        {t('ui.search')}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
