
import  { createContext, useState, useEffect } from 'react';
import { PostType, profiledataType } from '../../types/apps/userProfile';
import React from "react";
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

// Define context type
export type UserDataContextType = {
    posts: PostType[];
    users: any[];
    gallery: any[];
    loading: boolean;
    profileData: profiledataType;
    followers: any[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
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
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostType[]>(config.posts);
    const [users, setUsers] = useState<any[]>(config.users);
    const [gallery, setGallery] = useState<any[]>(config.gallery);
    const [followers, setFollowers] = useState<any[]>(config.followers);
    const [search, setSearch] = useState<string>(config.search);
    const [loading, setLoading] = useState<boolean>(config.loading);
    const [profileData] = useState<profiledataType>({
        name: 'Mathew Anderson',
        role: 'Designer',
        avatar: '/images/profile/user-1.jpg',
        coverImage: '/images/backgrounds/profilebg.jpg',
        postsCount: 938,
        followersCount: 3586,
        followingCount: 2659,
    });

    // Fetcher Functions

    const getFetcher = (url:string) => fetch(url).then((res) => {
        if(!res.ok){
            throw new Error("Failed to fetch Data")
        }else{
            return res.json()
        }
    })

    const postFetcher = (url:string , {arg}:{arg:any}) => fetch(url,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(arg)
    }).then((res) => {
        if(!res.ok){
            throw new Error("Failed to add data")
        }else{
            return res.json()
        }
    })

    // SWR Api Request

    const {data:postData} = useSWR('/api/data/postData',getFetcher);
    const {data:userData} = useSWR('/api/data/users',getFetcher);
    const {data:galleryData} = useSWR('/api/data/gallery',getFetcher);
    

    useEffect(() => {
        if(postData && userData && galleryData){
            setPosts(postData[1]);
            setUsers(userData[1]);
            setGallery(galleryData[1]);
            setFollowers(userData[1]);
        }
        setLoading(false);
    }, []);


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
                const updatedPosts = response.data[1].posts;
                setPosts(updatedPosts);
            } else {
                console.error('Failed to add comment:', response[1].message);
            }
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
            profileData,
            addGalleryItem,
            addReply,
            likePost,
            addComment,
            likeReply,
            followers: filterFollowers(),
            toggleFollow,
            setSearch,
            search
        }}>
            {children}
        </UserDataContext.Provider>
    );
};


