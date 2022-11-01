import { ReactElement } from "react"
import styled from "styled-components"

interface Props {
  render?: ReactElement
}

export default function PopupLayout({render}: Props) {
  return (
    <>
      <S.Background>
        <S.Layout>
          {render!}
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
  width: 42rem;
	height: 48rem;
	border-radius: 2.5rem;
	background: var(--color-white);
`