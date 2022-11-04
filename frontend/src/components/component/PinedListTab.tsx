import { useQueryClient} from "@tanstack/react-query"
import { useState } from "react"
import styled from "styled-components"
import { Room } from "../../HostAPI/TravelMange_axios"
import PinedListBox from "./PinedListBox"



export default function PinedListTab() {
  const queryClient = useQueryClient()
  const queryData = queryClient.getQueryData(['@pined']) as any
  const getInit = queryData.data.pineds
  console.log(queryData)
  const [ pinedList, setPinedList ] = useState(getInit)  

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
                list={list}  
                clickUpdate={clickUpdate}/>
            </>
          )
        })
        : <S.Messge> 아직 저장한 리스트가 없습니다!</S.Messge>
      }
    </>
  )
}

//style

const S: any = {}

S.Messge = styled.div`
  color: var(--main-color1);
  font-weight: 800;
`
S.Confirm = styled.div`
  display: none;
`