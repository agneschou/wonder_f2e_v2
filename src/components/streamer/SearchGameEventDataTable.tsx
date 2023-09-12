import { DataTable } from '@/components/ui/DataTable';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { ColumnDef } from '@tanstack/react-table';
import { StreamerActionGroup } from './StreamerActionGroup';
import {StreamerEvent} from "@/domain/streamer/model/StreamerEvent";
import useTranslation from "next-translate/useTranslation";
import {useSearchStreamerEvents} from "@/domain/streamer/hook/useSearchStreamerEvents";


export function SearchGameEventDataTable() {
	const { t } = useTranslation();
	const { eventList } =useSearchStreamerEvents();
	const columns: ColumnDef<StreamerEvent>[] = [
		{ accessorKey: 'eventName', header: t('promotionApplication.streamer.eventHeader.eventName') },
		{
			accessorKey: 'eventTime',
			header: t('promotionApplication.streamer.eventHeader.eventTime'),
			cell: ({
				row: {
					original: { startTime, endTime },
				},
			}) => (
				<p className='whitespace-nowrap'>{`${new Date(startTime).toLocaleString()} - ${new Date(
					endTime
				).toLocaleString()}`}</p>
			),
		},
		{ accessorKey: 'gameName', header: t('promotionApplication.streamer.eventHeader.gameName') },
		{ accessorKey: 'budgetPoint', header: t('promotionApplication.streamer.eventHeader.budgetPoint') },
		{ accessorKey: 'rewardPoint', header: t('promotionApplication.streamer.eventHeader.rewardPoint') },
		{ accessorKey: 'collectionAmount', header: t('promotionApplication.streamer.eventHeader.collectionAmount') },
		{ accessorKey: 'participationAmount', header: t('promotionApplication.streamer.eventHeader.participationAmount') },
		{ accessorKey: 'status', header: t('promotionApplication.streamer.eventHeader.status') },
		{ accessorKey: 'remark', header: t('promotionApplication.streamer.eventHeader.remark') },
		{
			id: 'action',
			header: t('promotionApplication.streamer.eventHeader.action'),
			cell: ({ row: { original } }) => (
				<StreamerActionGroup winnerUrl={original.winnerListUrl} status={original.status} eventId={original.eventId} />
			),
		},
	];

	return eventList ? (
		<ScrollArea horizontal className='w-full'>
			<DataTable columns={columns} data={eventList} />
		</ScrollArea>
	) : (
		<p className='text-center text-muted-foreground'>{t('errorMessage.noData')}</p>
	);
}
