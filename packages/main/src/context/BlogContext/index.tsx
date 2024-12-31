
import  { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { BlogPostType, BlogType } from '../../types/apps/blog';
import React from "react";
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr';
import {http , HttpResponse} from "msw"
import { BlogPost } from 'src/api/blog/blogData';
import { getFetcher, postFetcher } from 'src/api/globalFetcher';

// API Urls

// get request for blogs
let getBlogsUrl = '/api/data/blog/BlogPosts';
// Post request
let postBlogUrl = '/api/data/blog/post/add';



// Define BlogContextProps interface
export interface BlogContextProps {
    posts: BlogPostType[];
    sortBy: string;
    selectedPost: BlogPostType | null;
    isLoading: boolean;
    error: string;
    setPosts: Dispatch<SetStateAction<BlogPostType[]>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    setSelectedPost: Dispatch<SetStateAction<BlogPostType | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<any>>;
    addComment: (postId: number, newComment: BlogType) => void;
    fetchPostByTitle: (title: string) => Promise<void>;
}



// Mocked Apis
export const Bloghandlers = [

    // Mock api endpoint to fetch all blogposts
    http.get(getBlogsUrl,() => {
      return  HttpResponse.json([200, BlogPost])
    }),
  
    // Mock api endpoint to add post info
    http.post(postBlogUrl , async ({request}) => {
        try{
          const { postId, comment } = await request.json() as { postId: number , comment: string};
          const postIndex = BlogPost.findIndex((x) => x.id === postId);
          const post = BlogPost[postIndex];
          const cComments = post.comments || [];
          post.comments = [comment, ...cComments];
          return HttpResponse.json([200, { posts: [...BlogPost] }]);
        }catch(error){
           return HttpResponse.json([500, { message: 'Internal server error' }])
        }
    }) 
  ]

// Create context with default values
export const BlogContext = createContext<BlogContextProps>({
    posts: [],
    sortBy: 'newest',
    selectedPost: null,
    isLoading: true,
    error: '',
    setPosts: () => { },
    setSortBy: () => { },
    setSelectedPost: () => { },
    setLoading: () => { },
    setError: () => { },
    addComment: () => { },
    fetchPostByTitle: async () => { },
});

// BlogProvider component
export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [sortBy, setSortBy] = useState<string>('newest');
    const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>('');


    // Fetch Post data from the API
    const {data:BlogPostData,isLoading:isPostsLoading,error:getBlogsError} = useSWR(getBlogsUrl,getFetcher);

    useEffect(() => {
        if(BlogPostData){
            setPosts(BlogPostData[1]);
            setLoading(isPostsLoading);
        }else{
            setLoading(isPostsLoading);
        }
        if(getBlogsError){
            setError(getBlogsError);
        }
    }, [BlogPostData]);

    // Adds a new comment to a specific post by updating the state.
    const addComment = (postId: number, newComment: BlogType) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, comments: [newComment, ...(post.comments || [])] } : post
            )
        );
    }

    // Fetches a specific blog post by its title from the API endpoint and updates the selected post in the state.
    const {trigger:addBlogPostTrigger} = useSWRMutation(postBlogUrl , postFetcher);

    const fetchPostByTitle = async (title: string) => {
        try {
            const data = await addBlogPostTrigger({title});
            mutate('/api/data/blog/BlogPosts');
            setSelectedPost(data[1].post);
        } catch (error) {
            console.error('Error fetching blog post:', error);
            setError(error)
        }
    };

    const value: BlogContextProps = {
        posts,
        sortBy,
        selectedPost,
        isLoading,
        setPosts,
        setSortBy,
        setSelectedPost,
        setLoading,
        addComment,
        fetchPostByTitle,
        error,
        setError
    };

    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
