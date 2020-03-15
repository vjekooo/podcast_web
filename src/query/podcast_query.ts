
import { gql } from 'apollo-boost'

export const SUBSCRIBE = gql`
    mutation Subscribe($url: String!) {
        subscribe(url: $url)
    }
`

export const UNSUBSCRIBE = gql`
    mutation Unsubscribe($url: String!) {
        unsubscribe(url: $url)
    }
`

export const GET_PODCASTS = gql`
    query Podcasts {
        podcasts {
            id,
            url
        }
    }
`

export const SET_FAVORITE = gql`
    mutation Favorite(
        $title: String!,
        $description: String!,
        $url: String!,
        $duration: String!,
        $pubDate: String!,
        $image: String!
    ) {
        setFavorite(
            title: $title,
            description: $description,
            url: $url,
            duration: $duration,
            pubDate: $pubDate,
            image: $image
        )
    }
`

export const REMOVE_FAVORITE = gql`
    mutation RemoveFavorite($id: ID!) {
        removeFavorite(id: $id)
    }
`

export const GET_FAVORITES = gql`
    query Favorites {
        favorites {
            id
            description
            title
            url,
            duration,
            pubDate,
            image
        }
    }
`

export const FETCH_PODCASTS = gql`
    query FetchPodcasts($urls: [String!]!) {
        fetchPodcasts(urls: $urls) {
            url,
            title,
            pubDate,
            description,
            image
        }
    }
`

export const FETCH_PODCASTS_EPISODES = gql`
    query FetchPodcastEpisodes($url: String!) {
        fetchPodcastEpisodes(url: $url) {
            url,
            title,
            pubDate,
            description,
            image,
            episodes {
                title,
                description,
                pubDate,
                url,
                duration
            }
        }
    }
`

export const SET_TO_HISTORY = gql`
   mutation SetToHistory(
        $title: String!,
        $description: String!,
        $url: String!,
        $duration: String!,
        $pubDate: String!,
        $image: String!
    ) {
        setToHistory(
            title: $title,
            description: $description,
            url: $url,
            duration: $duration,
            pubDate: $pubDate,
            image: $image
        )
    }
`

export const FETCH_HISTORY = gql`
    query FetchHistory {
        fetchHistory {
            title,
            description,
            url,
            duration,
            pubDate,
            image
        }
    }
`
