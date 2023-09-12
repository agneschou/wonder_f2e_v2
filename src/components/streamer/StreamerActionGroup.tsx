import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ReactNode } from 'react';
import useTranslation from "next-translate/useTranslation";
const filename = 'winnerList';

export function StreamerActionGroup({
	eventId,
	status,
	winnerUrl,
}: {
	eventId: string;
	status: string;
	winnerUrl: string;
}): ReactNode {
	const { t}=useTranslation();

	return (
		<div className='flex gap-2'>
			<Button asChild className='flex'>
				<Link href={`/`}>{t('ui.view')}</Link>
			</Button>
			{status == 'Closed' && (
				<Button asChild>
					<Link
						href={``}
						target='_blank'
						download={`${filename}_${eventId}.txt`}
					>
						{t('promotionApplication.streamer.eventData.downloadWinnerList')}
					</Link>
				</Button>
			)}
		</div>
	);
}
