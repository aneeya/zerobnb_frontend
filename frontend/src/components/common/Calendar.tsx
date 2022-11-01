import { useState, MouseEvent, useEffect } from "react"
import styled from "styled-components"

interface Props {
  pickData: (pickdate: string) => void
}

export default function Calendar({ pickData }: Props) {
  console.log('안뇽 저는 달력 컴포너트 입니다')
  const days = [
    {day: '일', key: 'dlf'},
    {day: '월', key: 'dnjf'},
    {day: '화', key: 'ghk'},
    {day: '수', key: 'tn'},
    {day: '목', key: 'ahr'},
    {day: '금', key: 'rna'},
    {day: '토', key: 'xh'},
  ]
  const daySpot = new Date()
  const nowDate = {
    year: daySpot.getFullYear(),
    month: daySpot.getMonth() + 1,
    date: daySpot.getDate()
  }
  const renderDates = (count: number, day: number) => {
    const dateArray = []
    for(let i = 1; i <= count + day; i++) {
      if(i <= day) dateArray.push({dateNum: 0, key: `key${i}`})
      else dateArray.push({dateNum: i - day, key: `key${i}`})
    }
    return dateArray
  }
  const setDate = (year: number, month: number) => {
    const getLastDate = new Date(Date.UTC(year, month, 0))
    const lastDate = getLastDate.getDate()
    
    const getFisrtDay = new Date(Date.UTC(year, month - 1, 1))
    const firstDay = getFisrtDay.getDay()
     
    return {lastDate, firstDay}
  }

  const initSet = setDate(nowDate.year, nowDate.month)
  const initDates = renderDates(initSet.lastDate, initSet.firstDay)

  const [ year, setYear ] = useState(nowDate.year)
  const [ month, setMonth ] = useState(nowDate.month)
  const [ dates, setDates ] = useState(initDates)
  
  const clickValues = {
    clickPrevMonth: () => {
      if(month === 1) setYear(year - 1)
      const monthValue = ((month - 1) % 12 === 0) ? 12 : (month - 1) % 12
      setMonth(monthValue)
    },
    clickNextMonth: () => {
      if(month === 12) setYear(year + 1)
      const monthValue = ((month + 1) % 12 === 0) ? 12 : (month + 1) % 12
      setMonth(monthValue)
    },
    clickPrevYear: () => {
      setYear(year - 1)
      setMonth(12)
    },
    clickNextPYear: () => {
      setYear(year + 1)
      setMonth(1)
    }
  }
  
  const clickDate = (e: MouseEvent<HTMLSpanElement>) => {
    let date = e.currentTarget.innerText
    if(date.length === 1) date = `0${date}`
    const pickdate = `${year}-${month}-${date}`
    pickData(pickdate)
  }

  useEffect(() => {
    const changeSet = setDate(year, month)
    const chageDates = renderDates(changeSet.lastDate, changeSet.firstDay)
    setDates(chageDates)
  }, [year, month])

  return (
    <>
      <S.Layout>
        <S.YearDiv>
          <S.PrevYear type="button" aria-label="이전연도" onClick={clickValues.clickPrevYear}></S.PrevYear>
          <S.Year>{year}</S.Year>
          <S.NextYear type="button" aria-label="다음연도" onClick={clickValues.clickNextPYear}></S.NextYear>
        </S.YearDiv>
        <S.MonthDiv>
          <S.PrevMonth type="button" aria-label="이전달" onClick={clickValues.clickPrevMonth}></S.PrevMonth>
          <S.Month>{month}</S.Month>
          <S.NextMonth type="button" aria-label="다음달" onClick={clickValues.clickNextMonth}></S.NextMonth>
        </S.MonthDiv>
        <S.DatesDiv>
          {days.map(({day, key}) => {
            if(day === '일') return <S.Day key={key} color='#ff9d76'>{day}</S.Day>
            if(day === '토') return <S.Day key={key} color='var(--main-color1)'>{day}</S.Day>
            return <S.Day key={key}>{day}</S.Day>
          })}
          {dates.map(({dateNum, key}) => {
            if(dateNum === 0) return <S.Date key={key}></S.Date>
            else return <S.Date key={key} onClick={clickDate}>{dateNum}</S.Date>
          })}
        </S.DatesDiv>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  width: 33rem;
  height: 34rem;
  background: var(--color-white);
  border: 1px solid var(--main-color1-1);
  border-radius: 2rem;
  box-shadow: 1.5px 1.5px var(--main-color1);
`
S.YearDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 23rem;
  margin: 0 auto;
  margin-top: 1rem;
`
S.PrevYear = styled.button`
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  background: var(--main-color1-1);
  clip-path: polygon(20% 50%, 80% 10%, 80% 84%);
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0rem;
    Prev: 0.05rem;
    width: 1.2rem;
    height: 1.2rem;
    background: #ffda99;
    clip-path: polygon(20% 50%, 80% 10%, 80% 84%);
  }
`
S.NextYear = styled(S.PrevYear)`
  &::after {
    background: var(--main-color1);
  }
  transform: rotate(180deg)
`
S.Year = styled.span`
  font-size: 1.6rem;
`

S.MonthDiv = styled(S.YearDiv)`
  width: 15rem;
  margin-top: 2rem;
`
S.PrevMonth = styled(S.PrevYear)`
  width: 1.4rem;
  height: 1.4rem;
  &::after {
    width: 1rem;
    height: 1rem;
  }
`
S.NextMonth = styled(S.NextYear)`
  width: 1.4rem;
  height: 1.4rem;
  &::after {
    width: 1rem;
    height: 1rem;
  }
`
S.Month = styled.span`
  font-size: 1.4rem;
`

S.DatesDiv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 3.3rem;
  grid-auto-rows: 3rem;
  align-items: center;
  justify-items: center;
  width: 27rem;
  height: 22.5rem;
  margin: 0 auto;
  margin-top: 2rem;
  background: var(--main-color1);
  border: 1px solid var(--main-color1-1);
  border-radius: 1.5rem;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 26.5rem;
    height: 22rem;
    background: var(--color-white);
    border-radius: 1.2rem;

  }
`
S.Date = styled.span`
  position: relative;
  z-index: 5;
  font-size: 1.4rem;
  font-weight: 400;
  align-items: center;
  cursor: pointer;
  &:active {
    width: 3rem;
    heith: 3rem;
    background: var(--main-color1);
    border-radius: 50%;
  }
`
S.Day = styled(S.Date)`
  font-weight: 700;
  color: ${(props) => props.color? `${props.color};` : null}
`