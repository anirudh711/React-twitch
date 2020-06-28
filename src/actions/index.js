import streams from '../apis/streams';
import history from '../history'
import {SIGN_IN,
        SIGN_OUT,
        CREATE_STREAM,
        DELETE_STREAM,
        EDIT_STREAM,
        FETCH_STREAMS,
        FETCH_STREAM,
    } from './types'
export const signIn=(userId)=>{

    return {
        type:SIGN_IN,
        payload:userId
    };
};
export const signOut =()=>{
    return {
        type:SIGN_OUT
    };
};
//stream action creators max

//this is creating a stream
export const createStream =(formValues)=>{
    return async(dispatch,getState)=>{
        const {userId}=getState().auth;
        const response=await streams.post('/streams',{...formValues,userId})
        dispatch({type:CREATE_STREAM, payload:response.data})
        //writing own history object to programmatically navigate
        history.push('/')
    }
}
//this fetches more than one stream(array of data)
export const fetchStreams=()=>async dispatch=>{
    const response=await streams.get('/streams');

    dispatch({type:FETCH_STREAMS,payload:response.data})
}
//this fetches one single stream of id
export const fetchStream=(id)=>async dispatch=>{
    const response=await streams.get(`/streams/${id}`);

    dispatch({type:FETCH_STREAM,payload:response.data})
}
//this edits the stream w the id
export const editStream=(id,formValues)=>async dispatch=>{
    const response=await streams.patch(`/streams/${id}`,formValues);

    dispatch({type:EDIT_STREAM,payload:response.data})
    history.push('/');
}
//this deletes the stream w the id
export const deleteStream=(id)=>async dispatch=>{
    await streams.delete(`/streams/${id}`);

    dispatch({type:DELETE_STREAM,payload:id})
}