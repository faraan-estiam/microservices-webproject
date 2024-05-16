import axios, { AxiosError, AxiosResponse } from "axios";
const authapi = axios.create({
  baseURL:'http://localhost:8081',
})

export default function Login(props: any) {
  function formConnect() {
    const usrnm = (document.getElementById('username') as HTMLInputElement).value
    const pswrd = (document.getElementById('password') as HTMLInputElement).value
    authapi.post("/auth/login", {
      username: usrnm,
      password: pswrd
    })
    .then((response: AxiosResponse)=>{
      props.setUserId(response.data.userId)
      props.setPage("home")
    })
    .catch((error)=>{
      alert(error.toJSON().message)
      props.setUserId(0)
    })
  }

  return (
    <main className="grid h-screen w-full">
      <div className='bg-slate-950 flex flex-col justify-center'>
        <div className='max-w-[400px] w-full mx-auto rounded-lg bg-slate-900 p-8 px-8'>
          <h2 className='text-4xl dark:text-white font-bold text-center'>CONNEXION</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Email</label>
            <input id="username" type="email" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-slate-600 focus:bg-gray-600 focus:outline-none' />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input id="password" type="password" className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-slate-600 focus:bg-gray-600 focus:outline-none' />
          </div>
          <button className='w-full mt-5 py-2 bg-blue-500 hover:bg-blue-600 duration-100 ease-linear text-white font-semibold rounded-lg' >Créer un compte</button>
          <button onClick={()=>{return formConnect()}} className='w-full mt-5 py-2 bg-green-600 hover:bg-green-700 duration-100 ease-linear text-white font-semibold rounded-lg' >Se connecter</button>
        </div>
      </div>
    </main>
  );
}