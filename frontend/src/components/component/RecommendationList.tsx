import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState, MouseEvent } from "react"

import styled from "styled-components"

import { Diary } from "../../HostAPI/TravelMange_axios"
import DetailLayout from "../layout/DetailLayout"
import RecommendationDetail from "./RecommendationDetail"

interface Props {
  theme: string
}

const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

export default function RecommendationList({theme}: Props) {
  const [ recommends, setRecommends ] = useState<Diary[]| []>([])
  const query = useQueryClient()

  
  const clickDetailView = (id: string) => {
    const detail = document.querySelector(`.${id}`) as HTMLDivElement
    detail.style.display = 'block'
    console.log('hi')
  }
  const clickCancelView = (id: string) => {
    const detail = document.querySelector(`.${id}`) as HTMLDivElement
    detail.style.display = 'none'
  }

  useEffect(() => {
    const queryDatas = query.getQueryData(['@travelDiary', theme]) as Diary[]
    if(queryDatas !== null) setRecommends(queryDatas!)
  })

  return (
    <>
      {
        recommends.length !==  0
        ?
        recommends.map((list) => {
          const key = list.theme + list.name
          const name = list.name.replace(/\ /g, '')
          const nameId = name.replace(reg, '')
          return (
            <>
              <S.Detail className={nameId} >
                <DetailLayout render={<RecommendationDetail recommend={list} clickCancel={() => clickCancelView(nameId)}/>}/>
              </S.Detail>

              <S.Layout key={key} onClick={() => clickDetailView(nameId)}>
                <S.ImgArea>
                  <S.Img src={list.images[0]} alt={`${list.name}이미지`} />
                </S.ImgArea>
                <S.Content>
                  <S.Name>{list.name}</S.Name>
                  <S.Des>{list.description}</S.Des>
                </S.Content>
              </S.Layout>
            </>
        )})
      :
      null
      }
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  display: flex;
  align-items: center;
  width: 40rem;
  height: 10rem;
  margin-bottom: 2.2rem;
  padding: 1rem;
  padding-top: 2.5rem;
  cursor: pointer;
`

S.ImgArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  margin-right: 2rem;
  background: var(--color-gray0);
  border-radius: 50%;
  overflow: hidden;
`
S.Img = styled.img`
  width: 10rem;
  font-size: 1.4rem;
`

S.Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 30rem;
  height: 10rem;
  padding-top: 1rem; 
`
S.Name = styled.span`
  margin-bottom: 1.2rem;
  font-size: 2rem;
  font-weight: 600;
`
S.Des = styled.p`
  width: 100%;
  height: 4.5rem;
  line-height: 1.5;
  font-size: 1.4rem;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;   
`

S.Detail = styled.div`
  display: none
` 