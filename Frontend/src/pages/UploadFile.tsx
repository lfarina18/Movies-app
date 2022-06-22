import { ChangeEvent, useRef, useState } from 'react';
import { uploadFile } from '../helpers/uploadFile';

const array = [
  'Titulo',
  'Genero',
  'Año',
  'Director',
  'Actores',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
];

export const UploadFile = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [cvsFile, setCvsFile] = useState<File | null>(null);

  const handleCsvUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setCvsFile(evt.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (cvsFile !== null) {
      await uploadFile(cvsFile);
      setCvsFile(null);
      formRef.current?.reset();
    }
    return;
  };

  return (
    <div className="m-6 p-6 bg-gray-200 text-lg sm:text-2xl text-center">
      <form onSubmit={handleSubmit} ref={formRef} className="p-1">
        <h2 className="px-5">
          Seleccione el archivo a subir, solo admite el formato CSV <span className="text-sm text-red-600">(separador ;)</span>
        </h2>
        <div>
          <h3 className="text-sm sm:text-lg p-5 text-red-600 font-semibold">
            Importante: El archivo DEBE contener las siguientes columnas:
          </h3>
          <div className="grid grid-cols-5 text-[12px] bg-white border border-gray-400 font-semibold">
            {array.map((value) => (
              <div className="flex justify-center items-center border h-7 border-gray-400 font-semibold">
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center my-10">
          <div className="w-full">
            <input
              className="block w-full sm:w-2/3 sm-w-full mx-auto py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
              required={true}
              type="file"
              accept="text/csv"
              onChange={handleCsvUpload}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mt-4">
          <button
            type="submit"
            className="mx-auto px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mb-6 sm:mb-0">
            Guardar
          </button>
          <button className="mx-auto px-6 py-2.5 bg-amber-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out">
            Ir al Catálogo
          </button>
        </div>
      </form>
    </div>
  );
};
