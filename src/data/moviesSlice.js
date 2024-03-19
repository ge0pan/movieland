import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return {data, apiUrl}
})

export const fetchNextPage = createAsyncThunk('fetch-movies-next-page', async (_, {getState}) => {
    const state = getState();
    const response = await fetch(`${state.movies.fetchUrl}&page=${state.movies.nFetchedPages + 1}`);
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        fetchUrl: '',
        fetchStatus: '',
        nFetchedPages: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload.data.results
            state.fetchUrl = action.payload.apiUrl
            state.nFetchedPages = 1
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })

        builder.addCase(fetchNextPage.fulfilled, (state, action) => {
            state.movies = [...state.movies, ...action.payload.results]
            state.nFetchedPages = action.payload.page
            state.fetchStatus = 'success'
        }).addCase(fetchNextPage.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchNextPage.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
