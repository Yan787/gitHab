import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IRepo, IUser, ServerResponse } from '../../models/models'

export const githubApi = createApi({
    reducerPath: 'github/api', /* - По какому адресу у нас хранится все закошированные данные*/
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.github.com/'
    }),
       /*соединяет серверные процессы приложения с внешним интерфейсом*/
       refetchOnFocus: true,
       endpoints: build => ({
        searchUsers: build.query<IUser[], string>({  /* 1 получаем ответ от сервера / 2 какой параметр мы хотим принимать чтобы осуществить запрос */
          query: (search: string) => ({
            url: `search/users`,
            params: {
              q: search,
              per_page: 10
            },
          }),
            transformResponse: (response: ServerResponse<IUser>) => response.items
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (userName: string) => ({
              url: `users/${userName}/repos`
            })
          }),

    })
    
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi
            /* кастомный хуки */ /* Lazy - можем сделать запрос когда мы хотим */