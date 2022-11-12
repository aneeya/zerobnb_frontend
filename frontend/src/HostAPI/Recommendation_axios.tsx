import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getRecommendation = async(id: number) => {
  return await axios.get(`http://localhost:4000/rooms/${id}?_embed=pasts`)
}

export const useRecommendations = (id: number) => {
  return useQuery([''], () => getRecommendation(id), {
    onError: (e: any) => {
      alert(`${e.message}정보를 가져오지 못했습니다`)
    },
    onSuccess: (data) => {
      console.log(data.data.pasts)
    }
  })
}