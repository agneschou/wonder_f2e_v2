import {useEffect, useState} from "react";
import {StreamerEventRequest} from "@/domain/streamer/api/model/StreamerEventRequest";
import {StreamerEvent} from "@/domain/streamer/model/StreamerEvent";
import {streamerApi} from "@/domain/streamer/api/streamerApi";

export const useSearchStreamerEvents = () => {
    const [eventList, setEventList] = useState<StreamerEvent[]>();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.size === 0) return;
        const req : StreamerEventRequest = {
            gameCode: urlParams.get('gameCode') as string,
            status: urlParams.get('status') as string,
            startTime: new Date(urlParams.get('startTime') as string).toISOString(),
            endTime: new Date(urlParams.get('endTime') as string).toISOString(),
        };
        streamerApi.searchGameEventList(req).then((res)=>{
            setEventList(res.data);
        });
    }, []);

    return {eventList};
}
