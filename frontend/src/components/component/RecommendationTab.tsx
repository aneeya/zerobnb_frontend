import { useState, MouseEvent } from "react"
import styled from "styled-components"
import { useRecommendations } from "../../HostAPI/Recommendation_axios"
import { useDiaryList } from "../../HostAPI/TravelMange_axios"
import RecommendationList from "./RecommendationList"

interface Props {
  id: number  
}

export default function RecommendationTab({id}: Props) {
  useDiaryList(id)

  const [ theme, setTheme ] = useState('')

  const clickTheme = (e: MouseEvent<HTMLLIElement>) => {
    const prevTarget = theme !== '' ? document.querySelector(`#${theme}`) as HTMLLIElement : ''
    const target = e.target as HTMLLIElement
    if(prevTarget!== '' && prevTarget.innerText !== target.innerText) {
      prevTarget.style.color = 'inherit'
      prevTarget.style.fontWeight = 'inherit'
    }
    setTheme(target.innerText)
    target.style.color = 'var(--main-color1)'
    target.style.fontWeight = '600'
  }

  return (
    <>
      <S.Layout>
        <S.RecomdTitle>숙소 근처 여행지</S.RecomdTitle>
        <S.RecomdUl>
          <S.RecomdLi id="맛집" onClick={clickTheme}>맛집</S.RecomdLi>
          <S.RecomdLi id="카페" onClick={clickTheme}>카페</S.RecomdLi>
          <S.RecomdLi id="문화" onClick={clickTheme}>문화</S.RecomdLi>
          <S.RecomdLi id="행사" onClick={clickTheme}>행사</S.RecomdLi>
          <S.RecomdLi id="기타" onClick={clickTheme}>기타</S.RecomdLi>
        </S.RecomdUl>
        <S.RecomdContent>
          {theme !== '' && <RecommendationList theme={theme}/>}
        </S.RecomdContent>
      </S.Layout>
    </>
  )
} 

//style

const S: any = {}


S.Layout = styled.div`
  width: 45rem;
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-gray0);
`
S.RecomdTitle = styled.h3`
  margin-bottom: 2.2rem;
  font-size: 2rem;
  font-weight: 600;
`
S.RecomdUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40rem;
  height: 5rem;
`
S.RecomdLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 3rem;
  cursor: pointer;
  &:hover,
  &:focus {
    color: var(--main-color1);
    font-weight: 600;
  }
`

S.RecomdContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 45rem;
  margin-top: 2rem;
`