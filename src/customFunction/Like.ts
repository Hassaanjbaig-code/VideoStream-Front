import React from 'react'
import { useAddDisLikeMutation } from '../redux/FetchApi/VideoFetch/Video'
import { useDispatch } from 'react-redux'

const Like = (id: string | undefined) => {
//   let [addLike, { isSuccess, data, error }] = useAddDisLikeMutation()

const dispatch = useDispatch()
const promis = dispatch(api.FetchVideo.startVideo.matchFulfilled)
console.log(promis)

//   async function LikeAdd(id: string){
//     await addLike(id)
//     if (isSuccess) {
//         return true
//     } else {
//         return error
//     }
//   }
//   if(id== undefined) return false

//   return LikeAdd(id)
}

export default Like