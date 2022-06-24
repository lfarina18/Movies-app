export interface Movies {
    id: string;
    title: string;
    genders: string;
    year: string;
    directors: string;
    actors: string;
}
export interface Moviesitems {
    id: string;
    title: string;
    genders: string;
    year: string;
    directors: string;
    actors: string;
    handleDelete(id: String): void
}


