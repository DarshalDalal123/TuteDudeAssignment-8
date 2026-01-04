import axios from 'axios'
import React from 'react'

const TodoItem = ({ todo, refresh }) => {
  const changeStatus = async (id, status) => {
    const newStatus = status === "pending" ? "completed" : "pending";
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, { status: newStatus });
      console.log(res.data.message);
      if (typeof refresh === "function") refresh();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='flex flex-row border border-gray-300 rounded-xl py-4 px-6'>
      <div className='w-[5%] flex justify-center items-center'>
        <input type="checkbox" className='w-4 h-4' checked={todo.status === "completed"} onChange={() => changeStatus(todo._id, todo.status)} />
      </div>
      <div className='w-[70%]'>
        <h2 className='text-[16px]'>{todo.title}</h2>
        <p className='text-[14px]'>{todo.category}</p>
        <p className='text-[14px]'>{todo.description}</p>
      </div>
      <div className='w-[25%] flex justify-center items-center'>
        <button className='border border-gray-300 rounded-xl py-2 px-4 bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer'>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem