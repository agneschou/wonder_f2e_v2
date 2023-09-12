import {StreamerEvent} from "@/domain/streamer/model/StreamerEvent";

export interface SearchStreamerEventResponse {
    data: StreamerEvent[]
    returnCode: number,
    returnMsg: string
}
