
import { useDispatch, useSelector } from 'react-redux'
import { setBlogListOnInitialLoad,
         handleInputChange,
         handleDeleteBlog,
         setCurrentEditedBlogId
} from '../store/slices/blogSlice'

import {useEffect} from "react"

export default function BlogList() {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state);
  const { blogList } = blog;


       useEffect(() => {
        dispatch(
          setBlogListOnInitialLoad({
            blogList: JSON.parse(localStorage.getItem("blogList")) || [],
          })
        );
      }, []);
    
      function onDeleteBlog(getCurrentBlogId) {
        console.log(getCurrentBlogId);
        dispatch(
          handleDeleteBlog({
            currentBlogId: getCurrentBlogId,
          })
        );
      }

      function OnEditedBlog(getCurrentBlog){
        console.log(getCurrentBlog);
        dispatch(
          setCurrentEditedBlogId({
         currentBlogId: getCurrentBlog?.id,
          })
        )
     

      dispatch(handleInputChange({
        title:getCurrentBlog?.title,
        description:getCurrentBlog?.description
      }))
    };
       

  return (
    <div>
    
    <ul>
    {
      blogList?.length >0 ? blogList.map(singleBlogItem=><div style={{padding:"10px" ,border:"1px solid red"}} key={singleBlogItem.id}>
      <h3>{singleBlogItem?.title}</h3>
      <h3>{singleBlogItem?.description}</h3>
      <button 
      onClick={()=>OnEditedBlog(singleBlogItem)}
      >Edit Blog
      </button>
      <button 
      onClick={()=>onDeleteBlog(singleBlogItem?.id)}>
      Delete Blog
      </button>
    
        </div>)
        :
        <h2>No blog Added !Please add one</h2>
    }
      </ul>
    </div>
  )
}
