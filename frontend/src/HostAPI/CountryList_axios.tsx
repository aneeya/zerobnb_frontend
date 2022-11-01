import { useQueries, useQuery } from "@tanstack/react-query"
import axios from "axios"

export const getCountries = async() => {
  return await axios.get('http://localhost:4000/countries')
}

export const queryCountries = () => {
  return useQuery(['@countries'], getCountries, {

		onError: (e: any) => {
			alert(`${e.message}여행지역들을 로드하지 못했습니다.`)
		},
    onSuccess: (data) => {
        return data.data
    },
  })
}