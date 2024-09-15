import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { toast } from "react-toastify";

const ToDolist = () => {
  const [list, setList] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useGSAP(() => {
    gsap.to('#to-do', {
      duration: 0.3,
      opacity: 1,
      x: 0,
      ease: 'power1.inOut',
      })
  }) 
  
  useGSAP(() => {
    gsap.to('#items', {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power1.inOut',
    })
  }, [list])

  const addToList = () => {
    if (!text) {
      return toast.error('Fill in all the input');
    }
    setList([...list, text]);
    setCheckedItems([...checkedItems, false]); // Add corresponding checkbox state as false initially
    setText('');
  };

  const handleCheck = (index: number) => {
    const updatedCheckedItems = checkedItems.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="min-h-[40rem] bg-black">
      <div className="flex gap-2 -translate-x-[20rem] opacity-0" id="to-do">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="What needs to be done?"
          maxLength={22}
          onKeyDown={(e) => e.key === 'Enter' && addToList()}
          className="p-3 border-red-400 rounded-xl border-2"
        />
        <button
          className="bg-gradient-to-bl from-emerald-300 via-emerald-500 to-emerald-600 p-2 rounded-xl w-[5rem]"
          onClick={addToList}
        >
          Add
        </button>
        <button
          className="bg-gradient-to-bl from-red-300 via-red-500 to-red-600 p-2 rounded-xl w-[5rem]"
          onClick={() => setText('')}
        >
          Clear
        </button>
      </div>

      <ul>
        {list.length > 0 &&
          list.map((item, index) => (
            <li
              key={index}
              className={`flex ${
                checkedItems[index] ? 'bg-green-500' : 'bg-slate-500'
              } mt-3 gap-3 text-white p-5 items-center justify-between  w-[24rem] rounded-xl translate-y-10`}
              id="items"
            >
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheck(index)}
              />
              <p
                className={`text-white ${
                  checkedItems[index] ? 'line-through bg-green-500' : 'bg-slate-500 '
                } text-left justify-start w-52 transition duration-1000 `}
              >
                {item}
              </p>
              <div className={`flex ${
                checkedItems[index] ? ' bg-green-500' : ''
              }  bg-slate-500 gap-1`}>
                <button
                  className="bg-gradient-to-bl from-red-300 via-red-500 to-red-600 p-3 px-5 text-center rounded-lg w-[5rem]"
                  /**
                   * This function will remove the item from the list
                   * It will also remove the corresponding checked item from the checkedItems array
                   * It will use the index of the item as the key to remove it from the lists
                   */
                  onClick={() => {
                    setList((prev) => [
                      ...prev.slice(0, index),
                      ...prev.slice(index + 1),
                    ]);
                    setCheckedItems((prev) => [
                      ...prev.slice(0, index),
                      ...prev.slice(index + 1),
                    ]);
                  }}
                >
                  Delete  
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ToDolist;
