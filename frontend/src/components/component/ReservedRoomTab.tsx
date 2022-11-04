import { useEffect, useState } from "react"
import styled from "styled-components"
import { Reserve, useReserveList } from "../../HostAPI/TravelMange_axios"
import ReservedRoomBox from "./ReservedRoomBox"



export default function ReservedRoomTab() {
  const [ reserves, setReserves ] = useState<Reserve[] | []>([])

  const { data, status } = useReserveList()

  useEffect(() => {
    if(status === 'success') 
    setReserves(data.data.reserves)
  })
  return (
    <>
      {
        reserves.length !== 0
        ?
        <S.Rayout>
        <S.H2>예약목록</S.H2>
        <S.Reserves>
          {
            reserves.map( reserve => 
              <S.List key={reserve.hostName}>
                <S.Date>
                  <span>{reserve.checkIn?.replace(/\-/g, ".")}</span>
                  <span>~</span>
                  <span>{reserve.checkOut?.replace(/\-/g, ".")}</span>
                </S.Date>
                <ReservedRoomBox list={reserve}/>
              </S.List>)
          }
        </S.Reserves>
      </S.Rayout>
      :
      <S.Messge> 아직 예약한 리스트가 없습니다!</S.Messge>
      }
    </>
  )
}

//style

const S: any = {}

S.Rayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 90rem; 
`
S.H2 = styled.h2`
  width: 50rem;
  margin: 0 auto;
  margin-bottom: 4rem;
  font-size: 2rem;
  font-weight: 600;
`
S.Reserves = styled.ul`
  
`
S.List = styled.li`
  width: 50rem;
  margin: 0 auto;
  margin-bottom: 2.2rem;
`
S.Date = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
`
S.Messge = styled.div`
  width: 30rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  color: var(--main-color1);
  font-weight: 600;
  font-size: 2rem;
`