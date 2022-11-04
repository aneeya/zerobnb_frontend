import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../components/areas/Header"
import FormLayout from "../components/layout/FormLayout"
import ItineraryForm from "../form/ItineraryForm"
import JoinForm from "../form/JoinForm"
import MainPage from "../pages/MainPage"
import RoomPage from "../pages/RoomPage"

const Router = () => {
	const queryClient = useQueryClient()
	const [ active, setActive ] =  useState(false)
	
	useEffect(() => {
		const key = window.localStorage.getItem('key')
		if(key !== null) {
			setActive(true)
			console.log('로그인됨')
		}
		else {
			setActive(false)
			console.log('로그아웃됨')
		}
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header active={active}/>}>
					<Route path="/" element={<MainPage active={active}/>}/>
					<Route path="join" element={<FormLayout title='회원가입' render={<JoinForm />} />} />
					<Route path="itinerary" element={<FormLayout title='여행 일정 등록' render={<ItineraryForm/>} />} />
					<Route path=":room" element={<RoomPage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
