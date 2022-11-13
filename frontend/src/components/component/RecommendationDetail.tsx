
import styled from "styled-components"
import { useState, MouseEvent } from "react"

import { Diary } from "../../HostAPI/TravelMange_axios"
import logo from "../../assets/logo2.png"

interface Props {
  recommend: Diary,
  clickCancel: () => void
}

export default function RecommendationDetail({recommend, clickCancel}: Props) {
  const [ order, setOrder ] = useState(0)
  const count = recommend.images.length - 1

  const clickOrder = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if(target.id === 'prev' && order > 0) setOrder(order - 1)
    else if(target.id === 'next' && order < count) setOrder(order + 1)
  }

  return (
    <>
      <S.Layout>
        <S.CancelBT type="button" onClick={clickCancel}>X</S.CancelBT>
        <S.ImgArea>
          <S.PrevBT type="button" id="prev" onClick={clickOrder}>{'<'}</S.PrevBT>
          <S.NextBT type="button" id="next" onClick={clickOrder}>{'>'}</S.NextBT>
          <S.Carousel id={order}>
            {recommend.images.map( (img)=> {
              const key = img
              return <S.Img key={key} theme={img} role="img" aria-label={`${recommend.name}이미지`}/>
            })}
          </S.Carousel>
        </S.ImgArea>
        <S.ContentArea>
          <S.ContentName>{recommend.name}</S.ContentName>
          <S.ContentInfo>
            <div>
              <S.LinkSpan>링크</S.LinkSpan>
              <S.Link href={recommend.url}>{recommend.url}</S.Link>
            </div>
            <S.Des>
              {recommend.description}
            </S.Des>
          </S.ContentInfo>
        </S.ContentArea>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

S.CancelBT = styled.button`
  position: absolute;
  top: 2rem;
  right: 2.2rem;
  background: none;
  border: none;
  outline: none;
  font-size: 2.5rem;
  color: var(--color-gray2);
`


S.ImgArea = styled.div`
  position: relative;
  width: 90rem;
  height: 44rem;
  margin-top: 5rem;
  background: url(${logo}) center / 20rem no-repeat;
  background-color: #fff6d9;
  border: 1px solid var(--main-color1-1);
  overflow: hidden;
`
S.PrevBT = styled.button`
  position: absolute;
  top: 50%;
  left: 3%;
  z-index: 5;
  width: 4.8rem;
  height: 4.8rem;
  padding-right: 0.3rem;
  background: none;
  border: 1px solid var(--color-gray0);
  border-radius: 50%;
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-gray2);
`
S.NextBT = styled(S.PrevBT)`
  position: absolute;
  top: 50%;
  left: 92%;
  padding-right: 0;
  padding-left: 0.3rem;
`
S.Carousel = styled.div`
  display: flex;
  transform: ${(prop) => `translateX(-${Number(prop.id) * 90}rem);`}
  transition: transform 0.5s linear;
`
S.Img = styled.div`
  flex-shrink: 0;
  width: 90rem;
  height: 45rem;
  background: ${(prop) =>  `url(${prop.theme}) center / 90rem no-repeat;`}
`

S.ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 90rem;
  height: 16rem;
  margin-top: 1.5rem;
`
S.ContentName = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`
S.ContentInfo = styled.div`
  margin-top: 1.2rem;
  font-size: 1.4rem;
`
S.LinkSpan = styled.span`
  margin-right: 2rem;
  padding-left: 1rem;
`
S.Link = styled.a`
  color: var(--main-color1);
`
S.Des = styled.p`
  width: 90rem;
  height: 10rem;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
  color: var(--color-gray3);
  background: #f4f4f4;
`