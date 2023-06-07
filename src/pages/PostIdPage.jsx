import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFatching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {

    const params = useParams();
    const [post, setPost] = useState({})
    const[comments, setComments] = useState([])
    console.log(params);
    const [fetchPostById, isLoading, error] = useFetching( async (id)=>{
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isCommentLoading, commentError] = useFetching( async (id)=>{
        const response = await PostService.getCommentByPostId(id);
        setComments(response.data);
    });

    useEffect(()=>{
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id} </h1>
            {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
            }
            <h2>Комментарии:</h2>
            {isCommentLoading
            ? <Loader/>
            : <div>
                {comments.map(comm =>
                    <div key={comm.id} style={{marginTop : 15}}>
                        <h4>{comm.email}</h4>
                        <span>{comm.body}</span>   
                    </div>
                )}
              </div>
            }
        </div>
    );
};

export default PostIdPage;