
import  { createContext, useState, useEffect } from 'react';
import { PostType, profiledataType } from '../../types/apps/userProfile';
import React from "react";
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { http, HttpResponse } from 'msw';
import posts from 'src/api/userprofile/PostData';
import { gallery, users } from 'src/api/userprofile/UsersData';
import { getFetcher, postFetcher } from 'src/api/globalFetcher';

// All Mocked UserProfile Apis
export const UserProfileHandlers = [
    // Api endpoint to fetch postData
    http.get('/api/data/postData', () => {
      return HttpResponse.json([200, posts])
    }),
  
    // Api endpoint to add posts likes 
    http.post('/api/data/posts/like' , async ({request}) => {
       try{
        const { postId } = await request.json() as {postId : number};
        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = { ...posts[postIndex] };
        post.data = { ...post.data };
        post.data.likes = { ...post.data.likes };
        post.data.likes.like = !post.data.likes.like;
        post.data.likes.value = post.data.likes.like
          ? post.data.likes.value + 1
          : post.data.likes.value - 1;
        posts[postIndex] = post;
    
        return HttpResponse.json([200, { posts: [...posts] }]);
       }catch(error){
      console.error(error);
      return HttpResponse.json([500, { message: 'Internal server error' }]);
       }
    }),
  
    // Api endpoint to add comment 
    http.post('/api/data/posts/comments/add' , async ({request}) => {
       try{
        const { postId, comment } = await request.json() as {postId:number , comment:any};
        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = posts[postIndex];
        const cComments = post.data.comments || [];
        post.data.comments = [...cComments, comment];
    
        return HttpResponse.json([200, { posts: [...posts] }]);
       }catch(error){
      console.error(error);
      return HttpResponse.json([500, { message: 'Internal server error' }]);
       }
    }),
      // Api endpoint to add replies 
      http.post('/api/data/posts/replies/add', async ({request}) => {
        try{
          const { postId, commentId, reply } = await request.json() as {postId:number , commentId : number, reply:any};
          const postIndex = posts.findIndex((x) => x.id === postId);
          const post = posts[postIndex];
          const cComments = post.data.comments || [];
          const commentIndex = cComments.findIndex((x) => x.id === commentId);
          const comment = cComments[commentIndex];
          if (comment && comment.data && comment.data.replies)
            comment.data.replies = [...comment.data.replies, reply];
      
          return HttpResponse.json([200, { posts: [...posts] }]);
        }catch(error){
          console.error(error);
          return HttpResponse.json([500, { message: 'Internal server error' }]);
        }
      }),
  
      // Api endpoint to add likes to replies
      http.post('/api/data/posts/replies/like',async ({request}) => {
         try{
          const { postId, commentId } = await request.json() as {postId : number , commentId:number};
          const postIndex = posts.findIndex((x) => x.id === postId);
          const post = posts[postIndex];
          const cComments = post.data.comments || [];
          const commentIndex = cComments.findIndex((x) => x.id === commentId);
          const comment = { ...cComments[commentIndex] };
      
          if (comment && comment.data && comment.data.likes)
            comment.data.likes.like = !comment.data.likes.like;
          if (comment && comment.data && comment.data.likes)
            comment.data.likes.value = comment.data.likes.like
              ? comment.data.likes.value + 1
              : comment.data.likes.value - 1;
          if (post && post.data && post.data.comments) post.data.comments[commentIndex] = comment;
      
          return HttpResponse.json([200, { posts: [...posts] }]);
         }catch(error){
          console.error(error);
          return HttpResponse.json([500, { message: 'Internal server error' }]);
         }
      }),

      http.get('/api/data/users',() => {
        return HttpResponse.json([200, users])
      }),

      http.get('/api/data/gallery' , () => {
        return HttpResponse.json([200, gallery])
      })
  ]


