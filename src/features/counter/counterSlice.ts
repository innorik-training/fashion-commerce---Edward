import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './counterAPI';
import Swal from 'sweetalert2'
import { itemsInterface } from '../../assets/interfaces';

export interface CounterState {
  value: number;
  amount : number;
  items : itemsInterface[];

}

const initialState: CounterState = {
  value: JSON.parse(localStorage.getItem('cart')!) ? JSON.parse(localStorage.getItem('cart')!).length : 0,
  amount : 0,
  items : JSON.parse(localStorage.getItem('cart')!) ? JSON.parse(localStorage.getItem('cart')!) : [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//Delete from cart
const deleteCart = (state:itemsInterface[][] , toPush: itemsInterface[],item_to_delete:itemsInterface[])=>{
  const temp:itemsInterface[] = [];
  console.log(item_to_delete);
  
  //remove from cart
  for (let index = 0; index < state.length; index++) {
    
    if (state[index][0].id !== item_to_delete[0].id) {
      temp.push(toPush[index]);
    }
  }
  return temp;
}

// check if item exists in cart
const findCartItem = (state_data:itemsInterface[][], cart_item:itemsInterface[]) =>{

  for (let index = 0; index < state_data.length; index++) {
    
    if (state_data[index][0].id === cart_item[0].id) {
      return true
    }
  }
  return(false);
}

//convert to json format [if need arises]
const toJson = (state:itemsInterface[][]) =>{
  const temp:itemsInterface[] = [];
  for (let index = 0; index < state.length; index++) {    
    temp.push(state[index][0])
  }
  return temp;
}


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    TO_CART: (state,item) => {
      const exists = findCartItem(JSON.parse(JSON.stringify(state.items)),item.payload);
      if (exists) {
        //item already exists
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: 'item already in cart',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        // number of items on cart
        state.value += 1;

        // updating item in redux store before pushing to local storage
        state.items.push(item.payload);


        localStorage.setItem('cart', JSON.stringify(state.items));
        
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'added to cart',
          showConfirmButton: false,
          timer: 1500
        })
      } 
    },

    REMOVE_CART : (state,item) => {
      // reducing current state for value[number of items on cart]
      state.value -= 1;

      //deleting from redux store before pushing to local storage
      const temp:itemsInterface[] = deleteCart(JSON.parse(JSON.stringify(state.items)),JSON.parse(JSON.stringify(state.items)),item.payload);

      // updating in local redux store
      state.items = temp;      

      // updating cart items in localstorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    SET_AMOUNT : (state,amount) => {
      state.amount += amount.payload;
    }
  },
  

});

export const { TO_CART, REMOVE_CART,SET_AMOUNT} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
