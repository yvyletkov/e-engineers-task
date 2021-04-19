import {Post} from '../types'

export default class API {
    fetchPosts(url: string): Promise<Post[]> {
        return fetch(url, {
            method: "GET",
        })
            .then((res) => {
                if (res.status === 200) return res.json()
                else throw new Error('Failed to fetch data')
            })
            .then(data => {
                return data
            })
    }
}