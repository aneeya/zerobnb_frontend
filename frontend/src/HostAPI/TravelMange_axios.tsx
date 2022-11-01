import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export interface Travel {
  email: string,
  title: string,
  cost: string,
  country: string,
  startDate: string,
  endDate: string,
  nthOfPeople: string,
  id: number,
  postId?: number
}
export interface Room {
  id?: number,
  name: string,
  city: string,
  hostName: string,
  phone: string,
  price: string,
  images: string,
  nthOfPeople: number,
  hompage: string,
  description: string,
  memo?: string,
  travelId?: number
}
export interface ReservaionList extends Travel {
  store: Room[] | [],
  reserved: Room[] | [],
  past: Room[] | []
}

//등록한 여행일정 리스트 
export const getStoredDates = async() => {
  const email = window.localStorage.getItem('email')
  return  await axios.get(` http://localhost:4000/travels?email=${email}`)
}

// //여행일정 선택하기
// const getSelectedDate = async(id: number) => {
//   return await axios.get(`http://localhost:4000/travels/${id}`)
// }

// export const querySelectedDate = (id: number) => {
//   const queryClient = useQueryClient()
//   return useMutation(() => getSelectedDate(id), {
//     onSuccess: (data: any) => {
//       queryClient.setQueryData(['@itinerary', data.data.title], data.data)
//     },
//     onError: (e: any) => {
//       alert(e.message)
//     }
//   })
// }

//예약가능한 방 불로오기
export const getReservable = async(city: string) => {
  return await axios.get(`http://localhost:4000/rooms?city=${city}`)
}

//핀리스트 추가
export const postPinedRoom = async(id: number, data: Room) => {
  data.travelId = id
  return await axios.post(`http://localhost:4000/pineds/`, data)
} 


//핀리스트 삭제
export const deletePinedRoom = async(id: number) => {
  return await axios.delete(`http://localhost:4000/pineds/${id}`)
} 

//저장한 핀리스트 불러오기
export const getPinedList = async(id: number) => {
  return await axios.get(`http://localhost:4000/travels/${id}?_embed=pineds`)
}

