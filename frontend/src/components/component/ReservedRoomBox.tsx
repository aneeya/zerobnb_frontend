import styled from "styled-components"
import { Reserve, useReserveDelete } from "../../HostAPI/TravelMange_axios"

import haus from "../../assets/haus.png"
import ConfirmLayout from "../layout/ConfirmLayout"
import { useState } from "react"

interface Props {
  list: Reserve
}

export default function ReservedRoomBox({list}: Props) {
  const [ confirm, setConfirm ] = useState(false)
  const days = getTotalDay(list.total!, list.price)

  const cancelMutation = useReserveDelete(list.id!)

  const clickDelete = () => {
    cancelMutation.mutate()
    if(!cancelMutation.isSuccess){
      setConfirm(false)
    }
  }

  return (
    <>
      {confirm && <ConfirmLayout message="예약을 취소 하시겠습니까??🤔" confirm={clickDelete} cancel={() => setConfirm(false)}/>}
      <S.Rayout>
        <S.Img role="img" aria-label={`${list.name}이미지`}></S.Img>
        <S.Content>
          <S.Name>{list.name}</S.Name>
          <S.ContentCost>
            <span>총비용: </span>
            <S.Total>{list.total}</S.Total>
          </S.ContentCost>
          <S.ContentDays>
            <span>{days}</span>
          </S.ContentDays>
          <S.ContentConfirm>예약이 완료 되었습니다!</S.ContentConfirm>
        </S.Content>
        <S.CancelBT type="button" onClick={() => setConfirm(true)}>취소</S.CancelBT>
      </S.Rayout>
    </>
  )
}

//style

const S: any = {}

S.Rayout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45.4rem;
  height: 14.6rem;
  padding: 1rem 1rem 1rem 0.1rem;
  border: 1px solid var(--main-color1-1);
  border-radius: 1.5rem;
`

S.Img = styled.div`
  width: 18rem;
  height: 13rem;
  margin-right: 1.5rem;
  background: var(--main-color1-1) url(${haus}) center / 8rem no-repeat;
  border-radius: 1.2rem;
`

S.Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 23rem;
  height: 13rem;
  font-size: 1.5rem;
`
S.Name = styled.h3`
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  font-weight: 600;
`
S.ContentCost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15rem;
  margin-bottom: 0.8rem;
`
S.Total = styled.span`
  font-weight: 600;
`
S.ContentDays = styled.div`
  margin-bottom: 1rem;
`
S.ContentConfirm = styled.p`
  color: var(--color-red);
`
S.CancelBT = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--main-color1);
  &:hover,
  &:focus {
    font-weight: bolder;
  }
`


const getTotalDay = (total: string, price: string) => {
  const removeA = total.replace(/\,/g, "")
  const removeW = removeA.replace('원', '')

  let days = Number(removeW) / Number(price)
  days = Math.floor(days)

  return `${days}박 ${days + 1}일`
} 

