import {GameData} from "@/domain/gameCode/model/GameData";
import {apiClient} from "@/utils/apiClient";
import {GetGameListResponse} from "@/domain/gameCode/api/model/GetGameListResponse";

export const GET_GAME_CODE_LIST_ROUTE = '/Event/GetCreateGameCodes';
export const gameCodeApi = {
    getGameCodeList: async () : Promise<GameData[]> => {
        const res = await apiClient.get<GetGameListResponse>(GET_GAME_CODE_LIST_ROUTE);
        return res.data.gameLists;
    }
}
