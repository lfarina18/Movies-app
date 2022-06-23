export const Home = () => {
  return (
    <>
      <h1 className="text-center text-lg sm:text-2xl my-10 text-gray-700">
        Buscar Películas por Título
      </h1>

      <div className="mx-auto mb-3 w-[95%] sm:w-1/2">
        <input
          type="text"
          className="mb-3 block w-full mx-auto py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
          placeholder=" Vacio, trae todo el catálogo"
        />
        <button
          type="submit"
          className=" w-full sm:w-1/2 sm:flex-row px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mb-6 sm:mb-0">
          Buscar
        </button>
      </div>
    </>
  );
};
