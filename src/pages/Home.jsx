import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of your application.</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;