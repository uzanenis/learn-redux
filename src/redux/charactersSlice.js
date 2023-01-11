import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api"
export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page) => {
    const res = await axios.get(`${BASE_URL}/character/?page=${page}`)
    return res.data.results
})
export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        isLoading: false,
        page: 1,
    },
    reducers: {},
    extraReducers: {
        [fetchCharacters.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchCharacters.fulfilled]: (state, action) => {
            state.items = [...state.items,...action.payload]
            state.isLoading = false
            state.page += 1;
        },
        [fetchCharacters.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        }
    }
})

export default charactersSlice.reducer;