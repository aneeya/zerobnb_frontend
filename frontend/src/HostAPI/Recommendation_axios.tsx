import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const getRecommendation = async(id: number) => {
  return await axios.get(`http://localhost:4000/rooms/${id}?_embed=pasts`)
}

export const useRecommendations = (id: number) => {
  const query = useQueryClient()
  return useQuery(['@recommends'], () => getRecommendation(id), {
    onError: (e: any) => {
      alert(`${e.message}정보를 가져오지 못했습니다`)
    },
    onSuccess: (data) => {
      const recommends = data.data.pasts
      query.setQueryData(['@recommends', '맛집'], recommends.filter( (list: { theme: string }) => list.theme === '맛집'))
      query.setQueryData(['@recommends', '카페'], recommends.filter( (list: { theme: string }) => list.theme === '카페'))
      query.setQueryData(['@recommends', '문화'], recommends.filter( (list: { theme: string }) => list.theme === '문화'))
      query.setQueryData(['@recommends', '행사'], recommends.filter( (list: { theme: string }) => list.theme === '행사'))
      query.setQueryData(['@recommends', '기타'], recommends.filter( (list: { theme: string }) => list.theme === '기타'))
    }
  })
}