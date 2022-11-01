import Header, { Active } from "../components/areas/Header";
import Main from "../components/areas/Main";


export default function({active}: Active) {
  return (
    <>
      <Main active={active}/>
    </>
  )
}