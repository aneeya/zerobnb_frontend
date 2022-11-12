import { useEffect, useState } from "react"
import styled from "styled-components"
import dday from "../../assets/icons/dday3.png"

export default function DdayNotice() {
  const startDate = window.localStorage.getItem('startDate')
  const endDate = window.localStorage.getItem('endDate')

  const getToday = new Date().toISOString() 
  
  const selectedDate = new Date(startDate!) as unknown as number
  const selectedEnd = new Date(endDate!) as unknown as number
  const todayDate = new Date(getToday) as unknown as number

  const subDate = selectedDate - todayDate
  const diffDate = selectedEnd - todayDate
  
  const dDay = subDate >= 0 
                ? Math.floor(subDate / (1000 * 60 * 60 * 24))
                : Math.ceil(subDate / (1000 * 60 * 60 * 24))
  const ended = diffDate >= 0 
                ? Math.floor(diffDate / (1000 * 60 * 60 * 24))
                : Math.ceil(diffDate / (1000 * 60 * 60 * 24))
                
  window.localStorage.setItem('ended', String(ended))

  return (
    <>
      <S.Layout>
        <S.Dday>
          <S.Img src={dday} alt="디데이"/>
          <S.Date>{dDay}</S.Date>
        </S.Dday>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  position: absolute;
  bottom: -0.3rem;
  right: 25rem;
  width: 25rem;
`
S.Dday = styled.div`
  position: relative;
  width: 15rem;
`
S.Img = styled.img`
  width: 18rem;
  
`
S.Date = styled.div`
  position: absolute;
  top: 2rem;
  right: -6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  background: var(--color-red);
  border-radius: 50%;
  font-size: 3.2rem;
  font-weight: 600;
  color: var(--color-white);
`