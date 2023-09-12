import {changePasswordApiMock} from "@/domain/changePassword/api/changePasswordApiMock";
import {countryCodeApiMock} from "@/domain/countryCode/api/countryCodeApiMock";
import {gameCodeApiMock} from "@/domain/gameCode/api/gameCodeApiMock";
import {loginApiMock} from "@/domain/login/api/loginApiMock";
import {streamerApiMock} from "@/domain/streamer/api/streamerApiMock";
export const handlers = [
  changePasswordApiMock(),
  countryCodeApiMock(),
  gameCodeApiMock(),
  loginApiMock(),
  ...streamerApiMock(),
]
