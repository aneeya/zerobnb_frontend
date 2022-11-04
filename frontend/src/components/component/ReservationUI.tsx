import { ChangeEvent, MouseEvent, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { queryReserve, Reserve } from "../../HostAPI/TravelMange_axios"
import Button from "../common/Button"

interface Props {
  data: any
  room: Reserve
}

interface Action {
  type: string,
  payLoad: string
}



export default function ReservationUI({data, room}: Props) {
  const travelId = window.localStorage.getItem('travelId')
  const nav = useNavigate()
  
  const period = getPeriod(data.startDate, data.endDate)
  const initReserve = {
    ...room,
    checkIn: '',
    checkOut: '',
    total: '0원'
  }
  
  const reserveReducer = (state: Reserve, action: Action) => {
    switch(action.type) {
      case 'checkIn':
        return { ...state, checkIn: action.payLoad }
      case 'checkOut':
        const cost =  getCost(room.price, state.checkIn!, action.payLoad)
        return { ...state, checkOut: action.payLoad, total: cost}
      case 'initTotal':
        return { ...state, total: action.payLoad}
      default:
        return { ...state }
    }
  }

  const [ reserve, dispatch ] = useReducer(reserveReducer, initReserve)
  const [ nth, setNth ] = useState(0)

  const changeDate = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: e.target.name, payLoad: e.target.value})
  }

  const postData = { 
    ...room, 
    checkIn: reserve.checkIn, 
    checkOut: reserve.checkOut, 
    total: reserve.total,
  }
  const mutation = queryReserve(postData, travelId!)

  const clickNth = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if(target.id === 'minus' && nth > 1) setNth(nth - 1)
    else if(target.id === 'plus' && nth < room.nthOfPeople) setNth(nth + 1)
    else if(target.id === 'plus' && nth >= room.nthOfPeople) alert('예약가능 인원수를 초과하였습니다')
  }

  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate()
    if(!mutation.isSuccess) {
      alert('예약이 완료되었습니다')
      // nav('/')
    }
  }
 

  return (
    <>
      <S.Rayout>
        <S.SubLayout>
          <S.Form onSubmit={submitValue}>
            <div>
              <S.Rpan>예약일</S.Rpan>
              <S.Rdiv>
                <S.Rlabel>
                  체크인:
                  <S.Select name="checkIn" onChange={changeDate} required>
                    <option style={{color: 'var(--color-gray0)'}}>선택하세요</option>
                    {period!.map((date, idx) => {
                      const key = date + idx
                      return <option key={key} value={date}>{date}</option>
                    })}
                  </S.Select>
                </S.Rlabel>
                <S.Rlabel>
                  체크아웃:
                  <S.Select name="checkOut" onChange={changeDate} required>
                    <option style={{color: 'var(--color-gray0)'}}>선택하세요</option>
                    {period!.map((date, idx) => {
                      const key = date + idx
                      return <option key={key} value={date}>{date}</option>
                    })}
                  </S.Select>
                </S.Rlabel>
              </S.Rdiv>
              <S.Nabel>
                인원
                <S.Ndiv>
                    <S.NthChange id="minus" type="button" onClick={clickNth}>-</S.NthChange>
                    <S.Nth>{nth}</S.Nth>
                    <S.NthChange id="plus" type="button" onClick={clickNth}>+</S.NthChange>
                </S.Ndiv>
              </S.Nabel>
              <S.Total>
                <S.Tpan>총요금</S.Tpan>
                <S.Result>{reserve.total}</S.Result>
              </S.Total>
            </div>
            <S.ButtonDiv>
              <Button type="submit" text="예약"/>
              <Button type="button" text="취소" onClick={() => nav('/')}/>
            </S.ButtonDiv>
          </S.Form>
        </S.SubLayout>
      </S.Rayout>
    </>
  )
}

//style

const S: any = {}

S.Rayout = styled.div`
  width: 35rem;
  height: 46rem;
`
S.SubLayout = styled.div`
  position: fixed;
  top: 52rem;
  width: 35rem;
  height: 38rem;
  border: 1px solid var(--main-color1-1);
  border-radius: 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
`

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32rem;
  height: 38rem;
  margin: 0 auto;
`

S.Rpan = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
`
S.Rdiv = styled.div`
  display: flex;
  flex-direction: column;
  algin-items: start;
  margin-left: 1rem;
  margin-top: 1.5rem;
`
S.Rlabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 22rem;
`
S.Select = styled.select`
  width: 12rem;
  height: 1.8rem;
  border: none;
  background: none;
`
S.Option = styled.option`
`

S.Nabel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
  margin-top: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  &::after {
    content: '';
    dispaly: block;
    position: absolute;
    bottom: -2rem;
    right: -1rem;
    width: 23rem;
    height: 0.1rem;
    background: var(--color-gray0);
  }
`
S.Ndiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
`
S.Nth = styled.span`
  font-weight: 200;
  font-size: 1.6rem;
`
S.NthChange = styled.button`
  dispaly: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  background: var(--color-white);
  border: 1px solid var(--color-gray0);
  border-radius: 50%;
  text-align: center
`
S.Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
  margin-top: 5rem;
`
S.Tpan = styled.span`
  font-size: 2rem;
  font-weight: 600;
`
S.Result = styled.span`

`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 16.5rem;
  margin-top: 5rem;
`


const getPeriod = (startD: string, endD: string) => {
  const start = new Date(startD)
  const startYear = start.getFullYear()
  const startMonth = start.getMonth() + 1
  const startDate = start.getDate() 
  
  const getNext = new Date(startYear, startMonth, 0)
  const startLastDate = getNext.getDate()

  const end = new Date(endD)
  const endMonth = end.getMonth() + 1
  const endDate = end.getDate()

  let period = []
  let count 
  
  if (startMonth === endMonth) count = endDate
  else count = startLastDate + endDate

  for(let i = startDate; i <= count; i++) {
    let date;
    if(i > startLastDate) date = `${startYear}-${endMonth}-${i - startLastDate}`
    else if (i > startLastDate && endMonth < startMonth) date = `${startYear + 1}-${endMonth}-${i - startLastDate}`
    else  date = `${startYear}-${startMonth}-${i}`
      period.push(date)
  }

    return period
}

const getCost = (num: string, start: string, end: string) => {
  const ckout = new Date(end) as unknown as number
  const ckin = new Date(start) as unknown as number
  const subDate = ckout - ckin

  const days = Math.floor(subDate / (1000 * 60 * 60 * 24))
  const value = Math.floor(Number(num) * days)
  
  const cost = String(value).split('').reverse().join('').replace(/(.{3})/g,"$1,")
  let price = cost.split('').reverse().join('')
    if(price.indexOf(',') === 0 ) price = price.substring(1)

  return  `${price}원`
}

