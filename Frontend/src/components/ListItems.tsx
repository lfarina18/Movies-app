import { Movies } from "../interfaces/interfaces"


export const ListItems: React.FC<Movies> = ({id, title, genders, year, directors, actors}: Movies) => {

    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{genders}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{directors}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{actors}</td>
        </tr>
    )
}
