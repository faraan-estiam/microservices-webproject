'use-client'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
const usersapi = axios.create({
  baseURL:'http://localhost:8082',
})
const gamesapi = axios.create({
  baseURL:'http://localhost:8083',
})

type Game = {
  id: number,
  title: string
}

export default function Home(props:any) {
  const [data, setData] = useState([])
  let games=[]

  useEffect(()=>{
    gamesapi.get('/games')
    .then((response:AxiosResponse)=>{
      setData(response.data)
    })
    .catch((error)=>{
      console.log(error.toJSON())
    })
  },[])

  for (let i=0; i<data.length; i++) {
    const game:Game = data[i] 
    let item = (
      <div className={"grid grid-rows-4 h-52 m-2 bg-slate-500 rounded-md gameId"+game.id}>
          <h6 className="text-center p-1.5 row-start-2">{game.title}</h6>
          <button className="bg-pink-400 mx-2 mb-2 row-start-4 rounded-lg hover:bg-pink-500 duration-100 ease-linear">{'<3'}</button>
      </div>
    )
    games.push(item)
  }

  return (
    <main className="bg-slate-950 flex flex-col min-h-screen w-full">
      <button onClick={()=>props.setPage("profile")} className='bg-slate-600 mx-auto mt-7 py-1.5 px-4 rounded-md'>Go to profile</button>
      <div className={'grid grid-cols-2 sm:grid-cols-4 w-full p-10'}>
        {games}
      </div>
    </main>
  )
}