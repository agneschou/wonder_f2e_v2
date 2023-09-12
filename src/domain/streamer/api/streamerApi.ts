import {apiClient} from "@/utils/apiClient";
import {CreateGameEventResponse} from "@/domain/streamer/api/model/CreateGameEventResponse";
import {IGameEventOutput} from "@/domain/streamer/hook/useCreateStreamerPromotion";
import {SearchStreamerEventResponse} from "@/domain/streamer/api/model/SearchStreamerEventResponse";
import {StreamerEventRequest} from "@/domain/streamer/api/model/StreamerEventRequest";

export const CREATE_GAME_EVENT_ROUTE = '/Event/createGameEvent';
export const SEARCH_GAME_EVENT_LIST_ROUTE = '/Event/SearchGameEventList';


export const streamerApi = {
    async createGameEvent(input: IGameEventOutput) : Promise<CreateGameEventResponse> {
        const formData = Object.entries(input).reduce((prev, [key, value]) => {
            if (value instanceof Array) {
                value.forEach((item) => prev.append(`${key}[]`, item));
            } else {
                prev.append(key, value);
            }
            return prev;
        }, new FormData());

        const { data} = await apiClient.post<CreateGameEventResponse>(CREATE_GAME_EVENT_ROUTE,formData);
        return data;
    },
    async searchGameEventList(req: StreamerEventRequest) : Promise<SearchStreamerEventResponse> {
        const response = await apiClient.post<SearchStreamerEventResponse>(SEARCH_GAME_EVENT_LIST_ROUTE, req);
        return response.data;
    }
}
