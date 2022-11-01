import styled from "styled-components"
import Button from "../common/Button"

import logo from "../../assets/logo2.png"

interface Props {
  message: string,
  confirm: () => void,
  cancel: () => void
}
export default function ConfirmLayout({message, confirm, cancel}: Props) {
  return (
    <>
      <S.Background>
          <S.Layout>
            <S.Logo src={logo} alt="zerobnb" />
            <S.Messge>{message}</S.Messge>
            <S.ButtonDiv>
              <Button type="button" text="확인" onClick={confirm}/>
              <Button type="button" text="취소" onClick={cancel}/>
            </S.ButtonDiv>
          </S.Layout>
        </S.Background>
    </>
  )
}

//style

const S: any = {}

S.Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .75);
  overflow: hidden;
`
S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 42rem;
	height: 30rem;
	border-radius: 2.5rem;
	background: var(--color-white);
`
S.Logo = styled.img`
  width: 15rem;
`
S.Messge = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
`