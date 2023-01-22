import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { abbreviateNumber } from 'js-abbreviation-number';

function SuggestionVideoCard({video}) {
  return (
    <Link to={`/video/${video?.videoId}`} className='mb-2'>
      <div className='flex flex-row gap-3'>
        <div className='overflow-hidden rounded-xl flex-3 lg:h-20 xl:h-24 w-40 min-w-[168px]'>
          <img src={`${video?.thumbnails?.[0]?.url}`} className='h-full w-full' />
        </div>
        <div className='flex flex-row gap-3 justify-start items-start flex-1'>
          <div className='flex flex-col gap-1.5 justify-center'>
            <h3 className='text-white/[0.9] font-semibold text-sm line-clamp-2' title={video?.title}>{video?.title}</h3>
            <p className='flex flex-col gap-0.5 text-white/[0.6] text-xs font-semibold'>
              <span className='flex items-center gap-1'>
                {video?.author?.title}
                {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" ? <BsFillCheckCircleFill className='text-md' />: ''}
              </span>
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views . ${video?.publishedTimeText}`}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SuggestionVideoCard;