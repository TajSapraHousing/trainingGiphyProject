const valueReducer = (state = '', action) => {
  if(action.type=='Change'){
      state= action.payload;
  }
  else{
      state= '';
  }
  return state;
};
export default valueReducer;