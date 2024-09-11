
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { handleInputChange , handleAddBlog,setCurrentEditedBlogId, handleEditBlog} from '../store/slices/blogSlice'
function AddNewBlog() {
        const {blog} =useSelector((state)=>state)
        const dispatch = useDispatch()

        const {currentEditedBlogId} = blog;

        function onChangeInput(event){
                dispatch(
                  handleInputChange({
                        [event.target.name]:event.target.value,
                })
              );
        }
        function handleBlogSubmit(e){
          
           e.preventDefault();
           if(blog.currentEditedBlogId!==null)dispatch(handleEditBlog())
           
           else dispatch(handleAddBlog());

           if(blog.currentEditedBlogId!==null)
            dispatch(
            setCurrentEditedBlogId({
            currentBlogId:null
           })
          );
          
           dispatch(
          handleInputChange({
           
            description:"",
             title:""
           })
          );
           }


  return (
    <div>
    <form onSubmit={handleBlogSubmit}>
    <div>
      <label>Enter Blog Title</label>
      <input type='text'
      name='title'
      placeholder='Enter blog title'
      id='title'
      onChange={onChangeInput}
      value={blog?.formData?.title}
      />
      </div>
      <div>
      <label>Enter Blog Description</label>
      <input type='text'
      name='description'
      placeholder='Enter blog description'
      id='description'
      onChange={onChangeInput}
      value={blog?.formData?.description}
      />
      </div>
      
      <button 
       type='submit'>
       {blog?.currentEditedBlogId ? "Edit blog":"Add New Blog"}
       
       </button>
     </form>
    </div>
  );
  }

export default AddNewBlog