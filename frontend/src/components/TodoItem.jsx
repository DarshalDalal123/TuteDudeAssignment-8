import axios from 'axios';
import { toast } from "react-hot-toast";

const TodoItem = ({ todo, refresh, openModalFunction, deleteTodoFunction }) => {
  const changeStatus = async (id, status) => {
    const newStatus = status === "pending" ? "completed" : "pending";
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, { status: newStatus });
      console.log(res.data.message);
      toast.success(res.data.message);
      if (typeof refresh === "function") refresh();
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
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
      <div className='w-[25%] flex justify-center items-center gap-2'>
        <button 
          className='border border-gray-300 rounded-xl py-2 px-4 bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer'
          onClick={() => {openModalFunction(todo._id)}}
        >
          View/Edit
        </button>
        <button 
          className='border border-gray-300 rounded-xl py-2 px-4 bg-black text-white hover:bg-black/50 transition-colors duration-200 cursor-pointer'
          onClick={() => {deleteTodoFunction(todo._id)}}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem