import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClient, IEvent, ILoginForm, IRide, IUserResponse, ListResponse } from "../../type/interface";
import { RootState } from "../index";

interface ICustomErr {
    message: string
}

export const api = createApi({
    reducerPath: 'calendar',
    tagTypes: ['Route', 'Ride', 'Client'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers, { getState }) => {
            // const token = window.localStorage.getItem('token');
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (bilder) => ({

        entry: bilder.mutation<IUserResponse, ILoginForm>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            }),
        }),

        getRoute: bilder.query<IEvent[], void>({
            query: () => ({
                url: 'data',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Route' as const, id })),
                        { type: 'Route', id: 'LIST' },
                    ]
                    : [{ type: 'Route', id: 'LIST' }],
        }),

        getRide: bilder.query<IRide[], string>({
            query: (eventID) => ({
                url: 'ride',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: { id: eventID }
            }),
            transformResponse: (response: IRide[]) => response.map((ride) => ({
                ...ride,
                passengers: ride.passengers.map(client => {
                    if (client.name) {
                        client.isFind = true;
                    }
                    return client;
                })
            })),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Ride' as const, id })),
                        { type: 'Ride', id: 'LIST' },
                    ]
                    : [{ type: 'Ride', id: 'LIST' }],
        }),

        getClients: bilder.query<ListResponse<IClient>, number | void>({
            query: (pageNumber = 1) => `clients?page=${pageNumber}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.content.map(({ id }) => ({ type: 'Client' as const, id })),
                        { type: 'Client', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Client', id: 'PARTIAL-LIST' }],
        }),

        getClientByPhone: bilder.query<IClient & ICustomErr, string>({
            query: (phone) => ({
                url: 'getclient',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: { phone },
            }),
            providesTags: (result) =>
                result
                    ? [
                        { type: 'Client' as const, id: result.id },
                        { type: 'Client', id: 'LIST' },
                    ]
                    : [{ type: 'Client', id: 'LIST' }],
        }),

        addRoute: bilder.mutation<IEvent, IEvent>({
            query: (route) => ({
                url: 'addroute',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: route
            }),
            invalidatesTags: [{ type: 'Route', id: 'LIST' }]
        }),

        changeRide: bilder.mutation<IRide, IRide>({
            query: (ride) => ({
                url: 'change',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: ride
            }),
            invalidatesTags: (result) => [{ type: 'Ride', id: result?.id }, { type: 'Route', id: result?.route }]
        }),

        addRide: bilder.mutation<IRide, IRide>({
            query: (ride) => ({
                url: 'addride',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: ride
            }),
            invalidatesTags: (result) => [{ type: 'Ride', id: 'LIST' }, { type: 'Route', id: result?.route }]
        }),

        deleteRide: bilder.mutation<IRide, IRide>({
            query: (ride) => ({
                url: 'delride',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: ride
            }),
            invalidatesTags: (result) => [{ type: 'Ride', id: result?.id }, { type: 'Route', id: result?.route }]
        }),

        deleteRoute: bilder.mutation<IEvent, string>({
            query: (routeID) => ({
                url: 'delroute',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: { id: routeID }
            }),
            invalidatesTags: (result) => [{ type: 'Route', id: result?.id }]
        }),
    })
})

export const {
    useEntryMutation,
    useGetRouteQuery,
    useGetRideQuery,
    useLazyGetClientByPhoneQuery,
    useGetClientsQuery,
    useChangeRideMutation,
    useAddRideMutation,
    useDeleteRideMutation,
    useAddRouteMutation,
    useDeleteRouteMutation
} = api;

export const useGetRouteState = api.endpoints.getRoute.useQueryState; 