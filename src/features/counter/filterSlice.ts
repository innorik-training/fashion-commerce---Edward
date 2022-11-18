import { createSlice} from '@reduxjs/toolkit';
import { itemsInterface } from '../../assets/interfaces';

export interface CounterState {
  filtered_items : itemsInterface[]
}

const initialState: CounterState = {
  filtered_items : [],
};


//SLICE
export const filterSlice = createSlice({
  name: 'filter',
  initialState,

  // Reducers
  reducers: {
    
    SET_FILTER : (state,filter) => {
      state.filtered_items = filter.payload
    }
  },
  

});

export const {SET_FILTER} = filterSlice.actions;

export default filterSlice.reducer;
