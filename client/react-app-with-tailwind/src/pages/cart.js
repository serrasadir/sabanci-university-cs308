

import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Cart } from '../context/Context'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function CartShop() {

  const {
    state: {cart},
    dispatch,
  } = useContext(Cart);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                   </svg>
        <p>{cart.length}</p>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-12 mt-5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {cart.length > 0 ? 
              (
                <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                
                  {cart.map((prod) => 
                  
                  (
                    <li key={prod.product_id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={prod.imageUrl}
                                    alt={prod.product_name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={`/products/${prod.product_id}`}>{prod.product_name}</a>
                                      </h3>
                                      <p className="ml-4">{prod.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{prod.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">

                                    <div className="flex">
                                      <button
                                        fontSize="20px"
                                        style= {{cursor: "pointer"}}
                                        onClick={() => 
                                          dispatch({
                                               type: "REMOVE_FROM_CART",
                                               payload: prod,
                                          })
                                        }
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                      </li>
                                   
                  )
                  )}
                  <Link to="/purchase">
                  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Purchase
                  </button>
                  </Link>                 
                </div>
                </div>
              )
              :
              (<p>Cart is empty</p>)
              }
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}