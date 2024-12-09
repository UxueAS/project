import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../assets/logo.png'

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
          <header className="p-4 h-24 border-b-dark-grey">
            <nav className='flex'>
              <Link to="/" className="mr-4"><img src={logo} alt="NAIZ" className='h-10' /></Link>
              <Link to="/about" className="mr-4">About</Link>
              <Link to="/contact">Contact</Link>
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
