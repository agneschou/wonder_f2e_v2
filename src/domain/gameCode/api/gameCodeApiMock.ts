import {rest} from "msw";
import {GET_GAME_CODE_LIST_ROUTE} from "@/domain/gameCode/api/gameCodeApi";
import {GetGameListResponse} from "@/domain/gameCode/api/model/GetGameListResponse";
import {getBaseUrl} from "@/utils/apiClient";
export function gameCodeApiMock() {
    return rest.get(getBaseUrl()+GET_GAME_CODE_LIST_ROUTE, (req, res, ctx) => {
        const response: GetGameListResponse = {
            gameLists:  [
                {
                    gameCode: '123',
                    gameName: 'COC',
                },
                {
                    gameCode: '456',
                    gameName: 'Plinko',
                },
            ]
        }

        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json(response),
        )
    })
}
