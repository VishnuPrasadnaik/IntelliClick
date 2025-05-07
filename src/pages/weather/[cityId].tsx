import { useRouter } from 'next/router';
import WeatherCard from '../../components/WeatherCard';

export default function WeatherPage() {
  const router = useRouter();
  const { cityId } = router.query;
  
  // Your weather page implementation
  return (
    <div>
      <WeatherCard cityId={cityId} />
    </div>
  )
}