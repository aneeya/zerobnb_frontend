import { useQueryClient} from "@tanstack/react-query"
import { useState } from "react"
import styled from "styled-components"
import { Room } from "../../HostAPI/TravelMange_axios"
import PinedListBox from "./PinedListBox"



export default function PinedListTab() {
  const queryClient = useQueryClient()
  const queryData = queryClient.getQueryData(['@pined']) as any
  const getInit = queryData.data.pineds

  const [ pinedList, setPinedList ] = useState(getInit)  

  const ended = window.localStorage.getItem('ended')

  const clickUpdate = (id: number) => {
   const newList = [ ...pinedList ].filter(list => list.id !== id)
   setPinedList(newList)
  }

  return (
    <>
      {pinedList.length !== 0
        ? pinedList.map((list: Room) => {
          return (
            <>
              <PinedListBox 
                key={list.name}
                list={list}  
                clickUpdate={clickUpdate}/>
            </>
          )
        })
        : <S.Messge>{Number(ended) < 0 ? '여행 일정이 끝났습니다' : '아직 저장한 리스트가 없습니다!'} </S.Messge>
      }
    </>
  )
}

//style

const S: any = {}

S.Messge = styled.div`
  width: 30rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  color: var(--main-color1);
  font-weight: 600;
  font-size: 2rem;
`
S.Confirm = styled.div`
  display: none;
`