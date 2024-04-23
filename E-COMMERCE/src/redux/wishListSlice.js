import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("wishlist")) ?? [];

const wishListSlice = createSlice({
    name:"wishList",
    initialState,
    reducers:{
        addToWishlist(state,action){
            state.push(action.payload)
        },
        deletFromWishlist(state,action){
            
            return state.filter((item)=> item.id !== action.payload);
            
        }
    }
});

export const {addToWishlist,deletFromWishlist} = wishListSlice.actions;
export default wishListSlice.reducer;