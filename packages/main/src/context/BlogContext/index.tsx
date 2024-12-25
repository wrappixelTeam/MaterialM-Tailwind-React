
import  { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { BlogPostType, BlogType } from '../../types/apps/blog';
import React from "react";
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr';

// Define BlogContextProps interface
export interface BlogContextProps {
    posts: BlogPostType[];
    sortBy: string;
    selectedPost: BlogPostType | null;
    isLoading: boolean;
    setPosts: Dispatch<SetStateAction<BlogPostType[]>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    setSelectedPost: Dispatch<SetStateAction<BlogPostType | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    addComment: (postId: number, newComment: BlogType) => void;
    fetchPostByTitle: (title: string) => Promise<void>;
}

// Create context with default values
export const BlogContext = createContext<BlogContextProps>({
    posts: [],
    sortBy: 'newest',
    selectedPost: null,
    isLoading: true,
    setPosts: () => { },
    setSortBy: () => { },
    setSelectedPost: () => { },
    setLoading: () => { },
    addComment: () => { },
    fetchPostByTitle: async () => { },
});

// BlogProvider component
export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [sortBy, setSortBy] = useState<string>('newest');
    const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    // SWR fetcher functions

    const getFetcher = (url:string) => fetch(url).then((res) => {
        if(!res.ok){
            throw new Error("Failed to fetch Blogs")
        }else{
            return res.json()
        }
    })

    const postFetcher = (url:string,{arg}:{arg:any}) => fetch(url,{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(arg)
    }).then((res) => {
        if(!res.ok){
            throw new Error("Failed to post blog data")
        }else{
            return res.json()
        }
    })


    // Fetch Post data from the API
    const {data:BlogPostData} = useSWR('/api/data/blog/BlogPosts',getFetcher);

    useEffect(() => {
        if(BlogPostData){
            setPosts(BlogPostData[1]);
            setLoading(false);
        }else{
            setLoading(false);
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
    const {trigger:addBlogPostTrigger} = useSWRMutation("/api/data/blog/post" , postFetcher);

    const fetchPostByTitle = async (title: string) => {
        try {
            const data = await addBlogPostTrigger({title});
            setSelectedPost(data[1].post);
        } catch (error) {
            console.error('Error fetching blog post:', error);
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
    };

    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
