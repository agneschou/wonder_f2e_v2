import {useForm} from "react-hook-form";
import {parseIsoDefault} from "@/utils/date";
import {addDays} from "date-fns";
import {useEffect, useState} from "react";
import {IOption, OptionType} from "@/utils/optionUtil";
import {useRouter} from "next/router";
import {gameCodeApi} from "@/domain/gameCode/api/gameCodeApi";

interface ISearchStreamerEventFormData {
    gameCode: string;
    status: string;
    eventRange: {
        from: Date;
        to: Date;
    }
}

export const useStreamerHeader = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const [gameCodeList, setGameCodeList] = useState<IOption[]>([]);
    const router = useRouter();

    useEffect(() => {
        gameCodeApi.getGameCodeList().then((gameList) => {
            setGameCodeList([...gameList.map((item) => ({
                value: item.gameCode,
                label: item.gameName
            })), {
                value: OptionType.All,
                label: OptionType.All
            }])
        });
    }, []);

    const form = useForm<ISearchStreamerEventFormData>({
        defaultValues: {
            gameCode: urlParams.get('gameCode') || OptionType.All,
            status: urlParams.get('status') || OptionType.All,
            eventRange: {
                from:parseIsoDefault(new Date(), urlParams.get('startTime') as string),
                to: parseIsoDefault(addDays(new Date(), 7), urlParams.get('endTime') as string),
            }
        },
    });

    const onSubmit = form.handleSubmit((input: ISearchStreamerEventFormData) => {
        router.replace({
            pathname: router.pathname,
            query: {
                gameCode: input.gameCode,
                status: input.status,
                startTime: input.eventRange.from.toISOString(),
                endTime: input.eventRange.to.toISOString(),
            },
        }).then(()=>router.reload())
    });

    return {
        form,
        gameCodeList,
        onSubmit
    }
}
