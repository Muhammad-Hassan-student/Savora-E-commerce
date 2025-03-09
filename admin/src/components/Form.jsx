import React from "react";

const Form = ({hangleSubmit,value,setValue}) => {
  return (
    <div className="w-full mb-5">
      <form onSubmit={hangleSubmit} className="flex flex-col justify-start items-center gap-2 w-full">
        <label className="mb-2">
          <p>Create new Category</p>
          <input type="text" placeholder="Enter new category" className="w-full text-sm py-2 px-8" value={value} onChange={(e) => setValue(e.target.value)}/>
        </label>
        <button type="submit" className="bg-black px-24 py-2 text-white rounded-xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
