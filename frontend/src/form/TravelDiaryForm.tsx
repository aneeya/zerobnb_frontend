import { useState, MouseEvent, ChangeEvent } from "react"
import styled from "styled-components"
import Button from "../components/common/Button"

import logo from "../assets/logo2.png"
import prev from "../assets/icons/prev.png"
import spring from "../assets/icons/spring.png"
import { Diary, useDiaryRegist } from "../HostAPI/TravelMange_axios"

interface Props {
  name: string,
  roomId: number,
  clickCancel: () => void
}

export default function TravelDiaryForm({name, roomId, clickCancel}: Props) {
  const init: Diary = {
    roomId: roomId,
    theme: '',
    name: '',
    images: [],
    url: '',
    description: ''
  }

  const [ formData, setFormData ] = useState(init)
  const [ move, setMove ] = useState(0)

  const registMutation = useDiaryRegist(formData, clickCancel)

  const clickCarousel = (e: MouseEvent<HTMLButtonElement>) => {
    const target = (e.target as HTMLButtonElement).innerText
    if(target === '다음' && move < 4) setMove(move + 1)
    if(target === '이전' && move > 0) setMove(move - 1)
  }

  const clickUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if(formData.images.length >= 3) {
      alert('업로드 가능한 이미지는 3장 입니다')
    } else {
      const urlFiles = imgValidate(e.target.files) 
      const setFiles = [ ...formData.images ].concat(urlFiles!)
      setFormData({...formData, [e.target.name]: setFiles})
    }
  }

  const clickImgReset = () => {
    setFormData({...formData, images: []})
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.name === 'theme'){
      setFormData({ ...formData, [e.target.name]: e.target.id})
    } else {
      let timer
      timer = setTimeout(() => {
      setFormData({ ...formData, [e.target.name]: e.target.value})
      }, 800)
    }
  }
  
  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    registMutation.mutate()
  }

  return (
    <>
      <S.Layout>
        <S.LogoArea>
          <S.PrevImg src={prev} alt="돌아가기" role="button" onClick={clickCancel}/>
          <S.Logo src={logo} alt="zerobnb" />
        </S.LogoArea>
        <S.Accommodation>
          <span className="screenReader">이용한 숙소</span>
          {name}
        </S.Accommodation>
          <S.Form onSubmit={submitValue}>
            <S.Spring/>
            <S.FormLayout>
              <S.Carousel id={move}>
                <S.TypeArea>
                  <S.TypeLegend>추천 타입</S.TypeLegend>
                  <S.Types>
                    <S.Type>
                      <S.TypeInput id="맛집" name="theme" type="radio" required onChange={changeValue}/>
                      <S.TypeLabel htmlFor="맛집">맛집</S.TypeLabel>
                    </S.Type>
                    <S.Type>
                      <S.TypeInput id="카페" name="theme" type="radio" required onChange={changeValue}/>
                      <S.TypeLabel htmlFor="카페">카페</S.TypeLabel>
                    </S.Type>
                    <S.Type>
                      <S.TypeInput id="문화" name="theme" type="radio" required onChange={changeValue}/>
                      <S.TypeLabel htmlFor="문화">문화</S.TypeLabel>
                    </S.Type>
                    <S.Type>
                      <S.TypeInput id="행사" name="theme" type="radio" required onChange={changeValue}/>
                      <S.TypeLabel htmlFor="행사">행사</S.TypeLabel>
                    </S.Type>
                    <S.Type>
                      <S.TypeInput id="기타" name="theme" type="radio" required onChange={changeValue}/>
                      <S.TypeLabel htmlFor="기타">기타</S.TypeLabel>
                    </S.Type>
                  </S.Types>
                </S.TypeArea>
                <S.NameArea>
                   <S.Label htmlFor="name">추천지</S.Label>
                   <S.NameInput id="name" name="name" type="text" placeholder="상호명 및 추천 장소를 입력해주세요" required onChange={changeValue}/>
                </S.NameArea>
                <S.ImgArea>
                  <S.ImgesView>
                    <S.ImgView id={formData.images[0]}/>
                    <S.ImgView id={formData.images[1]}/>
                    <S.ImgView id={formData.images[2]}/>
                  </S.ImgesView>
                  <S.ButtonArea>
                    <S.ImgAdd>
                      +
                      <S.ImgInput name="images" type="file" accept="image/*" multiple onChange={clickUploadImg}/>
                    </S.ImgAdd>
                    <S.ResetButton type="button" onClick={clickImgReset}>RESET</S.ResetButton>
                  </S.ButtonArea>
                </S.ImgArea>
                <S.LinkArea>
                  <S.Label htmlFor="url">관련 페이지</S.Label>
                  <S.LinkInput type="url" name="url" id="url" placeholder="https://example.com" pattern="https://.*" onChange={changeValue} />
                </S.LinkArea>
                <S.TextArea>
                  <S.Label htmlFor="description">글쓰기</S.Label>
                  <S.Text name="description" id="description" onChange={changeValue}/>
                </S.TextArea>
              </S.Carousel>
            </S.FormLayout>
            <S.ButtonArea>
              <S.Button type="button" onClick={clickCarousel}>{move === 0 ? '' : '이전'}</S.Button>
              {move === 4 
                ?
                <Button type="submit" text="저장" />
                :
                <S.Button type="button" onClick={clickCarousel}>다음</S.Button>
              }
            </S.ButtonArea>
          </S.Form>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 15rem;
`

S.LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 28rem;
  margin-bottom: 3rem;
`
S.PrevImg = styled.img`
  width: 3rem;
  height: 2.5rem;
  cursor: pointer;
`
S.Logo = styled.img`
  display: block;
  width: 23rem;
`
S.Accommodation = styled.div`
  margin-bottom: 3rem;
  color: var(--color-gray3);
  font-size: 2.2rem;
  font-weight: 600;
`

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68rem;
`
S.FormLayout = styled.div`
  width: 68rem;
  height: 40rem;
  margin-top: -1.5rem;
  border: 1px solid var(--color-gray0);
  border-radius: 2rem;
  overflow: hidden;
`
S.Spring = styled.div`
  width: 60rem;
  height: 2.5rem;
  margin: 0 auto;
  background: url(${spring}) 0.5rem /4rem repeat-x;
`
S.Carousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68rem;
  transform: ${(props) => `translateY(-${Number(props.id) * 40}rem);`}
  transition: transform 0.5s linear;
`

S.TypeArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 68rem;
  height: 40rem;
`
S.TypeLegend = styled.div`
  font-size: 2.2rem;
  margin-top: 8rem;
  margin-bottom: 8rem;
`
S.Types = styled.div`
  display: flex;
  align-items: center;
`
S.Type = styled.div`
  margin-right: 2rem;
  padding-left: 1rem;
`
S.TypeInput = styled.input`
  margin-right: 0.8rem;
`
S.TypeLabel = styled.label`
  font-size: 1.8rem;
`

S.NameArea = styled(S.TypeArea)``
S.NameInput = styled.input`
  width: 30rem;
  height: 4rem;
  padding-left: 2rem;
  font-size: 1.6rem;
  border: none;
  border-bottom: 1px solid var(--color-gray0);
`
S.Label = styled.label`
  font-size: 2rem;
  margin-top: 8rem;
  margin-bottom: 5rem;
`

S.ImgArea = styled(S.TypeArea)`
`
S.ImgAdd = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 3.5rem;
  padding-bottom: 0.2rem;
  background: var(--color-white);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--main-color1);
  cursor: pointer;
  &:hover,
  &:focus {
    font-size: 2.9rem;
    padding-bottom: 0.4rem;
    color: var(--main-color1-1);
  }
`
S.ImgInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  height: 3.5rem;
  opacity: 0;
  cursor: pointer;
  &::-webkit-file-upload-button {
    cursor: pointer;
  }
`
S.ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3.5rem;
  background: var(--main-color1);
  border: none;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-white);
  &:hover,
  &:focus {
    background: var(--main-color1-1);
  }
`
S.ImgesView = styled.div`
  display: flex;
  margin-top: 8rem;
  margin-bottom: 3rem;
`
S.ImgView = styled.div`
  width: 18rem;
  height: 18rem;
  background: ${(prop) => {
    if(prop.id === null) return `var(--color-white);`
    else return `url(${prop.id}) center / 18rem no-repeat;`
  }};
  border: 1px solid var(--color-gray0);
  border-radius: 1rem;
  margin-right: 1.2rem;
  
`

S.LinkArea = styled(S.NameArea)``
S.LinkInput = styled(S.NameInput)``

S.TextArea = styled(S.NameArea)``
S.Text = styled.textarea`
  width: 40rem;
  height: 15rem;
  padding: 1rem;
  border-radius: 1rem;
  resize: none;
`

S.ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 16.5rem;
`
S.Button = styled.button`
	width: 8rem;
	height: 4.5rem;
	background: var(--main-color1);
	border: 1px solid var(--main-color1-1);
	border-radius: 1.5rem;
	color: var(--color-white);
	font-size: 1.6rem;
	font-weight: 600;
	cursor: pointer;
	&:hover,
	&:focus {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3)
	}
`

const imgValidate = (files: any) => {
  const uploadFiles = Array.from(files) as any[]
  const urlFiles: string[] = []
  if(uploadFiles.length > 3) {
    alert('업로드 가능한 이미지는 3장 입니다')
    return 
  }
  uploadFiles.forEach((file) => {
    if(file.size >= 10 * 1024 * 1024) {
      alert('1MB이하의 이미지만 업로드 해주세요')
      return
    } else {
      const urlImg = URL.createObjectURL(file)
      urlFiles.push(urlImg)
    }
  })
  return urlFiles
}
