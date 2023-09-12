import {useEffect, useState} from "react";
import {gameCodeApi} from "@/domain/gameCode/api/gameCodeApi";
import {countryCodeApi} from "@/domain/countryCode/api/countryCodeApi";
import {IOption} from "@/utils/optionUtil";
import Loading from "@/components/streamer/Loading";
import {ModalGround} from "@/components/ui/ModalGround";
import CreateStreamerEventForm from "@/components/streamer/CreateStreamerEventForm";

export default function CreateStreamerEvent( {onClose}: {onClose: () => void}) {
    const [gameCodeList, setGameCodeList] = useState<IOption[]>([]);
    const [countryCodeList, setCountryCodeList] = useState<IOption[]>([]);

    useEffect(() => {
        Promise.all([
            gameCodeApi.getGameCodeList(),
            countryCodeApi.getCountryCodeList()
        ]).then(([gameCodeList, countryList]) => {
            setGameCodeList(gameCodeList.map(({gameCode, gameName})=>(
                {
                    value: gameCode,
                    label: gameName
                })
            ));
            setCountryCodeList(countryList.map(({isoCode, countryName})=>(
                {
                    value: isoCode,
                    label: countryName
                })
            ));
        })
    }, []);

    return (
        <ModalGround close={onClose} className='h-full'>
            {gameCodeList.length > 0 && countryCodeList.length > 0 ?
            <CreateStreamerEventForm gameCodeList={gameCodeList} countryList={countryCodeList} /> :
            <Loading/>}
        </ModalGround>
    )
}
``
