import styled from "styled-components";

export default function MainTab() {
  return (
    <>
      <S.Nav>
        <S.Ul>
          <S.Li>
            찜 리스트
          </S.Li>
          <S.Li>
            일정 관리
          </S.Li>
          <S.Li>
            예약가능 숙소
          </S.Li>
          <S.Li>
            후기 관리
          </S.Li>
        </S.Ul>
      </S.Nav>
      <div></div>
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