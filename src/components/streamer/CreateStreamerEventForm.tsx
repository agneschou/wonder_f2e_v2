import { Form, FormField, FormMessage } from '@/components/ui/Form';
import { HTMLAttributes,  } from 'react';
import { Button } from '../ui/Button';
import { ScrollArea } from '../ui/ScrollArea';
import { Step, Steps } from '../ui/Steps';
import { CardContent, CardHeader, CardTitle } from '../ui/Card';
import {IOption} from "@/utils/optionUtil";
import useTranslation from "next-translate/useTranslation";
import {FormDateRange} from "@/components/base/form/FormDateRange";
import {FormSelect} from "@/components/base/form/FormSelect";
import {useCreateStreamerPromotion} from "@/domain/streamer/hook/useCreateStreamerPromotion";
import {FormMultiComboBox} from "@/components/base/formField/FormMultiComboBox";
import {FormInput} from "@/components/base/formField/FormInput";
import {FormUploadImage} from "@/components/base/formField/FormUploadImage";
import {FormRichTextEditor} from "@/components/base/formField/FormRichTextEditor";

enum CreateStreamerEventFormStep {
	BasicSetting = 'Basic Setting',
	RewardSetting = 'Reward Setting',
	Success = 'Success',
}

interface IStreamerEventFormProps extends HTMLAttributes<HTMLDivElement> {
	countryList: IOption[];
	gameCodeList: IOption[];
}

export default function CreateStreamerEventForm({ countryList, gameCodeList }: IStreamerEventFormProps) {
	const { t } = useTranslation();
	const { form, onSubmit, onNext, activeStep, prevStep, setImgErrMsg, setTextErrMsg } = useCreateStreamerPromotion();


	return (
		<div className='flex flex-col h-full overflow-hidden'>
			<CardHeader>
				<CardTitle>{t('createGameEvent.title')}</CardTitle>
			</CardHeader>
			<CardContent className='overflow-hidden flex-1'>
				<Form {...form}>
					<form onSubmit={onSubmit} className='space-y-4 h-full flex flex-col overflow-hidden'>
						<Steps activeStep={activeStep} className='flex-0'>
							<Step index={0} label={CreateStreamerEventFormStep.BasicSetting}>
								<ScrollArea className='h-full p-2'>
									<FormMultiComboBox
										name='countries'
										control={form.control}
										options={countryList}
										label={t('createGameEvent.countries.label')}
										description={t('createGameEvent.countries.description')}
										placeholder={t('createGameEvent.countries.placeholder')}
									/>
									<FormInput
										name='eventName'
										control={form.control}
										label={t('createGameEvent.eventName.label')}
										description={t('createGameEvent.eventName.description')}
										placeholder={t('createGameEvent.eventName.placeholder')}
									/>
									<FormDateRange
										name='eventTime'
										control={form.control}
										enableHour
										emableHalfHour
										formatType='MM/dd HH:mm'
										label={t('createGameEvent.eventTime.label')}
										description={t('createGameEvent.eventTime.description')}
										placeholder={t('createGameEvent.eventTime.placeholder')}
									/>
									<FormSelect
										name='gameCode'
										control={form.control}
										options={gameCodeList}
										label={t('createGameEvent.gameCode.label')}
										description={t('createGameEvent.gameCode.description')}
										placeholder={t('createGameEvent.gameCode.placeholder')}
									/>
									<FormInput
										name='streamerName'
										control={form.control}
										label={t('createGameEvent.streamerName.label')}
										description={t('createGameEvent.streamerName.description')}
										placeholder={t('createGameEvent.streamerName.placeholder')}
									/>
									<FormUploadImage
										name='eventVisualImg'
										control={form.control}
										label={t('createGameEvent.eventVisualImg.label')}
										description={t('createGameEvent.eventVisualImg.description')}
										inputLimit={{ fileSizeLessThanKB: 150, imageWidthEqualPx: 800, imageHeightEqualPx: 400 }}
										setErrMsg={setImgErrMsg}
										inputClassName='h-[200px] w-[400px]'
										accept='image/png, image/jpeg, image/jpg, image/svg'
									/>
									<FormUploadImage
										name='agentLogoImg'
										control={form.control}
										label={t('createGameEvent.agentLogoImg.label')}
										description={t('createGameEvent.agentLogoImg.description')}
										inputLimit={{ fileSizeLessThanKB: 30, imageWidthEqualPx: 80, imageHeightEqualPx: 80 }}
										setErrMsg={setImgErrMsg}
										inputClassName='h-[160px] w-[160px]'
										accept='image/png, image/jpeg, image/jpg, image/svg'
									/>
									<FormUploadImage
										name='streamerImg'
										control={form.control}
										label={t('createGameEvent.streamerImg.label')}
										description={t('createGameEvent.streamerImg.description')}
										inputLimit={{ fileSizeLessThanKB: 80, imageWidthEqualPx: 288, imageHeightEqualPx: 308 }}
										setErrMsg={setImgErrMsg}
										inputClassName='h-[144px] w-[154px]'
										accept='image/png, image/jpeg, image/jpg, image/svg'
									/>
									<FormRichTextEditor
										inputLimit={{ textLength: 500 }}
										setErrMsg={setTextErrMsg}
										name='eventContext'
										control={form.control}
										label={t('createGameEvent.eventContext.label')}
										description={t('createGameEvent.eventContext.description')}
									/>
								</ScrollArea>
								<div className='flex items-center justify-end gap-2'>
									<Button type='button' onClick={onNext}>
										{t('ui.next')}
									</Button>
								</div>
							</Step>
							<Step index={1} label={CreateStreamerEventFormStep.RewardSetting}>
								<ScrollArea className='h-full p-2'>
									<FormRichTextEditor
										className='min-h-[250px]'
										inputLimit={{ textLength: 500 }}
										setErrMsg={setTextErrMsg}
										name='bonusAreaContext'
										control={form.control}
										label={t('createGameEvent.bonusAreaContext.label')}
										description={t('createGameEvent.bonusAreaContext.description')}
									/>
									<FormRichTextEditor
										inputLimit={{ textLength: 500 }}
										setErrMsg={setTextErrMsg}
										name='bonusBreakdownContext'
										control={form.control}
										label={t('createGameEvent.bonusBreakdownContext.label')}
										description={t('createGameEvent.bonusBreakdownContext.description')}
									/>
								</ScrollArea>
								<FormField name='root' render={({}) => <FormMessage />}></FormField>
								<div className='flex items-center justify-end gap-2'>
									<Button type='button' onClick={prevStep}>
										{t('ui.back')}
									</Button>
									<Button type='submit'>{t('ui.finish')}</Button>
								</div>
							</Step>
							<Step index={2} label={CreateStreamerEventFormStep.Success}>
								<p className='text-xl flex justify-around content-end p-6'>{t('createGameEvent.finishedMessage')}</p>
							</Step>
						</Steps>
					</form>
				</Form>
			</CardContent>
		</div>
	);
}
