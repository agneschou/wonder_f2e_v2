import {addDays, addHours, addMonths, isAfter} from "date-fns";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useStepper} from "@/utils/hook/useStepper";
import useTranslation from "next-translate/useTranslation";
import {streamerApi} from "@/domain/streamer/api/streamerApi";

const basicSettingSchema = z.object({
    countries: z.array(z.string()).min(1, { message: 'createGameEvent.errorMessage.countryRequired' }),
    eventName: z.string().min(3).max(50),
    eventTime: z
        .object({
            from: z.date().min(addDays(new Date(), 7)),
            to: z.date().max(addMonths(new Date(), 1)),
        })
        .refine((data) => data.from < data.to, 'errorMessage.endTimeGreaterThanStartTime')
        .refine((data) => isAfter(addHours(data.from, 3), data.to), 'createGameEvent.errorMessage.eventTimeExceedLimit'),
    gameCode: z.string().min(3).max(50),
    streamerName: z.string().min(3).max(500),
    eventContext: z.string().min(3).max(500),
    eventVisualImg: z.instanceof(Blob, {
        message: 'image is required',
    }),
    agentLogoImg: z.instanceof(Blob,{
        message: 'image is required',
    }),
    streamerImg: z.instanceof(Blob,{
        message: 'image is required',
    }),
});

const rewardSettingSchema = z.object({
    bonusAreaContext: z.string().min(3).max(500),
    bonusBreakdownContext: z.string().min(3).max(500),
});

const steamerEventSchema = basicSettingSchema.merge(rewardSettingSchema).transform(({ eventTime, ...rest }) => {
    return {
        ...rest,
        startTime: eventTime.from.toISOString(),
        endTime: eventTime.to.toISOString(),
    };
});

export type IGameEventInput = z.input<typeof steamerEventSchema>;
export type IGameEventOutput = z.output<typeof steamerEventSchema>;


enum CreateStreamerEventFormStep {
    BasicSetting = 'Basic Setting',
    RewardSetting = 'Reward Setting',
    Success = 'Success',
}


export const useCreateStreamerPromotion = () => {
    const {t}=useTranslation();

    const { nextStep, prevStep, activeStep } = useStepper({
        initialStep: 0,
        steps: [
            { label: CreateStreamerEventFormStep.BasicSetting },
            { label: CreateStreamerEventFormStep.RewardSetting },
            { label: CreateStreamerEventFormStep.Success },
        ]
    });

    const form = useForm<IGameEventInput>({
        defaultValues: {
            countries: [],
            eventName: '',
            eventTime: {
                from: undefined,
                to: undefined,
            },
            gameCode: '',
            streamerName: '',
            eventContext: '',
            eventVisualImg: undefined,
            agentLogoImg: undefined,
            streamerImg: undefined,
        },
        resolver: zodResolver(steamerEventSchema),
    });

    const onSubmit = form.handleSubmit(async (values: unknown) => {
        const data = await streamerApi.createGameEvent(values as IGameEventOutput);
        if (data.returnCode !== 0) {
            form.setError('root', { type: 'manual', message: t(data.returnMsg) });
            return;
        }
        nextStep();
    });

    const onNext = () => {
        form.clearErrors();
        const values = form.getValues();
        const validation = basicSettingSchema.safeParse(values);
        if (!validation.success) {
            validation.error.issues.forEach(({ path, message }) => {
                form.setError(path[0] as any, { type: 'manual', message: t(message) });
            });
            return;
        }
        nextStep();
    };

    const setImgErrMsg = (isError: boolean, name: any, message: string) => {
        if (!isError) return true;
        form.setError(name, { type: 'manual', message: t(message) });
        return false;
    };

    const setTextErrMsg = (isError: boolean, name: any, message: string) => {
        if (!isError) return true;
        form.setError(name, { type: 'manual', message: t(message) });
        return false;
    };

    return {
        form,
        onSubmit,
        onNext,
        activeStep,
        prevStep,
        setImgErrMsg,
        setTextErrMsg
    }
}
