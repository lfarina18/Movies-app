import { MoviesItems } from "../interfaces/interfaces"


export const ListItems: React.FC<MoviesItems> = ({index, title, genders, year, directors, actors}: MoviesItems) => {

    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{genders}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{directors}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{actors}</td>
        </tr>
    )
}
