import { ChangeEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { deletePinedRoom, Room, useEditMemo } from "../../HostAPI/TravelMange_axios"

import haus from "../../assets/haus.png"
import pined from "../../assets/icons/pin2.png"
import ConfirmLayout from "../layout/ConfirmLayout"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

interface Props {
  list: Room
  clickUpdate: (id: number) => void
}

export default function PinedListBox({list, clickUpdate}: Props) {
  const ended = window.localStorage.getItem('ended')

  const [ memo, setMemo ] = useState(false)
  const [ edit, setEdit ] = useState(false)
  const [ content, setContent ] = useState('')
  const nav = useNavigate()

  const queryClient = useQueryClient()
  const subMutation = useMutation(() => deletePinedRoom(Number(list.id)), {
    onSuccess: () => {
      queryClient.invalidateQueries(['@pined'])
    },
    
  })

  if(Number(ended) < 0) subMutation.mutate()

  const editMutation = useEditMemo(Number(list.id), content)
  
  const clickConfirm = () => {
    const cofirmDom = document.querySelector('#confirm') as HTMLDivElement
    cofirmDom.style.display = 'block'
  }
  
  const clickUpdates = () => {
    subMutation.mutate()

    clickUpdate(Number(list.id))

    const cofirmDom = document.querySelector('#confirm') as HTMLDivElement
    cofirmDom.style.display = 'none'
  }

  const clickCancel = () => {
    const cofirmDom = document.querySelector('#confirm') as HTMLDivElement
    cofirmDom.style.display = 'none'
  }

  const changMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let timer;
    if(timer) clearTimeout(timer)
    else timer = setTimeout(() => {
      setContent(e.target.value)
    },800)
  }

  const submitEditMemo = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    editMutation.mutate()
    if(editMutation.isSuccess) {
      alert('수정되었습니다')
      setEdit(false)
      const target = document.querySelector('#memo') as HTMLDivElement
      target.innerText = content
    }
  }

  console.log(queryClient.getQueryData(['@pined']))
  return (
    <>
    <R.Confirm id="confirm">
      <ConfirmLayout message="정말로 삭제하시겠습니까??" confirm={clickUpdates} cancel={clickCancel}/></R.Confirm>
    <R.Rayout>
      <R.Img></R.Img>
      <R.Content>
        <R.Pin role="button" aria-label="저장핀"  onClick={clickConfirm}/>
        <R.H3>{list.name}</R.H3>
        <R.Des>{list.description}</R.Des>
        <R.Button type="button" onClick={() => nav(String(list.id))}>상세보기</R.Button>
      </R.Content>
    </R.Rayout>
    <R.Memo>
      <R.MemoButton onClick={() => setMemo(!memo)}>{memo? 'CLOSE' : 'MEMO'}</R.MemoButton>
      {
        memo &&
          <S.MemoDiv>
            <S.Memo id="memo">{list.memo !== undefined ? list.memo : '아직 메모한 내용이 없습니다😊'}</S.Memo>
            <S.Button type="button" onClick={() => setEdit(true)}>편집</S.Button>
            {
              edit &&
              <S.EditForm as="form" onSubmit={submitEditMemo}>
                <S.Edit 
                  as='textarea' 
                  name="memo" 
                  placeholder={list.memo !== undefined ? list.memo : '마음에 드는 점을 간단하게 메모해 보세요😊'}
                  onChange={changMemo}/>
                <S.Button type="submit" >완료</S.Button>
                <S.Button type="button" onClick={() => setEdit(false)}>취소</S.Button>
              </S.EditForm>
      }
          </S.MemoDiv>
      }
      
    </R.Memo>
    </>
  )
}

//style

const R: any = {}

R.Rayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80rem;
  height: 20rem;
`
R.Img = styled.div`
  width: 30rem;
  height: 18rem;
  margin-right: 2rem;
  background: var(--main-color1-1) url(${haus}) center / 15rem no-repeat;
  border-radius: 1.2rem;
`
R.Content = styled.div`
  position: relative;
  width: 45rem;
  height: 18rem;
  padding: 1rem;
`
R.Pin = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.7rem;
  background: url(${pined}) center / 2.5rem no-repeat;
  cursor: pointer;
`
R.H3 = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.8rem;
`
R.Des = styled.p`
  display: block;
  width: 40rem;
  height: 10rem;
  margin-left: 0.3rem;
  overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	&::-webkit-scrollbar {
		display: none;
	}
`
R.Button = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--main-color1);
  &:hover,
  &:focus {
    font-weight: bolder;
  }
`
R.Confirm = styled.div`
  display: none;
`
R.Memo = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
`
R.MemoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 4rem;
  background: var(--main-color1);
  color: var(--color-white);
  border: none;
  border-radius: 1rem;
`

const S: any = {}

S.MemoDiv = styled.div`
  position: relative;
  display: flex;
  align-items: end;
  margin-top: 1rem;
  margin-bottom: 2rem;
`
S.Memo = styled.div`
  width: 25rem;
  height: 12rem;
  margin-right: 2rem;
  padding: 1.2rem;
  background: #fffae3;
  border: 1px solid #ffc269;
  border-radius: 1.5rem;
  font-size: 1.4rem;
`
S.Button = styled.button`
  margin-right: 1rem;
  background: var(--color-white);
  border: none;
  font-size: 1.7rem;
  color: var(--main-color1);
  text-align: center;
  &:hover,
  &:focus {
    font-weight: bolder;
  }
`
S.Edit = styled(S.Memo)`
  resize: none;
  &::placeholder {
    font-size: 1.3rem;
    color: var(--color-gray2);
  }
`
S.EditForm = styled(S.MemoDiv)`
  position: absolute;
  top: -1rem;
  left: 0;
`