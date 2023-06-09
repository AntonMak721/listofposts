import React, { useEffect, useRef} from "react";
import { useState } from "react";
import "../styles/App.css";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MySelect from "../components/UI/select/MySelect";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFatching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortredAndSeachedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    
    const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page)=>{
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
  
    });
    
    useObserver(lastElement, page < totalPages, isPostLoading, ()=>{
      setPage(page + 1);
    })
   
    useEffect(() => {
      fetchPosts(limit, page);
    }, [page, limit]);
      
    const createPost = (newPost) => {
      setPosts([...posts, newPost]);
      setModal(false);
    };
  
    // Получает post из дочернего компонента, то есть от чилдрена
    const removePost = (post) => {
      setPosts(posts.filter((p) => p.id !== post.id));
    };
  
  
    const changePage = (page) =>{
      setPage(page);
      
    }
  
    return (
      <div className="App">
        <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
          Создать мэм
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
  
        <hr style={{ margin: "15px 0" }} />
        <PostFilter filter={filter} setFilter={setFilter} />

        <MySelect
          value={limit}
          onChange={value=> setLimit(value)}
          defaultValue="Кол-во элементов на странице"
          options={[
            {value:5, name:'5'},
            {value:10, name:'10'},
            {value:25, name:'25'},
            {value:-1, name:"Показать все"},
          ]}
        ></MySelect>

        {postError &&
         <h1> Произошла ошибка ${postError}</h1>}
        <PostList
          remove={removePost}
          posts={sortredAndSeachedPosts}
          title="Мэмы"
        />
        <div ref={lastElement} style={{marginTop:10, height:3, background: 'green'}} />
        {isPostLoading &&
          <div style={{display :'flex' , justifyContent:'center' , marginTop:50 }} ><Loader/></div> 
        }
        
         
        <Pagination 
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />
      </div>
    );
  }

export default Posts;