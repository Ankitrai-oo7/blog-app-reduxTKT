 
 import {createSlice, nanoid} from "@reduxjs/toolkit"

 const initialState={
        formData:{
                title:'',
                desccription:''
        },
        blogList:[],
        currentEditedBlogId:null,
 };
export const blogSlice = createSlice({
     name:'blog',
     initialState,
     reducers:{
          handleInputChange:(state,action)=>{
               console.log(state,action)
              let cpyFormData= {...state.formData};

              cpyFormData={
              ...cpyFormData,
              ...action.payload
              };
            state.formData=cpyFormData;
          },
          handleAddBlog:(state,action)=>{
               console.log("handle add blog is called");
           state.blogList.push({
               id: nanoid(),
               ...state.formData
           });
           state.formData={
              title:'',
              desccription:''
           }
           localStorage.setItem("blogList",JSON.stringify(state.blogList));
          },

          setBlogListOnInitialLoad:(state,action)=>{
             state.blogList =action.payload.blogList;
          },

          handleDeleteBlog: (state, action) => {
               console.log(action.payload);
               const { payload } = action;
               const { currentBlogId } = payload;
         
               let cpyBlogList = [...state.blogList];
         
               cpyBlogList = cpyBlogList.filter(
                 (singleBlogItem) => singleBlogItem.id !== currentBlogId
               );
         
               state.blogList = cpyBlogList;
               localStorage.setItem("blogList", JSON.stringify(cpyBlogList));
             },

             setCurrentEditedBlogId:(state,action)=>{
               console.log(action);
               const { payload } = action;
               const { currentBlogId } = payload;
               state.currentEditedBlogId = currentBlogId;

             },
               
          handleEditBlog:(state,action)=>{
                  console.log("handle edit blog is called");

                  let cpyBlogList = [...state.blogList]

                  let findIndexOfBlogItem= cpyBlogList.findIndex(singleBlogItem=>
                    singleBlogItem.id===state.currentEditedBlogId)
                   console.log(findIndexOfBlogItem);

                   cpyBlogList[findIndexOfBlogItem]={
                     ...cpyBlogList[findIndexOfBlogItem],
                     ...state.formData

                   }
                   state.blogList=cpyBlogList;
                   localStorage.setItem("blogList",JSON.stringify(cpyBlogList));
               },

     },
})

export const {
     handleInputChange,
     handleAddBlog,
     setBlogListOnInitialLoad,
     handleDeleteBlog,
     setCurrentEditedBlogId,
     handleEditBlog
}
     = blogSlice.actions;
 export default blogSlice.reducer;