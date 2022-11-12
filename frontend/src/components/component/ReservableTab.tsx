import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getReservable, Room } from "../../HostAPI/TravelMange_axios";
import { ReservationBox } from "./ReservationBox";


export default function ReservableTab() {
  const queryClient = useQueryClient()
  const [ reservable, setReservable ] = useState<Room[] | []>([])

  const country = window.localStorage.getItem('country')
  const id = window.localStorage.getItem('travelId')
  const ended = window.localStorage.getItem('ended')

  const { data } = queryClient.getQueryData(['@pined']) as any

  const pinedIds = data.pineds.map( (list: { id: number }) => list.id)

  useEffect(() => {
    if(Number(ended) >= 0){
      const getList = getReservable(country!)
      getList.then(res => setReservable(res.data))
      .catch(e => alert(`${e.message}예약 가능한 숙소를 로드하지 못했습니다`))
    }
  }, [])
  
  return (
    <>
    {reservable.length !== 0
     ?
      reservable.map((list: Room) => {
        const initState = pinedIds.includes(list.id)

        return (
          <>
          <S.Div key={list.name}>
            <ReservationBox  
              list={list} 
              id={Number(id)}
              initState={initState}/>
          </S.Div>
          </>
        )
      })
     :
     <S.Messge>예약가능한 숙소가 없습니다.</S.Messge>
    }
    </>
  )
}

//style

const S: any = {}

S.Div = styled.div`
  margin-bottom: 2rem;
`
S.Messge = styled.div`
  width: 30rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  color: var(--main-color1);
  font-weight: 600;
  font-size: 2rem;
`