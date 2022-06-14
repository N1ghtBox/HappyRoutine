import { Disclosure, Menu } from '@headlessui/react'
import {  MenuIcon, XIcon, LogoutIcon, PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface IProps{
  navigation:{name: string, href:string, current: boolean}[],
  renderAddButton: boolean,
}

export default function Header(props: IProps) {
  const { data: session, status } = useSession();

  return (
    <Disclosure as="nav" style={{backgroundColor:'var(--main)'}}>
      {({ open }:{open: any}) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {props.navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? `${styles.lightGrayBg} text-white` : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {props.renderAddButton ? <button
                className={classNames('text-white',
                'px-3 py-2 rounded-md text-sm font-medium', styles.addButton)} >
                  <PlusIcon className='block h-6 w-6'/>
                Add new
              </button>: null}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="mr-3 relative">
                  <Link href={'/profile'}>
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session?.user?.image || ""}
                        />
                      </Menu.Button>
                    </div>
                  </Link>
                </Menu>
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <LogoutIcon className="h-6 w-6" aria-hidden="true" onClick={() => {signOut()}} />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {props.navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}