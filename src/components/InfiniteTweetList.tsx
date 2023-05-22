import Link from "next/link"
import InfiniteScroll from "react-infinite-scroll-component"
import { ProfileImage } from "./ProfileImage"

type Tweet = {
  id: string
  content: string
  createdAt: Date
  likeCount: number
  likedByMe: boolean
  user: {id: string; image: string | null; name: string | null } 
}

type InfiniteTweetListProps = {
  isLoading: boolean
  isError: boolean
  hasMore: boolean
  fetchNewTweets: () => Promise<unknown>
  tweets?: Tweet[]
}

export function InfiniteTweetList(
  {tweets, isLoading, isError, hasMore, fetchNewTweets}: InfiniteTweetListProps
  ) {
    
    if(isLoading) return <h1> Loading ... </h1>
    if(isError) return <h1> Error ... </h1>
    
    if(tweets == null || tweets?.length === 0) {
      return <h2 className="my-4 text-center text-2xl text-gray-500">
        Hey, You have no tweets
        </h2>
    }

    return <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"Loading..."}>
          {tweets.map((tweet) => {
            return <TweetCard key={tweet.id} {...tweet} />
          })}
      </InfiniteScroll>
    </ul>
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {dateStyle : "short"})

function TweetCard({id, createdAt, user, content, likeCount, likedByMe}: Tweet) {
  return <li className="flex gap-4 border-b px-4 py-4">
    <Link href={`/profile/${user.id}`}>
      <ProfileImage src={user.image} /> 
    </Link>
    <div className="flex flex-grow flex-col"> 
      <div className="flex gap-1">
        <Link 
          href={`/profile/${user.id}`} 
          className="font-bold outline-none hover:underline focus-visible:underline">
          {user.name}
        </Link>
        <span className="text-gray-500">-</span>
        <span className="text-gray-500"> {dateTimeFormatter.format(createdAt)} </span>

      </div> 
      <p className=" whitespace-pre-wrap">{content}</p>
    </div>
  </li>
}