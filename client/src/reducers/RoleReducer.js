export const  initialState=parseInt(localStorage.getItem('role'));
export const reducer=(state,action)=>{
    if(action.type==="USER")
    {
        return action.payload;
    }
    
    return state;
}