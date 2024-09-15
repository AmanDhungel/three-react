import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react'
import { toast } from 'react-toastify';

const Quiz = () => {
  const [score , setScore] = useState(0);
  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "London", "Madrid"],
      correct: 1,
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Saturn", "Jupiter", "Uranus"],
      correct: 2,
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
      correct: 0,
    },
  ];

  useGSAP(() => {
    gsap.to('#quiz', {
      duration: 0.3,
      opacity: 1,
      x: 0,
      stagger:0.3,
      ease: 'power1.inOut',
    })
  }, [])
  return (
    <div className='flex flex-col gap-3' >
      {quizData.map((quiz, index) => (
        <div key={index} className='flex flex-col text-white gap-2 opacity-0 -translate-x-[10rem]' id='quiz'>
          <p>{quiz.question}</p>
          {quiz.options.map((option, i) => (
            <label key={i} className='flex bg-gray-400 p-3 rounded-lg gap-3'>
              <input
                type="radio"
                name={quiz.question}
                value={option}
                onChange={() => {
                  if (i === quiz.correct) {
                    setScore(score + 1);
                  } 
                }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button className='p-3 bg-slate-400 rounded-xl mt-10 mb-10' onClick={() => {toast.success(`your score is ${score}`); setScore(0);}}>Submit</button>
    </div>
  )
}

export default Quiz