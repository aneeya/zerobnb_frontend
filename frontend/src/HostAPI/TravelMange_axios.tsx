import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

export interface Reserve extends Room {
  checkIn?: string,
  checkOut?: string,
  total?: string
}

export interface ReservaionList extends Travel {
  store: Room[] | [],
  reserved: Room[] | [],
  past: Room[] | []
}

export interface Diary {
  id?: number,
  roomId: number,
  theme: string,
  name: string,
  images: string[] | [],
  url: string,
  description: string
}
//등록한 여행일정 리스트 
export const getStoredDates = async() => {
  const email = window.localStorage.getItem('email')
  return  await axios.get(` http://localhost:4000/travels?email=${email}`)
}



//예약가능한 방 불러오기
export const getReservable = async(city: string) => {
  return await axios.get(`http://localhost:4000/rooms?city=${city}`)
}

//핀리스트 추가
export const postPinedRoom = async(id: number, data: Room) => {
  data.travelId = id
  return await axios.post(`http://localhost:4000/pineds/`, data)
} 

//핀리스트 수정(메모)
const patchPinedMemo = async(id: number, memo: string) => {
  return await axios.patch(`http://localhost:4000/pineds/${id}`, {memo: memo})
}

export const useEditMemo = (id: number, memo: string) => {
  const query = useQueryClient()
  return useMutation(() => patchPinedMemo(id, memo), {
    onError: (e: any) => {
      alert(`${e.message} 메모를 수정하지 못했습니다`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@pined'])
    }
  })
}

//핀리스트 삭제
export const deletePinedRoom = async(id: number) => {
  return await axios.delete(`http://localhost:4000/pineds/${id}`)
} 

//저장한 핀리스트 불러오기
export const getPinedList = async(id: number) => {
  return await axios.get(`http://localhost:4000/travels/${id}?_embed=pineds`)
}

export const useGetPinedList = (id: number) => {
  return useQuery(['@pined'], () => getPinedList(id))
}

//핀리스트 쿼리
export const useAddPinedList = (id: number, data: Room) => {
  const query = useQueryClient()
  return useMutation(() => postPinedRoom(id, data), {
    onError: (e: any) => {
      alert(`${e.message}핀을 저장하지 못했습니다`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@pined'])
    }
  })
}

export const useSubPinedList = (id: number) => {
  const query = useQueryClient()
  return useMutation(() => deletePinedRoom(Number(id)), {
    onSuccess: () => {
      query.invalidateQueries(['@pined'])
    },
    onError: (e: any) => {
      alert('저장실패')
    },
  })
}

//방 상세보기 
const getDetailView = async(id: number) => {
  return await axios.get(`http://localhost:4000/rooms/${id}`)
} 

export const useDetailView = (id: number) => {
  return useQuery([], () => getDetailView(id), {
    onError: (e: any) => {
      alert(e.message)
    }
  })
}

//예약하기

const postReserve = async(data: Reserve, travelId: string) => {
  data.travelId = Number(travelId)
  return await axios.post('http://localhost:4000/reserves', data)
}

export const useReserve = (data: Reserve, travelId: string) => {
  const nav = useNavigate()
  const query = useQueryClient()
  return useMutation(() => postReserve(data, travelId), {
    onError: (e: any) => {
      alert(`${e.message} 예약하는데 실패했습니다`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@reserve'])
      alert('예약이 완료 되었습니다!')
      nav('/')
      query.refetchQueries(['@reserve'])
    }
  })
}

//예약목록

const getReserve = async() => {
  const travelId = window.localStorage.getItem('travelId')
  return await axios.get(`http://localhost:4000/travels/${travelId}?_embed=reserves`)
}

export const useReserveList = () => {
  return useQuery(['@reserve'], () => getReserve(), {
    onError: (e: any) => {
      alert(`${e.message} 예약목록을 가져오지 못했습니다`)
    }
  })
}

//예약삭제
const deleteReserve = async(id: number) => {
  return await axios.delete(`http://localhost:4000/reserves/${id}`)
}

export const useReserveDelete = (id: number) => {
  const query = useQueryClient()
  return useMutation(() => deleteReserve(id), {
    onSuccess: () => {
      query.invalidateQueries(['@reserve'])
      alert('예약이 취소 되었습니다!')
      query.refetchQueries(['@reserve'])
    }
  })
}

//여행기록 남기기

const postDiary = async(data: Diary) => {
  return await axios.post(`http://localhost:4000/pasts`, data)
}

export const useDiaryRegist = (data: Diary, callback: () => void) => {
  const query = useQueryClient()
  return useMutation(() => postDiary(data), {
    onError: (e: any) => {
      alert(`${e.message}다시 시도해주세요ㅠ`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@travelDiary'])
      alert('등록이 완료되었습니다')
      callback()
    }
  })
}

//여행기록 리스트 불러오기
const getDiary = async(id: number) => {
  return await axios.get(`http://localhost:4000/pasts?roomId=${id}`)
}

export const useDiaryList = (id: number) => {
  const query = useQueryClient()
  return useQuery(['@travelDiary'], () => getDiary(id), {
    onError: (e: any) => {
      alert(`${e.message}등록한 기록들을 로드하지 못했습니다`)
    },
    onSuccess: (data) => {
      const recommends = data.data
      query.setQueryData(['@travelDiary', '맛집'], recommends.filter( (list: { theme: string }) => list.theme === '맛집'))
      query.setQueryData(['@travelDiary', '카페'], recommends.filter( (list: { theme: string }) => list.theme === '카페'))
      query.setQueryData(['@travelDiary', '문화'], recommends.filter( (list: { theme: string }) => list.theme === '문화'))
      query.setQueryData(['@travelDiary', '행사'], recommends.filter( (list: { theme: string }) => list.theme === '행사'))
      query.setQueryData(['@travelDiary', '기타'], recommends.filter( (list: { theme: string }) => list.theme === '기타'))
    }
  })
}

//여행기록 리스트 삭제
const deleteDiary =  async(id: number) => {
  return await axios.delete(`http://localhost:4000/pasts/${id}`)
}

export const useDeleteDiary = (id: number, callback:() => void) => {
  const query = useQueryClient()
  return useMutation(() => deleteDiary(id), {
    onError: (e: any) => {
      alert(`${e.message}다시 시도해주세요`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@travelDiary'])
      alert('삭제되었습니다!')
      callback()
    }
  })
}