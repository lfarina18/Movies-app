import { Moviesitems } from "../interfaces/interfaces"
import { MdDeleteForever } from 'react-icons/md';


export const ListItems: React.FC<Moviesitems> = ({id, title, genders, year, directors, actors, handleDelete}: Moviesitems) => {

    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{genders}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{directors}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{actors}</td>

            <td className='flex justify-between gap-6'>
          <button
            className="text-amber-700 cursor-pointer"
            onClick={() => handleDelete(id)}>
            <MdDeleteForever size="25px" />
          </button>
        </td>
        </tr>
    )
}


