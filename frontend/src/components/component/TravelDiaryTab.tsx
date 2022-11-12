import { useEffect, useState } from "react"
import styled from "styled-components"
import { Reserve, useReserveList } from "../../HostAPI/TravelMange_axios"
import { useDeleteSchedule } from "../../HostAPI/TravelSchedule"
import Button from "../common/Button"
import TravelDiaryBox from "./TravelDiaryBox"



export default function TravelDiaryTab() {
  const [ reserves, setReserves ] = useState<Reserve[] | []>([])

  const ended = window.localStorage.getItem('ended')
  
  const { data, status } = useReserveList()
  const deletMutation = useDeleteSchedule()
  
  useEffect(() => {
    if(status === 'success' && Number(ended) < 0) 
    setReserves(data.data.reserves)
  })

  return (
    <>
      {
        reserves.length !== 0
        ?
        <S.Rayout>
          <S.TextArea>
            <S.H2>다녀간 숙소</S.H2>
            <S.Text>마지막 일정 기준으로 30일 지난 후 기록이 없으면 자동으로 사라집니다😊</S.Text>
          </S.TextArea>
          <S.Reserves>
            {
              reserves.map( reserve => 
                <S.List key={reserve.hostName}>
                    <S.Date>
                      <span>{reserve.checkIn?.replace(/\-/g, ".")}</span>
                      <span>~</span>
                      <span>{reserve.checkOut?.replace(/\-/g, ".")}</span>
                    </S.Date>
                  <TravelDiaryBox list={reserve}/>
                </S.List>)
            }
          </S.Reserves>
        </S.Rayout>
        :
        <div>
          {
            Number(ended) < 0 
            ?
            <S.ButtonArea>
             <Button type="button" text="일정 삭제" onClick={() => deletMutation.mutate()}/>
            </S.ButtonArea>
            : null
          }
          <S.Messge>아직 다녀온 숙소가 없습니다</S.Messge>
        </div>
      }
    </>
  )
}

//style

const S: any = {}

S.Rayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90rem; 
`

S.TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: width: 50rem;
  margin-bottom: 4rem;
`
S.H2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`
S.Text = styled.div`
`

S.Reserves = styled.ul`
  
`
S.List = styled.li`
  width: 50rem;
  margin-bottom: 2.2rem;
`
S.Date = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
`

S.ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
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
