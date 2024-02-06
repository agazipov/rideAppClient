import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvent } from "../type/interface";

export const api = createApi({
    reducerPath: 'calendar',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
    endpoints: (bilder) => ({
        getRoute: bilder.query<IEvent[], void>({
            query: () => ({
                url: 'data',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            })
        })
    })
})

export const {
    useGetRouteQuery
} = api;