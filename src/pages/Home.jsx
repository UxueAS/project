import Slider from '../components/Slider';
import Novedades from '../components/Novedades';
import Favoritos from '../components/Favoritos';
import Tabs from '../components/Tabs';
import AuthService from '../services/auth';


const Home = () => {
  return (
    <div className='flex flex-col'>
      <Slider />
      <div className='mx-auto max-w-6xl w-full px-4 lg:px-0'>
        {AuthService.getToken() && <Favoritos />}
        <Novedades />
        <Tabs />
      </div>
    </div>
  );
};

export default Home;