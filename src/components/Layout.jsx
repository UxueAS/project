import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../assets/logo.png'
import BurgerMenu from './BurgerMenu'

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
          <header className="h-24 border-b border-b-dark-grey">
            <nav className='h-full flex align-middle'>
              <BurgerMenu />
              <Link to="/" className="mr-4 flex flex-col justify-center"><img src={logo} alt="NAIZ" className='h-10' /></Link>
            </nav>
          </header>
          <main className="flex-grow p-4">
            {children}
          </main>
          <footer className="bg-dark-grey text-white p-4 text-center">
            &copy; 2023 Your Company
          </footer>
        </div>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;
