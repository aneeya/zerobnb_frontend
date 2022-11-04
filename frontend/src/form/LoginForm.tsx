import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { Login, useLogin } from "../HostAPI/LoginAndJoin_axios";

interface Props {
  onClick: () => void
}

export default function LoginForm({onClick}: Props) {
  const [ login, setLogin ] = useState({email: "", password: ""})
  const{ data } = useLogin() 
  
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const submitValue = async(e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = data?.data.filter((user: Login) => {
        return user.email === login.email && user.password === login.password})
      
    if(result !== null) {
      window.localStorage.setItem('key', result[0].id)
      window.localStorage.setItem('email', result[0].email)
      window.localStorage.setItem('name', result[0].name)
      window.location.replace('http://localhost:3000/')
      
    }
    else alert('이메일 및 패스워드가 확인되지 않습니다 다시 입력해주세요!')
    
  }

  
  return (
    <>
      <S.Form onSubmit={submitValue}>
        <div>
          <S.Label>
            이메일
            <S.Input type="email" name="email" required onChange={changeValue}/>
          </S.Label>
          <S.Label>
            비밀번호
            <S.Input type="password" name="password" required onChange={changeValue}/>
          </S.Label>
        </div>
        <S.ButtonDiv>
          <Button type="submit" text="확인" />
          <Button type="button" text="취소" onClick={onClick}/>
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
  margin: 0 auto;
`
S.Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`
S.Input = styled.input`
  width: 25rem;
  height: 4rem;
  margin-top: 1rem;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid var(--color-gray1);
  font-size: 1.6rem;
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 16.5rem;
  margin-top: 1rem;
`