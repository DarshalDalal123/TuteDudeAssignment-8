import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";

const TodoModel = ({ setOpenModal, id, refresh }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    category: ""
  })
  const [loading, setLoading] = useState(false);
  const getTodoById = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/todos/${id}`)
      .then((res) => {
        setLoading(true);
        setTodo(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }
  const editTodo = async () => {
    console.log(todo);
    await axios.put(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
      title: todo.title,
      description: todo.description,
      category: todo.category
    })
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.data.message);
          toast.success(res.data.message);
          setTodo({
            title: "",
            category: "",
            description: ""
          })
          if (typeof refresh === "function") refresh();
          setOpenModal(false);
        } else {
          console.error(res.data.message);
          toast.error(res.data.message);
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setOpenModal(false);
      });
  }
  useEffect(() => { getTodoById() }, []);
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/80 z-50 top-0 left-0 w-full h-full'>
      <div className='bg-white p-6 mx-auto min-w-1/2 rounded-xl'>
        <div className='flex flex-row justify-between items-center w-full mb-5'>
          <h2 className='text-xl font-semibold'>View/Edit Modal</h2>
          <button
            type='button'
            className='bg-transparent text-gray-500 hover:text-gray-700 text-xl cursor-pointer'
            onClick={() => { setOpenModal(false) }}
          >
            &times;
          </button>
        </div>
        <div>
          {loading && <div>Loading...</div>}
          <div className='mb-5'>
            {
              !edit ?
                <div className='flex flex-col gap-3'>
                  <h2 className='text-[16px]'>{todo.title}</h2>
                  <p className='text-[14px]'>{todo.category}</p>
                  <p className='text-[14px]'>{todo.description}</p>
                </div>
                :
                <form className='flex flex-col gap-3 w-full'>
                  <input 
                    type="text" 
                    className='border border-gray-300 rounded-xl py-2 px-4 w-full' 
                    value={todo.title} 
                    onChange={(e) => setTodo(prev => ({ ...prev, title: e.target.value }))} 
                  />
                  <textarea 
                    className='border border-gray-300 rounded-xl py-2 px-4 w-full' 
                    value={todo.description} 
                    onChange={(e) => setTodo(prev => ({ ...prev, description: e.target.value }))} 
                  />
                  <select
                    className='border border-gray-300 rounded-xl py-2 px-3 w-full'
                    value={todo.category}
                    onChange={(e) => setTodo(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value={"Personal"}>Personal</option>
                    <option value={"Work"}>Work</option>
                    <option value={"Health"}>Health</option>
                    <option value={"Other"}>Other</option>
                  </select>
                </form>
            }
          </div>
        </div>
        <div className='flex flex-row justify-end gap-3'>
          {
            !edit ?
              <button
                type='button'
                className='border border-gray-300 rounded-xl py-2 px-4 bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer disabled:bg-black/50 disabled:cursor-not-allowed'
                onClick={() => { setEdit(true) }}
              >
                Edit
              </button>
              :
              <button
                type='button'
                className='border border-gray-300 rounded-xl py-2 px-4 bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer disabled:bg-black/50 disabled:cursor-not-allowed'
                disabled={todo.title == "" || todo.description == "" || todo.category == ""}
                onClick={() => {editTodo()}}
              >
                Done
              </button>
          }
          <button
            type='button'
            className='border border-gray-300 rounded-xl py-2 px-4 bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer'
            onClick={() => { setOpenModal(false) }}
          >
            {!edit ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoModel