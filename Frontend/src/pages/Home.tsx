import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { ListItems } from '../components/ListItems';
import apiConnection from '../config/apiConnection';
import { Movies } from '../interfaces/interfaces';

export const Home = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  

  const [searchText, setSearchText] = useState({
    textValue: '',
  });

  const { textValue } = searchText;

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText({ textValue: evt.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiConnection(`/movies/${textValue}`);

      setMovies(response.data.content);
      setIsLoading(false);
      setSearchText({ textValue: '' });
      setCurrentPage(0);
      setCurrentCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id:String) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una pelicula eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          apiConnection.delete(`/movies/${id}`);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  
  const filteredMovies = (): Movies[] => {
    return movies.slice(currentPage, currentPage + 10);
  };



  const nextPage = () => {
    if (currentCount > currentPage + 10) setCurrentPage(currentPage + 10);
  };
  const PreviusPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  return (
    <>
      <h1 className="text-center text-lg sm:text-2xl my-10 text-gray-700">
        Buscar Películas por Título
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-3 w-[95%] sm:w-2/3 sm:flex sm:items-center">
        <input
          type="text"
          name="textValue"
          value={textValue}
          onChange={handleInputChange}
          className="mb-3 sm:mb-0 sm:mr-3 block w-full mx-auto py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
          placeholder=" Vacio, trae todo el catálogo"
        />
        <button
          type="submit"
          className="w-full sm:w-40 sm:flex-row px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mb-6 sm:mb-0">
          Buscar
        </button>
      </form>

      <p className="text-center">
        Resultandos encontrados:{' '}
        <span className="text-amber-600 font-semibold">{currentCount}</span>
      </p>

      <div className="flex flex-col w-11/12 mx-auto">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Título
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Género
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Año
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Director
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Actores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td>Cargando...</td>
                    </tr>
                  ) : (
                    filteredMovies().map((item) => (
                      <ListItems
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        genders={item.genders}
                        year={item.year}
                        directors={item.directors}
                        actors={item.actors}
                        handleDelete={handleDelete}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly mt-5 mb-10 w-[95%] mx-auto">
        <button
          type="button"
          onClick={PreviusPage}
          className="w-1/3 sm:w-40 sm:flex-row px-6 py-2.5 bg-amber-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out mb-6 sm:mb-0">
          Anterior
        </button>

        <button
          type="button"
          onClick={nextPage}
          className={
            'w-1/3 sm:w-40 sm:flex-row px-6 py-2.5 bg-amber-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mb-6 sm:mb-0'
          }>
          Siguiente
        </button>
      </div>
    </>
  );
};
