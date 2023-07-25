export const changeVal=function(val){
    return (dispatch)=>{
        dispatch({
            type:'Change',
            payload:val
        })
    }
}
export const resetVal=function(){
    return (dispatch)=>{
        dispatch({
            type:'Reset',
        })
    }
}