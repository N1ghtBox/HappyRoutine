import styles from '../styles/Home.module.css'

export const AddModal = () => {

    return (
    <div id="modal" aria-hidden="true" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full" style={{ background:'rgba(44, 54, 63, 0.6)'}}>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
                <div className="py-6 px-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium  text-gray-900 dark:text-white">Dodaj Zadanie</h3>
                    <form className="space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Opis zadania</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Poćwicz 5 minut..." required/>
                        </div>
                        <div className="flex">
                            <button id="dropdown-button" data-dropdown-toggle="dropdown" className="w-full z-10 inline-flex justify-center items-center py-2.5 px-4 text-sm font-medium text-center text-gray-400 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">All categories <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                            <div id="dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shopping</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Images</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">News</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Finance</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <button type="submit" className={`w-full justify-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5  ${styles.addButton}`}>Login to your account</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    )
}