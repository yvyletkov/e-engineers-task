import React, {useEffect, useState} from 'react'
import usePrevious from '../customHooks/usePrevious'
import {Avatar, List} from "antd"
import API from "../data/api/api"
import {Post} from "../data/types"

interface FeedProps {
    feedUrl: string,
    updateInterval: number,
    postsToShow: number
}

const Feed: React.FC<FeedProps> = ({
                                       feedUrl,
                                       updateInterval,
                                       postsToShow
                                   }) => {

    const [fetchedData, setFetchedData] = useState<Post[]>()
    const [posts, setPosts] = useState<Post[]>()
    const prevFetchedData: Post[] = usePrevious(fetchedData)

    useEffect(() => {
        const interval = setInterval(() => {
            new API().fetchPosts(feedUrl).then(setFetchedData)
        }, updateInterval)
        return () => clearInterval(interval)
    }, [updateInterval])

    // optimization
    useEffect(() => {
        if (JSON.stringify(fetchedData) !== JSON.stringify(prevFetchedData)) {
            setPosts(fetchedData.slice(0, postsToShow - 1))
        }
    }, [fetchedData, prevFetchedData])

    return <List
            itemLayout="vertical"
            loading={!fetchedData}
            size="large"
            dataSource={posts}
            renderItem={(item: Post) => (
                <List.Item
                    key={item.user.name}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.profile_image_url}/>}
                        title={<a href={item.user.url}>{item.user.name}</a>}
                        description={new Date(item.created_at).toLocaleString('en')}
                    />
                    <p dangerouslySetInnerHTML={{__html: item.text}}/>
                </List.Item>
            )}
        />
}

export default Feed