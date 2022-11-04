import { useQuery } from "@tanstack/react-query"
import axios from "axios" 
import { useNavigate } from "react-router-dom";



export interface NewUser {
  email: string,
  name: string,
  password: string,
}

export interface Login {
  email: string,
  password: string,
}

interface Active extends NewUser {
  id: string
}

 
//User
const fetchUser = async() => {
 return await axios.get(`http://localhost:4000/users`)
}
// export const Login = (loginData: Login) => {
//   const findUser = fetchUser()
//   findUser
//   .then(users => 
//     users.find((user: Login) => user.email === loginData.email && user.password === loginData.password))
//   .then(result => {
//     if(result) {
//       window.localStorage.setItem('name', result.name)
//       window.localStorage.setItem('email', result.email)
//       window.localStorage.setItem('key', result.id)
//       window.location.replace('http://localhost:3000/')
//     } else {
//       alert('이메일 및 패스워드가 확인되지 않습니다 다시 입력해주세요!')
//     }
//   })
//   .catch(e => alert(e.message))
// } 

export const useLogin = () => {
  return useQuery(['@user'], fetchUser, {
    onError: (e: any) => {
     alert(e.message)
    }
  })
}

export const JoinUser = async(data: NewUser) => {
  try{
    return await axios.post('http://localhost:4000/users', data)
  } catch(e: any){
    alert(`${e.message} 다시 시도해주세요`)
  }
};

