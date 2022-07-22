import React, { /* useEffect, */ Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { filterByCategory, setPage } from '../../../Redux/Actions'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

const sortOptions = [
  { name: 'Ascending (A-Z) ↑', href: '#', current: true },
  { name: 'Descending (Z-A) ↓', href: '#', current: false },
  { name: 'From Lower-Higher ↑', href: '#', current: false },
  { name: 'From Higher-Lower ↓', href: '#', current: false }
]

/* const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false }
    ]
  }
] */

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filters ({ children }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const dispatch = useDispatch()
  const [checked, setChecked] = useState({
    category: []
  })
  const categories = useSelector(state => state.categories)
  Filters.propTypes = {
    children: PropTypes.node
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    if (e.target.checked) {
      setChecked({
        ...checked, category: [...checked.category, value]
      })
      if ([...checked.category, value].length > 0) {
        dispatch(filterByCategory([...checked.category, value].join('_')))
      }
    }
    if (!e.target.checked) {
      console.log(e.target.value)
      setChecked({
        ...checked, category: [...checked.category.filter(c => c !== value)]
      })
      if ([...checked.category.filter(c => c !== value)].length > 0) {
        dispatch(filterByCategory([...checked.category.filter(c => c !== value)].join('_')))
      }
      if ([...checked.category.filter(c => c !== value)].length === 0) {
        dispatch(filterByCategory(null))
      }
    }
    dispatch(setPage(0))
  }

  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25"/>
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200" onChange={(e) => handleOnChange(e)}>
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                    </ul>
                    {/* ALGO A CAMBIAR CUANDO HAYA MAS TIPOS DE FILTRADOS ESTO ES PARA EL CELULAR */}
                    <Disclosure as="div" key={'Category'} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button
                              className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Category</span>
                              <span className="ml-6 flex items-center">
                                  {open
                                    ? (
                                      <MinusSmIcon className="h-5 w-5" aria-hidden="true"/>
                                      )
                                    : (
                                      <PlusSmIcon className="h-5 w-5" aria-hidden="true"/>
                                      )}
                                </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {categories && categories.map((option, optionIdx) => (
                                <div key={option.id} className="flex items-center">
                                  <input
                                    id='Category'
                                    value={option.id}
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-Category-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900"></h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className="group inline-flex justify-center text-sm font-medium text-white hover:text-gray-600">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true"/>
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true"/>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <div className='w-80'>
                <form className="hidden lg:block w-80" onChange={(e) => handleOnChange(e)}>
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6  ">
                  </ul>
                  {/* ESTO TAMBIEN HAY QUE CAMBIAR SI VAMOS A COLOCAR MAS OPCIONES DE FILTRADO ESTO ESCRITORIO */}
                  <Disclosure as="div" key={'Category'} className=" py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button
                            className="py-3 text-lg rounded-md w-full flex items-center justify-between  text-white hover:text-white">
                            <span className="font-bold text-white ">Category</span>
                            <span className="ml-6 flex items-center">
                              {open
                                ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true"/>
                                  )
                                : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true"/>
                                  )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {categories && categories.map((option, optionIdx) => (
                              <div key={option.id} className="flex items-center">
                                <input
                                  id='Category'
                                  value={option.id}
                                  type="checkbox"
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${option.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-white"
                                >
                                  {option.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
              </div>
              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}