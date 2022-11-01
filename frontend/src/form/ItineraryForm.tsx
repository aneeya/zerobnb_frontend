import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/common/Button"
import Calendar from "../components/common/Calendar"
import { getCountries } from "../HostAPI/CountryList_axios"
import { RegisterSchedule, Schedule } from "../HostAPI/TravelSchedule"
import ico from "../assets/icons/calendar.png"
const initValue = {
  email: window.localStorage.getItem('email')!,
  title: "",
  cost: "",
  country: "",
  startDate: "",
  endDate: "",
  nthOfPeople: "",
  postId: window.localStorage.getItem('key')
}
export default function ItineraryForm() {
  const [ schedule, setSchedule ] = useState(initValue) 
  const [ limitCost, setLimitCost ] = useState('')

  const nav = useNavigate()

  const isCalendar = document.querySelector('#calendar') as HTMLDivElement

  const { data, status } = useQuery(['@countries'], getCountries)
  if(status === 'error') alert('여행지 데이터를 가져오지 못했습니다')

  const changeValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSchedule({ ...schedule, [name]: value})
  }

  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    RegisterSchedule(schedule)
  }

  const startPickOpen = () => {
    isCalendar.style!.display = 'block'
  }

  const endPickOpen = () => {
    if(schedule.startDate === '') {
      alert('여행시작일을 먼저 선택해 주세요~')
      return
    }
    isCalendar.style!.display = 'block'
  }

  const pickData = (pickdate: string) => {
    const startDate = schedule.startDate.replace(/\-/g, '')
    const newDate = pickdate.replace(/\-/g, '')

    if(schedule.startDate === '' && schedule.endDate === '') {
      setSchedule({ ...schedule, startDate: pickdate })
    } else if(schedule.startDate !== '' && schedule.endDate === '') {
      if(Number(startDate) < Number(newDate)) {
        setSchedule({ ...schedule, endDate: pickdate })
      } else alert('여행시작일 보다 이전입니다')
    } else if(schedule.startDate !== '' && schedule.endDate !== '') {
      setSchedule({ ...schedule, startDate: pickdate, endDate: '' })
    }
    
    isCalendar.style!.display = 'none'
  }
  

//만약에 돔이 이곳에 document를 작성할경우, style값이 읽히지 않음 이벤트가 함수가 먼저 선언되고 dom이 그려짐
// 즉 해당 값이 읽이지 않음 if문을 통해 값이 존재할 경우에 이벤트를 호출해야함
 
  useEffect(() => {
    const reverse = schedule.cost.split('').reverse().join('').replace(/(.{3})/g,"$1,")
    let price = reverse.split('').reverse().join('')
    if(price.indexOf(',') === 0 ) price = price.substring(1)
    setLimitCost(price)
  }, [schedule.cost])

  return (
    <>
      <S.Form onSubmit={submitValue}>
        <S.LabelDiv>
          <S.Label>
            여행 주제
            <S.Input 
              type="text" 
              name="title"
              required
              onChange={changeValue}/>
          </S.Label>
          <S.Dates>
            <S.DateLabel>
              start Date
              <S.SelectDate>
                <S.DateButton role="button" id="date" src={ico} alt="여행 시작 날짜를 선택하세요" onClick={startPickOpen}/>
                <S.DateInput type="text" id="startDate" name="startDate" defaultValue={schedule.startDate}/>
              </S.SelectDate>  
            </S.DateLabel>
            <S.DateLabel>
              end Date
              <S.SelectDate>
                <S.DateButton role="button" id="date" src={ico} alt="여행 마지막 날짜를 선택하세요" onClick={endPickOpen}/>
                <S.DateInput type="text" id="endDate" name="endDate" defaultValue={schedule.endDate}/>
              </S.SelectDate>
              <S.Calendar id="calendar"><Calendar pickData={pickData}/></S.Calendar>
            </S.DateLabel>
          </S.Dates>
          <S.Label>
            여행지
            <S.SelectDiv>
              <S.Select as="select" name="country" required onChange={changeValue}>
                <S.Option as="option" selceted>여행지를 선택하세요!</S.Option>
                {data?.data.map((data: { code: string ; name: string }) => {
                  
                  return <S.Option as="option" key={data.code} value={data.name}>{data.name}</S.Option>
                  
                })}
              </S.Select>
              <S.Ico></S.Ico>
            </S.SelectDiv>
          </S.Label>
          <S.Label>
            숙박 예산(1박 기준)
            <S.Input
              type="range" 
              name="cost"
              min="0"
              max="1000000"
              required
              onChange={changeValue}/>
            <S.Cost>
              <span>0</span><span>{limitCost}원</span>
            </S.Cost>
          </S.Label>
          <S.Label>
            인원
            <S.Input
              theme="pointer"
              type="number" 
              name="nthOfPeople"
              defaultValue='0'
              min="1"
              max="10"
              onChange={changeValue}/>
          </S.Label>
        </S.LabelDiv>
        <S.ButtonDiv>
          <Button type="submit" text="등록" />
          <Button type="button" text="취소" onClick={() => nav('/')}/>
        </S.ButtonDiv>
      </S.Form>
    </>
  )
}

//style

const S: any = {}

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
S.LabelDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 12rem 12rem 12rem;
  width: 87.5rem;
  heigh: 50rem;
  margin-left: 8rem;
`
S.Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 600;
`
S.DateLabel = styled(S.Label)`
  position: relative;
`

S.Input = styled.input`
  width: 30rem;
  height: 5rem;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid var(--main-color1-1);
  border-radius: 1.5rem;
  cursor: ${(props) => props.theme ? `${props.theme}` : 'none'}
`
S.Dates = styled.div`
  display: flex;
  align-items: cneter;
`
S.SelectDate = styled.div`
  display: inline-flex;
  align-items: end;
  justiy-content: space-between;
  margin-top: 1.5rem;
  margin-right: 2rem;
`
S.DateInput = styled.input`
  width: 12rem;
  height: 3rem;
  padding-left: 1rem;
  border: 0;
  border-bottom: 1px solid var(--main-color1-1);
  font-size: 1.5rem;
  &::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
    appearance: none;
  }
`
S.DateButton = styled.img`
  width: 1.6rem;
  margin-right: 0.8rem;
  cursor: pointer;
`
S.Calendar = styled.div`
  display: none;
  position: absolute;
  top: 3rem;
  left: -0.8rem;
  z-index: 10;
  width: 33rem;
  height: 34rem;
`
S.Cost = styled.div`
  display: flex;
  width:30rem;
  justify-content: space-between;
  font-size: 1.8rem;
  color: var(--main-color1-1);
`
S.SelectDiv = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0);
`
S.Select = styled(S.Input)`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  z-index: 3;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
`
S.Ico = styled.span`
  position: absolute;
  bottom: 2rem;
  left: 26.5rem;
  display: block;
  width: 1.3rem;
  height: 1.3rem;
  background: var(--color-gray1);
  clip-path: polygon(0 0, 100% 0, 50% 80%);
`

S.Option = styled(S.Input)`
`

S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 16.5rem;
  margin-top: 5rem;
`