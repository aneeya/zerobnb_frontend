import { ReactElement } from "react";
import styled from "styled-components";

import logo from "../../assets/logo2.png"

interface Props {
  title: string,
  render: ReactElement
}

export default function FormLayout({title, render}: Props) {
  return (
    <>
      <S.Back>
        <S.Logo src={logo} alt="zerobnb"/>
        <S.Layout>
          <S.H2>{title}</S.H2>
          <S.RDiv>{render}</S.RDiv>
        </S.Layout>
      </S.Back>
    </>
  )
}

const S: any = {};

S.Back = styled.div`
  width: 100%;
  height: 85rem;
  padding-top: 8rem;
  background: var(--main-color1-1);
  overflow: hidden;
`
S.Logo = styled.img`
  display: block;
  width: 25.5rem;
  margin: 0 auto;
  margin-bottom: 6.9rem;
`
S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rem;
  height: 65rem;
  margin: 0 auto;
  padding-top: 5.5rem;
  background: var(--color-white);
  border-top-left-radius: 6rem;
  border-top-right-radius: 6rem;
  border-right: 8px solid var(--main-color1);
`
S.H2 = styled.h2`
  font-size: 2.8rem;
  font-weight: 600;
`
S.RDiv = styled.div`
  margin-top: 6rem;
`