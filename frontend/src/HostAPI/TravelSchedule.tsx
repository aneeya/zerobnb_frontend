import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export interface Schedule {
  initValue?: string,
  title: string,
  cost: string,
  country: string,
  startDate: string,
  endDate: string,
  nthOfPeople: string,
  email: string
}

export const RegisterSchedule = (data: Schedule) => {
  const res = axios.post(`http://localhost:4000/travels`, data)
  res.then(() => {
    alert('여행일정이 등록되었습니다!')
    window.location.replace('http://localhost:3000/')
  }).catch((e) => alert(`${e.message} 다시시도해주세요`))  
}

const deleteschedule = async() => {
  const travelId = window.localStorage.getItem('travelId')
  return await axios.delete(`http://localhost:4000/travels/${travelId}`)
}

export const useDeleteSchedule = () => {
  const query = useQueryClient()
  return useMutation(() => deleteschedule(), {
    onError: (e: any) => {
      alert(`${e.message}다시 시도해주세요`)
    },
    onSuccess: async() => {
      alert('일정이 삭제되었습니다!')
      window.localStorage.removeItem('starDate')
      window.localStorage.removeItem('endDate')
      window.localStorage.removeItem('travelId')
      window.location.reload()
    }
  })
}