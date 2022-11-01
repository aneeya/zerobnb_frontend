import { ChangeEvent } from "react"
import styled from "styled-components"

import logo from "../../assets/logo2.png"
import Button from "../common/Button"

interface Props {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
export default function PinedListMemo({onChange}: Props) {
  return (
    <>
      <S.Layout>
        <S.Logo src={logo} alt="zerobnb"/>
        <S.Form>
          <S.Text 
            rows="5" 
            cols="33" 
            defaultValue="마음에 드는 점을 간단하게 메모해 보세요😊"
            onChange={onChange}/>
        </S.Form>
        <S.ButtonDiv>
          <Button type="submit" text="확인"/>
          <Button type="button" text="취소"/>
        </S.ButtonDiv>
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
`

