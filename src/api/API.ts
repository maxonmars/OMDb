import axios, {AxiosResponse} from 'axios';

const key = '?apikey=be053338';
const axiosInstance = axios.create({
    baseURL: 'http://www.omdbapi.com/',
});

export type SearchType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

type ApprovedResultSearchType = {
    Response: "True" | "False"
    Search: Array<SearchType>
    totalResults: string
}

type ErrorResultSearchType = {
    Error: string
}

export type SearchResultType = ApprovedResultSearchType & ErrorResultSearchType
export const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance.get<SearchResultType>(`${key}&s=${title}`)
            .then((response) => response.data)
    },
    searchFilmsByType: (title: string, type: string) => {
        return axiosInstance.get<SearchResultType>(`${key}&s=${title}&type=${type}`)
            .then((response) => response.data)
    },
    searchAuto: (title: string) => {
        return axiosInstance.get<SearchResultType>(`${key}&s=${title}`)
            .then((response) => response.data)
    }
};


