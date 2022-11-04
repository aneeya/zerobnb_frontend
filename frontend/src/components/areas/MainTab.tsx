import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, MouseEvent, ReactElement, useEffect } from "react";
import styled from "styled-components";
import { getPinedList, getReservable, getStoredDates, ReservaionList } from "../../HostAPI/TravelMange_axios";
import PinedListTab from "../component/PinedListTab";
import ReservableTab from "../component/ReservableTab";

export default function MainTab() {
  const travelId = window.localStorage.getItem('travelId')

  if(travelId !== null) {
    useQuery(['@pined'], () => getPinedList(Number(travelId)))
  }

  const [ tab, setTab ] = useState<number | null>()

  const ulDom = document.querySelector('#tabList')

  const tabComponent = [ 
    <PinedListTab />,
    'hello', 
    <ReservableTab />, 
    'halo' ]
  
  const clickTab = (e: MouseEvent<HTMLLIElement>) => {
    if(travelId === null) alert('여행일정을 선택해 주세요!') // 애니메이션 컴포넌트 만들어보기
    else {const children = ulDom?.childNodes
    const target = e.target as HTMLLIElement
    const idx = Array.from(children!).indexOf(target)
    setTab(idx)
    }
  }

  return (
    <>
      <S.Nav>
        <S.Ul id='tabList'>
          <S.Li onClick={clickTab}>
            찜 리스트
          </S.Li >
          <S.Li onClick={clickTab}>
            일정 관리
          </S.Li> 
          <S.Li onClick={clickTab}>
            예약가능 숙소
          </S.Li>
          <S.Li onClick={clickTab}>
            후기 관리
          </S.Li>
        </S.Ul>
      </S.Nav>
      <S.Section>
        {tabComponent[tab!]}
      </S.Section>
    </>
  )
}

const S: any = {};

S.Nav = styled.nav`
  position: relative;
  width: 100%;
  height: 8rem;
  padding-top: 1.5rem;
  &::after {
    content: '';
    position: absolute;
    left: 40rem;
    bottom: 0;
    display: block;
    width: 110rem;
    height: 0.1rem;
    background: var(--main-color1);
  }
`
S.Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 95rem;
  margin: 0 auto;
  font-size: 1.7rem;
  color: var(--main-color1);
`
S.Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.6rem;
  height: 5rem;
  &:hover,
  &:focus {
    font-weight: bolder;
  } 
  &:active {
    background: var(--main-color1);
    color: var(--color-white);
    border-radius: 2rem;
  }
  cursor: pointer;
`
S.Section = styled.section`
  width: 90rem;
  margin: 0 auto;
  margin-top: 5rem;
`