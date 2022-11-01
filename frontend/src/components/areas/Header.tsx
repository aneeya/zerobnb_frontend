import { ReactNode, useEffect, useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import styled from "styled-components"

import logo from "../../assets/logo.png"
import LoginForm from "../../form/LoginForm"

export interface Active {
  active: boolean
}

export default function Header({active}: Active) {
  const [ openLogin, setOpenLogin ] = useState(false)
  const [ userName, setUserName ] = useState('')
  const nav = useNavigate()

  const logout = () => {
    const key = window.localStorage.getItem('key')
    window.localStorage.clear()
    window.location.replace('http://localhost:3000')
  }

  useEffect(() => {
    if(active) {
      const name = window.localStorage.getItem('name')
      setUserName(name!)
    } 
    return
  }, [active])

  return (
    <>
      <S.Header>
        <S.Div>
          <div>
            <S.Home src={logo} alt="홈으로가기" role="button" onClick={() => nav('/')}/>
          </div>
          <S.LoginDiv>
            {active 
              ? 
              <>
                <S.Greet><b>{userName}</b>님 반갑습니다!</S.Greet>
                <S.Span aria-hidden="true">|</S.Span>
                <S.Button type="button" onClick={() => logout()}>로그아웃</S.Button>
              </>
              :
              <>
                <S.Button type="button" onClick={() => setOpenLogin(true)}>로그인</S.Button>
                <S.Span aria-hidden="true">|</S.Span>
                <S.Button type="button" onClick={() => nav('/join')}>회원가입</S.Button>
                {openLogin && 
                <S.FormDiv>
                  <LoginForm 
                    onClick={() => setOpenLogin(false)}/>
                </S.FormDiv>}
              </>}
          </S.LoginDiv>
        </S.Div>
      </S.Header>
      <Outlet/>
    </>
  )
}


//style

const S: any = {}

S.Header = styled.header`
  width: 100%;
  height: 8rem;
`
S.Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150rem;
  height: 8rem;
  margin: 0 auto;
`
S.Home = styled.img`
  width: 16.8rem;
  cursor: pointer;
`
S.Button = styled.button`
  margin-left: 1.2rem;
  background: none;
  border: none;
  color: var(--main-color1-1);
  font-family: var(--font-family);
`
S.Span = styled.span`
  margin-left: 1.2rem;
  color: var(--main-color1-1);
  font-family: var(--font-family);
`

S.LoginDiv = styled.div`
  position: relative;
`
S.FormDiv = styled.div`
  position: absolute;
  right: -1rem;
  top: 6rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.7rem;
  height: 28rem;
  background: var(--color-white);
  border: 1px solid var(--main-color1-1);
  border-radius: 3rem;
`
S.Greet = styled.span`
`