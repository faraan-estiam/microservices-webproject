'use client'
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";


export default function Page() {
  const [userId, setUserId] = useState(0)
  const [page, setPage]  = useState("login")
  if (page === "profile")
    return <Profile setPage={setPage} userId={userId}/>
  else if(page === "home") 
    return <Home setPage={setPage}/>
  else if (page ==="login")
    return <Login setUserId={setUserId} setPage={setPage}/>
}
