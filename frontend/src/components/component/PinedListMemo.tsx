import { ChangeEvent, useState } from "react"
import styled from "styled-components"

import logo from "../../assets/logo2.png"
import { Room, useAddPinedList } from "../../HostAPI/TravelMange_axios"
import Button from "../common/Button"

interface Props {
  data: Room,
  clickMemo: () => void
}
export default function PinedListMemo({data, clickMemo}: Props) {
  const travelId = window.localStorage.getItem('travelId')
  const [ pinedData, setPinedData ] = useState(data)

  const addMutation = useAddPinedList(Number(travelId), pinedData)

  const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let timer;
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      const newData = { ...pinedData, memo: e.target.value }
      setPinedData(newData)
    }, 500)
  }
  
  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('hi')
    addMutation.mutate()
    if(!addMutation.isSuccess) {
      clickMemo()
    }
  }

  return (
    <>
      <S.Layout>
        <S.Logo src={logo} alt="zerobnb"/>
        <S.Form onSubmit={submitValue}>
          <S.Text 
            rows="5" 
            cols="33" 
            defaultValue="마음에 드는 점을 간단하게 메모해 보세요😊"
            onChange={changeValue}/>
        <S.ButtonDiv>
          <Button type="submit" text="확인"/>
          <Button type="button" text="취소" onClick={clickMemo}/>
        </S.ButtonDiv>
        </S.Form>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`
S.Logo = styled.img`
  width: 15rem;
  margin-bottom: 4rem;
`
S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
S.Text = styled.textarea`
  width: 25rem;
  height: 17rem;
  margin-bottom: 1.8rem;
  padding: 1.5rem;
  resize: none;
  border-radius: 1.2rem;
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
  margin-top: 1rem;
`

