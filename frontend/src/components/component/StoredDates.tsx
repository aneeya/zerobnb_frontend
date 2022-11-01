import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { getStoredDates, Travel } from "../../HostAPI/TravelMange_axios"
import Button from "../common/Button"

import logo from "../../assets/logo2.png"
import spring from "../../assets/icons/spring.png"
import React from "react"

interface Props {
  onClick: () => void
}

export default function StoredDates({onClick}: Props) {
  const [ select, setSelect ] = useState<number | null>(null)
  const { data } = useQuery(['@itinerary'], () => getStoredDates (), {
    onError: (e: any) => {
			alert(`${e.message}저장된 날짜들을 로드하지 못했습니다 ㅠㅠ`)
		}
  }) 
  
  
  const changeValue= (id: number, startDate: string, country: string) => {
    window.localStorage.setItem('country', country)
    window.localStorage.setItem('travelId', String(id))
    window.localStorage.setItem('startDate', startDate)
    setSelect(id)
  }
    
  const submintValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    onClick()
    window.location.reload()
  }

  return (
    <>
      <S.Layout>
        <S.Spring></S.Spring>
        <S.DateList>
          <S.Logo src={logo} alt="zerobnb"/>
          <S.Form onSubmit={submintValue}>
            <S.SelectDiv>
              {data?.data.map(({title, startDate, endDate, country, id}: Travel) => {
                const key = title + id
                return (
                  <>
                    <S.Label key={key}>
                      <S.Input type="radio" onChange={() => changeValue(id, startDate, country)}/>
                      <S.Title>{title}</S.Title>
                      <S.Date>{startDate} ~ {endDate}</S.Date>
                    </S.Label>
                  </>
                )
              })}
            </S.SelectDiv>
            <S.ButtonDiv>
              <Button type="submit" text="확인"/>
              <Button type="button" text="취소" onClick={onClick}/>
            </S.ButtonDiv>
          </S.Form>
        </S.DateList>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  width: 42rem;
`
S.Spring = styled.div`
  width: 40rem;
  height: 2.5rem;
  margin: 0 auto;
  margin-top: -1rem;
  background: url(${spring}) 0.5rem /4rem repeat-x;
`
S.DateList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`
S.Logo = styled.img`
  width: 15rem;
  margin-bottom: 3rem;
`
S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
S.SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 35rem;
  height: 28rem;
  margin-bottom: 2.5rem;
  overflow: auto;
  
`
S.Label = styled.label`
  display: flex;
  align-items: center;
  margin-left: 1.8rem;
  margin-bottom: 1.8rem;
`
S.Input = styled.input`
  margin-right: 1rem;
`
S.Title = styled.span`
  margin-right: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--main-color1);
`
S.Date = styled.span`
  font-size: 1.4rem;
  color: var(--main-color1-1);
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
`