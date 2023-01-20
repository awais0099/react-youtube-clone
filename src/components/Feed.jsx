import React from 'react'
import LeftNav from './LeftNav';
import { useContext } from 'react';
import { Context } from '../context/AppContext';
import VideoCard from './VideoCard';

function Feed() {
  const { loading, searchReasult} = useContext(Context);

  return (
    <section className='feed flex h-[calc(100%-56px)]'>
        <LeftNav />
        <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-4 p-5'>
            {!loading && searchReasult.map(item => {
              if (item?.type !== 'video') {
                return false;
              } else {
                return <VideoCard key={item?.video?.videoId} video={item?.video} />
              }
            })}
          </div>
        </div>
    </section>
  )
}

export default Feed