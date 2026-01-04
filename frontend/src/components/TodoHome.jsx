import { useState, useEffect } from 'react';
import axios from "axios"
import TodoItem from './TodoItem';
import Loader from './Loader';

const TodoHome = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(false);

  const addTodo = async(e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/api/todos`, {
      title: newTodo.title,
      description: newTodo.description,
      category: newTodo.category,
      status: "pending"
    })
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.data.message)
          getTodos();
        }
        else {
          console.error(res.data.message)
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setNewTodo({
          title: "",
          description: "",
          category: ""
        });
      });
  }

  const getTodos = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/todos?title=${searchTitle}&category=${searchCategory}`)
      .then((res) => {
        setLoading(true);
        if (res.data.success === true) {
          setTodos(res.data.data)
          setPending(res.data.counts.pending)
          setCompleted(res.data.counts.completed)
        }
        else {
          console.error(res.data.message)
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);
        setSearchTitle("");
      });
  }

  useEffect(() => {
    getTodos();
  }, [searchCategory])
  return (
    <>
      {loading && <Loader />}
      <div className='mt-5 mx-auto max-w-[70%]'>
        <div className='space-y-1'>
          <h1 className='text-center text-3xl font-bold'>My Todo List</h1>
          <h4 className='text-center text-lg text-gray-400'>Organize your day to day tasks efficiently</h4>
        </div>
        <div className='grid grid-cols-3 gap-3 my-4'>
          <div className='border border-gray-300 rounded-xl py-3 px-4'>
            <p className='text-[16px]'>Pending</p>
            <p className='text-[14px]'>{pending}</p>
          </div>
          <div className='border border-gray-300 rounded-xl py-3 px-4'>
            <p className='text-[16px]'>Completed</p>
            <p className='text-[14px]'>{completed}</p>
          </div>
          <div className='border border-gray-300 rounded-xl py-3 px-4'>
            <p className='text-[16px]'>Total</p>
            <p className='text-[14px]'>{pending + completed}</p>
          </div>
        </div>
        <div className='border border-gray-300 rounded-xl py-4 px-4 my-4 space-y-2'>
          <h1 className='font-bold text-[18px]'>Add New Todo</h1>
          <form className='flex flex-col space-y-2' onSubmit={addTodo}>
            <input
              type="text" 
              className='border border-gray-300 rounded-xl py-2 px-3 w-full' 
              placeholder='Title'
              value={newTodo.title}
              onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
            />
            <textarea 
              className='border border-gray-300 rounded-xl py-2 px-3 w-full' 
              placeholder='Description'
              value={newTodo.description}
              onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
            />
            <select 
              className='border border-gray-300 rounded-xl py-2 px-3'
              value={newTodo.category}
              onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value={"Personal"}>Personal</option>
              <option value={"Work"}>Work</option>
              <option value={"Health"}>Health</option>
              <option value={"Other"}>Other</option>
            </select>
            <button 
              type='submit' 
              className='border border-gray-300 bg-black text-white rounded-xl py-3 px-6 text-[14px] hover:bg-black/50 transition-colors duration-200 cursor-pointer'
            >
              Add Todo
            </button>
          </form>
        </div>
        <div className='border border-gray-300 rounded-xl py-4 px-4 my-4 space-y-2'>
          <h1 className='font-bold text-[18px]'>Filter By Category</h1>
          <div className='flex flex-row gap-3'>
            <button 
              type='button' 
              className={`border border-gray-300 rounded-xl py-1.5 px-6 text-[14px] cursor-pointer ${searchCategory === "" && "bg-black text-white"}`}
              onClick={() => {setSearchCategory("")}}
            >
              All
            </button>
            <button 
              type='button' 
              className={`border border-gray-300 rounded-xl py-1.5 px-6 text-[14px] cursor-pointer ${searchCategory === "Personal" && "bg-black text-white"}`}
              onClick={() => { setSearchCategory("Personal") }}
            >
              Personal
            </button>
            <button 
              type='button' 
              className={`border border-gray-300 rounded-xl py-1.5 px-6 text-[14px] cursor-pointer ${searchCategory === "Work" && "bg-black text-white"}`}
              onClick={() => { setSearchCategory("Work") }}
            >
              Work
            </button>
            <button 
              type='button' 
              className={`border border-gray-300 rounded-xl py-1.5 px-6 text-[14px] cursor-pointer ${searchCategory === "Health" && "bg-black text-white"}`}
              onClick={() => { setSearchCategory("Health") }}
            >
              Health
            </button>
            <button 
              type='button' 
              className={`border border-gray-300 rounded-xl py-1.5 px-6 text-[14px] cursor-pointer ${searchCategory === "Other" && "bg-black text-white"}`}
              onClick={() => { setSearchCategory("Other") }}
            >
              Other
            </button>
          </div>
        </div>
        <div className='border border-gray-300 rounded-xl py-4 px-4 my-4 space-y-2'>
          <h1 className='font-bold text-[18px]'>All Tasks</h1>
          <div className='flex flex-row gap-3'>
            <div className='w-[80%]'>
              <input 
                type="text" 
                className='border border-gray-300 rounded-xl py-2 px-3 w-full' 
                placeholder='Search...'
                value={searchTitle}
                onChange={(e) => { setSearchTitle(e.target.value) }}
              />
            </div>
            <div className='w-[20%]'>
              <button 
                type='button' 
                className='border border-gray-300 rounded-xl py-2 px-4 w-full bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer'
                onClick={() => { getTodos() }}
              >
                Search
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} refresh={getTodos} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoHome