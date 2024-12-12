import Slider from '../components/Slider';
import Novedades from '../components/Novedades';
import Favoritos from '../components/Favoritos';
import Tabs from '../components/Tabs';
import { useState } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);
  return (
    <div className='flex flex-col'>
      <Slider />
      <div className='mx-auto max-w-7xl w-full'>
        {user && <Favoritos />}
        <Novedades />
        <Tabs />
      </div>
    </div>
  );
};

export default Home;