import React, { useEffect, useState } from 'react'
import Form from '../components/Form';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const CreateCategory = ({token}) => {
      const [categories,setCategories] = useState([]);
      const [name,setName] = useState('');

        const getAllCategories = async () => {
          try {
            const res = await axios.get(backendUrl + '/api/category/all-categories',{headers: {token}});
      
              setCategories(res.data);
           
          } catch (error) {
            console.log(error.message);
          }
        }
      
        
        useEffect(() => {                
        },[])
      const handleCategory = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:4000/api/category/create',{name},{headers: {token}});
            if(data?.success){
                toast.success(data.message);
                getAllCategories()

            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
      }
      console.log(categories);
    
  return (
    <div className=''>
      <h1>Manage Category</h1>
     <div className='flex flex-col gap-3 sm:grid sm:grid-cols-2'>
     <div className='p-3 w-full'>
        <Form hangleSubmit={handleCategory} value={name} setValue={setName} />
        <div className='w-full'>

        <table className="table border w-full px-3">
  <thead>
    <tr className="bg-gray-200">
      <th className="px-4 py-2 text-left">Name</th>
      <th className="px-4 py-2 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories?.map((c) => (
      <tr key={c._id} className="border-b">
        <td className="px-4 py-2">{c.name}</td>
        <td className="px-4 py-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md">
            Edit
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md ml-2">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>
      {/* <div className='p-3 w-full'>
        <Form hangleSubmit={handleCategory} value={name} setValue={setName} />
      </div> */}
     </div>
      
    </div>
  )
}

export default CreateCategory
