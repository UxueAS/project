import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Chat from './Chat'

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
            <Chat />
          </main>
          <Footer />
        </div>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;