// Define context type
export type UserDataContextType = {
    posts: PostType[];
    users: any[];
    gallery: any[];
    loading: boolean;
    error: any;
    profileData: profiledataType;
    followers: any[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<any>>;
    addGalleryItem: (item: any) => void;
    addReply: (postId: number, commentId: number, reply: string) => void;
    likePost: (postId: number) => void;
    addComment: (postId: number, comment: string) => void;
    likeReply: (postId: number, commentId: number) => void;
    toggleFollow: (id: number) => void;
};

// Create context
export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Default config values
const config = {
    posts: [],
    users: [],
    gallery: [],
    followers: [],
    search: '',
    loading: true,
    error:null
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostType[]>(config.posts);
    const [users, setUsers] = useState<any[]>(config.users);
    const [gallery, setGallery] = useState<any[]>(config.gallery);
    const [followers, setFollowers] = useState<any[]>(config.followers);
    const [search, setSearch] = useState<string>(config.search);
    const [loading, setLoading] = useState<boolean>(config.loading);
    const [error, setError] = useState<any>(config.error);
    const [profileData] = useState<profiledataType>({
        name: 'Mathew Anderson',
        role: 'Designer',
        avatar: '/images/profile/user-1.jpg',
        coverImage: '/images/backgrounds/profilebg.jpg',
        postsCount: 938,
        followersCount: 3586,
        followingCount: 2659,
    });


    // SWR Api Request

    const {data:postData, isLoading:isPostDataLoading , error:postDataError} = useSWR('/api/data/postData',getFetcher);
    const {data:userData, isLoading:isUserDataLoading , error:userDataError} = useSWR('/api/data/users',getFetcher);
    const {data:galleryData, isLoading:isGalleryDataLoading , error:galleryDataError} = useSWR('/api/data/gallery',getFetcher);
    

    useEffect(() => {
        if(postData) {setPosts(postData[1]); setLoading(isPostDataLoading)}else{setError(postDataError)};
        if(userData) {
            setUsers(userData[1]);
            setFollowers(userData[1]);
             setLoading(isUserDataLoading)
            }else{setError(userDataError)};
        if(galleryData) {setGallery(galleryData[1]); setLoading(isGalleryDataLoading)}else{setError(galleryDataError)};
    }, [postData,userData,galleryData]);


    // Function to add a new item to the gallery
    const addGalleryItem = (item: any) => {
        setGallery((prevGallery) => [...prevGallery, item]);
    };

    // Function to toggle follow/unfollow status of a user
    const toggleFollow = (id: number) => {
        setFollowers((prevFollowers) =>
            prevFollowers.map((follower) =>
                follower.id === id ? { ...follower, isFollowed: !follower.isFollowed } : follower
            )
        );
    };

    // Function to filter followers based on search input
    const filterFollowers = () => {
        if (followers) {
            return followers.filter((t) =>
                t.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        return followers;
    };

    // Add comment to a post
     const {trigger:addCommentTrigger}  = useSWRMutation('/api/data/posts/comments/add',postFetcher);

    const addComment = async (postId: number, comment: string) => {
        try {
            const response = await addCommentTrigger({
                postId,
                comment,
            }) ;
             let status = response[0];

            if (status === 200) {
                const updatedPosts = response[1].posts;
                setPosts(updatedPosts);
            } else {
                console.error('Failed to add comment:', response[1].message);
            }
            mutate('/api/data/postData');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Add reply to a comment
    const {trigger:addReplyTrigger} = useSWRMutation('/api/data/posts/replies/add',postFetcher);

    const addReply = async (postId: number, commentId: number, reply: string) => {
        try {
            const response = await addReplyTrigger({
                postId,
                commentId,
                reply,
            });
            let status = response[0]

            if (status === 200) {
                const updatedPosts = response[1].posts;
                setPosts(updatedPosts);
            } else {
                console.error('Failed to add reply:', response[1].message);
            }
            mutate('/api/data/postData');
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    // Function to toggle like/unlike a post
    const {trigger:likePostTrigger} = useSWRMutation('/api/data/posts/like',postFetcher);

    const likePost = async (postId: number) => {
        try {
            const response = await likePostTrigger({ postId });
             let status = response[0];
            if (status === 200) {
                const updatedPosts = response[1].posts;
                setPosts(updatedPosts);
            } else {
                console.error('Failed to like post:', response[1].message);
            }
            mutate('/api/data/postData');
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    // Function to toggle like/unlike a reply to a comment
    const {trigger:likeReplyTrigger} = useSWRMutation('/api/data/posts/replies/like',postFetcher);

    const likeReply = async (postId: number, commentId: number) => {
        try {
            const response = await likeReplyTrigger({ postId, commentId });
             let status = response[0];
            if (status === 200) {
                const updatedPosts = response[1].posts;
                setPosts(updatedPosts);
            } else {
                console.error('Failed to like reply:', response[1].message);
            }
            mutate('/api/data/postData');
        } catch (error) {
            console.error('Error liking reply:', error);
        }
    };

    return (
        <UserDataContext.Provider value={{
            posts,
            users,
            gallery,
            loading,
            error,
            profileData,
            addGalleryItem,
            addReply,
            likePost,
            addComment,
            likeReply,
            followers: filterFollowers(),
            toggleFollow,
            setSearch,
            setLoading,
            setError,
            search
        }}>
            {children}
        </UserDataContext.Provider>
    );
};


