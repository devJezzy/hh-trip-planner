// pages/index.tsx
import { GetPlanProps } from '../context/PlanContext';

const Home: React.FC = () => {
  const { tourPlan, setTourPlan } = GetPlanProps();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTourPlan(event.target.value);
  };

  return (
    <div>
      <input type="text" value={tourPlan} onChange={handleChange} />
      <p>{tourPlan}</p>
    </div>
  );
};

export default Home;