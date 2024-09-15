import { useGSAP } from '@gsap/react'
import LinkButton from './pages/LinkButton'
import gsap from 'gsap'
import { Route, Routes } from 'react-router-dom'
import ToDolist from './pages/ToDolist'
import WeatherApp from './pages/WeatherApp.tsx'
import Quiz from './pages/Quiz.tsx'

function App() {
  
  useGSAP(() => {
 gsap.to('#title', {
 duration: 0.8,
 opacity: 1,
 x: 0,
 ease: 'power4.out',
 })

 gsap.to('#button', {
 delay: 0.8,
 duration: 0.3,
 y: 0,
 stagger: 0.3,
 opacity:1,
 ease: 'power4.out',
 })

  }, [])
  return (
    <div className='w-full flex flex-col gap-5 items-center pt-[10rem] bg-black'>
     <p className='bg-gradient-to-r
      from-amber-300 via-amber-500
      to-amber-600 bg-clip-text text-transparent
       capitalize
       text-3xl font-bold opacity-0 -translate-x-[10rem]'
       id='title'>Welcome to the App</p>

<div className='flex gap-3'>
       <LinkButton to='/to-do'>To Do App</LinkButton>
       <LinkButton to='/weather-app'>Weather App</LinkButton>
       <LinkButton to='/quiz'>Quiz App</LinkButton>
</div>

<Routes>
  <Route path='/to-do' element={<ToDolist/>}/>
  <Route path='/weather-app' element={<WeatherApp/>}/>
  <Route path='/quiz' element={<Quiz/>}/>
</Routes>
    </div>
  )
}

export default App
