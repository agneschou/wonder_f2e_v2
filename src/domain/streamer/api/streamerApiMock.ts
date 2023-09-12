import {rest} from "msw";
import {CreateGameEventResponse} from "@/domain/streamer/api/model/CreateGameEventResponse";
import {CREATE_GAME_EVENT_ROUTE, SEARCH_GAME_EVENT_LIST_ROUTE} from "@/domain/streamer/api/streamerApi";
import {SearchStreamerEventResponse} from "@/domain/streamer/api/model/SearchStreamerEventResponse";
import {getBaseUrl} from "@/utils/apiClient";

export function streamerApiMock() {
    return [
        rest.post(getBaseUrl()+CREATE_GAME_EVENT_ROUTE, (req, res, ctx) => {
            const response: CreateGameEventResponse = {
                returnCode: 0,
                returnMsg: 'success',
            };
            return res(
                // Respond with a 200 status code
                ctx.status(200),
                ctx.json(response),
            )
        }),
        rest.post(getBaseUrl()+SEARCH_GAME_EVENT_LIST_ROUTE, (req, res, ctx) => {
            const response: SearchStreamerEventResponse = {
                data:  [
                    {
                        eventId: 'cbdde4ae-b320-4e04-aeca-d2b7d06480cf',
                        eventName: 'TestGameEvent2',
                        startTime: '2023-07-30T04:00:00Z',
                        endTime: '2023-08-11T04:00:00Z',
                        gameCode: '170281',
                        gameName: 'CashOrCrash',
                        budgetPoint: 0,
                        rewardPoint: 0,
                        collectionAmount: 0,
                        participationAmount: 0,
                        status: 'Approve',
                        remark: 'www.google.com.tw',
                        winnerListUrl: '',
                    },
                ],
                returnCode: 0,
                returnMsg: 'Success',
            }
            return res(
                // Respond with a 200 status code
                ctx.status(200),
                ctx.json(response),
            )
        }),
    ]
}
