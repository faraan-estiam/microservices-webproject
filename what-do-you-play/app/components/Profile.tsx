'use client'
import axios, { Axios, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
const usersapi = axios.create({
  baseURL:'http://localhost:8082',
})

const FavoriteGames = [
  {
      "id": 1,
      "title": "League Of Legends",
      "img": null,
      "description": "Un jeu",
      "releasedate": null,
      "category": "Multiplayer Online Battle Arena"
  },
  {
      "id": 2,
      "title": "Apex Legends",
      "img": null,
      "description": "Un jeu de tir",
      "releasedate": null,
      "category": "FPS Battle Royale"
  },
  {
      "id": 3,
      "title": "Rocket League",
      "img": null,
      "description": "Un jeu de foot-voiture",
      "releasedate": null,
      "category": "Arcade Car Football"
  },
  {
      "id": 4,
      "title": "Undertale",
      "img": null,
      "description": "Un jeu basé sur l'histoire",
      "releasedate": null,
      "category": "Adventure"
  },
  {
      "id": 11,
      "title": "F1 2024",
      "img": null,
      "description": "Un jeu de course",
      "releasedate": null,
      "category": "Race"
  },
  {
      "id": 12,
      "title": "Assetto Corsa",
      "img": null,
      "description": "Un jeu de course",
      "releasedate": null,
      "category": "Race"
  }
]

const FavoriteGames2 = [
  {
      "id": 1,
      "title": "League Of Legends",
      "img": null,
      "description": "Un jeu",
      "releasedate": null,
      "category": "Multiplayer Online Battle Arena"
  },
  {
      "id": 3,
      "title": "Rocket League",
      "img": null,
      "description": "Un jeu de foot-voiture",
      "releasedate": null,
      "category": "Arcade Car Football"
  }
]

let games:any = []
for (let i=0; i<FavoriteGames.length; i++) {
  const game:any = FavoriteGames[i] 
  let item = (
    <div className={"grid grid-cols-5 content-center h-12 center px-2 my-2 bg-slate-500 rounded-md gameId"+game.id}>
        <p className="content-center">{game.title}</p>
        <p className='col-span-3'>{game.description}</p>
        <p className=''>{game.category}</p>
    </div>
  )
  games.push(item)
}

let games2:any = []
for (let i=0; i<FavoriteGames2.length; i++) {
  const game:any = FavoriteGames2[i] 
  let item = (
    <div className={"grid grid-cols-5 content-center h-12 center px-2 my-2 bg-slate-500 rounded-md gameId"+game.id}>
        <p className="content-center">{game.title}</p>
        <p className='col-span-3'>{game.description}</p>
        <p className=''>{game.category}</p>
    </div>
  )
  games2.push(item)
}


export default function Profile(props:any) {
  const [userData, setUserData]:any = useState({})
  useEffect(()=>{
    usersapi.get(`/users/${props.userId}`)
    .then((response:AxiosResponse)=>{
      setUserData(response.data)
    })
    .catch((error)=>{
      console.log(error.toJSON())
    })
  }, [])

  return (
  <main className="bg-slate-950 flex flex-col min-h-screen w-full  p-10">
    <button onClick={()=>props.setPage("home")} className='bg-slate-600 mx-auto mt-7 py-1.5 px-4 rounded-md'>Go to home</button>
    <div className="profile">
      <h2 className='text-3xl mt-6'>{userData?.firstname + ' ' + userData?.lastname}</h2>
      <h4 className='text-md'>{userData?.email}</h4>
      <div className='text-xs'>{userData?.birthdate}</div>
      <p>{userData?.bio}</p>
      <div>{userData?.discord}</div>
    </div>
    <h2 className='text-3xl my-6'>Favorite games</h2>
    <div className={'grid w-full'}>
      {props.userId==1?games:games2}
    </div>
  </main>
  );
}