import styled from "styled-components"

interface Props {
	type: 'button' | 'submit' | 'reset'
	text: string,
	onClick?: () => void
}

export default function Button({type, text, onClick}: Props) {
	return (
		<S.Button type={type} onClick={onClick}>{text}</S.Button>
	)
}

//styled

const S: any = {}

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