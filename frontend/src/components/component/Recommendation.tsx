import { useRecommendations } from "../../HostAPI/Recommendation_axios"

interface Props {
  id: number  
}

export default function Recommendation({id}: Props) {
  useRecommendations(id)

  return (
    <>
      <div>
        <div>숙소 근처 여행지</div>
        <ul>
          <li>맛집</li>
          <li>카페</li>
          <li>문화</li>
          <li>행사</li>
          <li>기타</li>
        </ul>
      
      </div>
    </>
  )
} 