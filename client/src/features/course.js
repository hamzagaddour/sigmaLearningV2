import {createSlice} from '@reduxjs/toolkit'

export const courseSlice = createSlice({
    name : "course",
    initialState : {value : {
        id : "",
        title :"",
        picture :"",
        description : "",
        dayDuration :"",
        idTeacher : "",
        nameTeacher:"",
        learners: [],
    }},
    reducers : {
        create: (state, action)=>{
            state.value = action.payload
        },

    }
})


export const {create} = courseSlice.actions
export default courseSlice.reducer