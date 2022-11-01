import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useState } from "react"
import styled from "styled-components"
import haus from "../../assets/haus.png"
import pin from "../../assets/icons/pin.png"
import pined from "../../assets/icons/pin2.png"
import { deletePinedRoom, postPinedRoom, Room } from "../../HostAPI/TravelMange_axios"

interface Props {
  list: Room,
  id: number,
  initState: boolean
}

export function ReservationBox({list, id, initState}: Props) {
  const [ pinState, setPinState ] = useState(initState)
  const [ pinStateAtive, setPinStateActive ] = useState(false)
  const queryClient = useQueryClient()

  const addMutation = useMutation(() => postPinedRoom(id, list), {
      onError: (e: any) => {
        alert(`${e.message}핀을 저장하지 못했습니다`)
        setPinState(!pinState)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['@pined'])
      }
    })
  
  const subMutation = useMutation(() => deletePinedRoom(Number(list.id)), {
      onSuccess: () => {
        queryClient.invalidateQueries(['@pined'])
      },
      onError: (e: any) => {
        setPinState(!pinState)
      },
    })
  // let timer: any


  // const changeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   if(timer) clearTimeout(timer)
  //   timer = setTimeout(() => {
  //     list.memo = e.target.value
  //     console.log(list.memo)
  //   }, 500)
  // }

  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
     
  }
  const clickPinHandle = () => {
    setPinState(!pinState)
    setPinStateActive(true)
  }

  useEffect(() => {
    if(pinState && pinStateAtive) {
      console.log(pinStateAtive)
      addMutation.mutate()
    } else if(!pinState && pinStateAtive) {
        subMutation.mutate()
    }
  }, [pinState])

  return (
    <>
      <R.Rayout>
        <R.Img></R.Img>
        <R.Content>
          <R.Pin role="button" aria-label="저장핀" theme={pinState? pined : pin} onClick={clickPinHandle}/>
          <R.H3>{list.name}</R.H3>
          <R.Des>{list.description}</R.Des>
          <R.Button type="button">상세보기</R.Button>
        </R.Content>
      </R.Rayout>
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
  background: ${(props) => `url(${props.theme})`} center / 2.5rem no-repeat;
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