import styled from "styled-components"
import { Diary, Reserve, useDiaryList, useReserveDelete } from "../../HostAPI/TravelMange_axios"

import haus from "../../assets/haus.png"
import { useEffect, useState, MouseEvent } from "react"
import TravelDiaryForm from "../../form/TravelDiaryForm"
import TravelDiaryList from "./TravelDiaryList"
import { useNavigate } from "react-router-dom"

interface Props {
  list: Reserve
}

export default function TravelDiaryBox({list}: Props) {
  const [ diary, setDiary ] = useState(false)
  const [ recommended, setRecommended ] = useState<Diary[] | []>([])

  const ended = window.localStorage.getItem('ended')

  const cancelMutation = useReserveDelete(list.id!)
  const { data, status } = useDiaryList(list.id!) 

  const nav = useNavigate()

  const clickPage = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if(target.innerText !== '기록하기') nav(`/${String(list.id)}`)
  }
 
  if(Number(ended) < -30 && recommended.length === 0) {
    cancelMutation.mutate()
  }

  useEffect(() => {
    if(status === 'success' && data.data !== null) {
      setRecommended(data.data)
    }
  })


  return (
    <>
      {diary && 
        <S.DiaryForm>
          <TravelDiaryForm name={list.name} roomId={Number(list.id)} clickCancel={() => setDiary(false)}/>
        </S.DiaryForm>
      }
      <S.Layout onClick={clickPage}>
        <S.Img role="img" aria-label={`${list.name}이미지`}></S.Img>
        <S.Content>
          <S.Name>{list.name}</S.Name>
          <S.Country>
            <span>country: </span>
            <S.CountryName>{list.city}</S.CountryName>
          </S.Country>
        </S.Content>
        <S.DiaryBT type="button" onClick={() => setDiary(true)}>기록하기</S.DiaryBT>
      </S.Layout>
      {
        recommended.length !== 0
        ?
        <TravelDiaryList recommended={recommended}/>
        :
        null
      }
    </>
  )
}

//style

const S: any = {}

S.DiaryForm = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 9999;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 120rem;
background: var(--color-white);
overflow: hidden;
`
S.Layout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45.4rem;
  height: 14.6rem;
  padding: 1rem 1rem 1rem 0.1rem;
  border: 1px solid var(--main-color1-1);
  border-radius: 1.5rem;
  cursor: pointer;
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
S.Country = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15rem;
  margin-bottom: 0.8rem;
`
S.CountryName = styled.span`
  font-weight: 600;
`
S.ContentDays = styled.div`
  margin-bottom: 1rem;
`
S.ContentConfirm = styled.p`
  color: var(--color-red);
`
S.DiaryBT = styled.button`
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

S.DeleteButton = styled.button`
  margin-bottom: 1rem;
  border: none;
  background: none;
  font-weight: 600;
  color: var(--main-color1);
  &:hover,
  &:focus {
    color: var(--color-red);
  }
`