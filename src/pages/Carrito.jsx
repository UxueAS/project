import { useCartContext } from '../providers/CartProvider';
import { Link } from 'react-router-dom';
import images from '../assets/images';
import { MdDelete } from 'react-icons/md';
const Carrito = () => {
  const { cart, removeFromCart, updateProductQuantity } = useCartContext();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateProductQuantity(productId, newQuantity);
    }
  };
  return (
    <div className='mx-auto max-w-6xl w-full flex flex-col my-12 px-2 lg:px-0'>
      <h2 className='font-bold text-2xl'>Mi carrito</h2>
      {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-500">Tu carrito está vacío</p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 bg-primary text-black font-light uppercase"
            >
              Seguir comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Productos */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6">
                <ul>
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b border-dark-grey py-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={images[item.img] || 'https://via.placeholder.com/100'}
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-500">Precio: {item.price}€</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                          className="w-16 p-1 text-center border rounded text-sm"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-4 py-2 text-red-500 hover:text-red-700"
                        >
                          <MdDelete />
                          <span className='sr-only'>Remove</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resumen del Pedido */}
            <div>
              <div className="bg-white p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
                <div className="text-lg mb-4">
                  <p className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{(total * 0.9).toFixed(2)}€</span>
                  </p>
                  <p className="flex justify-between">
                    <span>IVA (10%):</span>
                    <span>{(total * 0.1).toFixed(2)}€</span>
                  </p>
                  <p className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{(total).toFixed(2)}€</span>
                  </p>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full text-center bg-primary text-black py-2 font-semibold hover:bg-primary/75"
                >
                  Proceder al pago
                </Link>
                <Link
                  to="/"
                  className="mt-4 block w-full text-center bg-dark-grey text-white py-2 font-semibold hover:bg-dark-grey/75"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Carrito;