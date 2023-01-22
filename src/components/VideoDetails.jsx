import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { IoIosShareAlt } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { abbreviateNumber } from 'js-abbreviation-number';

import { fetcVideoDetailsFromYoutubeApi, fetcRelatedVideosFromYoutubeApi } from '../utils/api';
import { Context } from '../context/AppContext';
import SuggestionVideoCard from './SuggestionVideoCard';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

function VideoDetails() {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);
  
  const [lineClamp, setLineClamp] = useState(true);

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetcVideoDetailsFromYoutubeApi(id).then(data => {
      const { contents } = data;
      setVideo(data);
      setLoading(false);
    }).catch(error => {
      console.log("videodetails.jsx: error");
      console.log(error);
    });
  }

  const fetchRelatedVideos = () => {
    fetcRelatedVideosFromYoutubeApi(id).then(data => {
      console.log("videodetails.jsx: fetchRelatedVideos");
      setRelatedVideos(data);
    }).catch(error => {
      console.log("videodetails.jsx: error");
      console.log(error);
    });
  }

  console.log(relatedVideos);

  return (
    <section className='bg-black'>
      <div className='flex flex-row justify-between gap-5 px-4 mt-[57px]'>

        <div className='flex flex-col w-[70%] pb-5'>
          <div className='h-[450px]'>
            <ReactPlayer
              url={`https://youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <div className='flex flex-col gap-3 mt-1'>
            <h1 className='text-white font-bold text-xl'>{video?.title}</h1>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row flex-2 gap-3 justify-start items-center'>
                <img
                  src={`${video?.author?.avatar?.[0]?.url}`}
                  className='w-[36px] h-[36px] rounded-full'
                />
                  <p className='flex flex-col gap-0.5 text-white/[0.6]'>
                    <span className='flex items-center gap-1 text-base text-white font-semibold'>
                      {video?.author?.title}
                      {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" ? <BsFillCheckCircleFill className='text-md' /> : ''}
                    </span>
                    <span className='text-sm font-medium'>{`${abbreviateNumber(video?.author?.stats?.subscribers, 2)} subscribers`}</span>
                  </p>
              </div>
              <div className='flex items-center'>
                <button className='flex gap-2 justify-center text-sm font-medium mr-2 text-white items-center rounded-3xl bg-white/10 hover:bg-white/20 py-2 px-5'>
                  <BiLike className='text-xl' /> {`${abbreviateNumber(video?.stats?.likes, 2)}`}
                </button>
                <button className='flex gap-2 justify-center text-sm font-medium mr-2 text-white items-center rounded-3xl bg-white/10 hover:bg-white/20 py-2 px-5'>
                  <BiDislike className='text-xl' />
                </button>
                <button className='flex gap-2 justify-center text-sm font-medium mr-2 text-white items-center rounded-3xl bg-white/10 hover:bg-white/20 py-2 px-5'>
                  <IoIosShareAlt className='text-xl' /> Share
                </button>
                <button className='flex gap-2 justify-center text-sm text-white items-center rounded-full bg-white/10 hover:bg-white/20 h-[40px] w-[40px]'>
                  <HiDotsHorizontal className='text-xl' />
                </button>
              </div>
            </div>
            <div className=' bg-white/10 hover:bg-white/20 p-3 rounded-lg relative'>
              <p className={`text-white ${lineClamp ? 'line-clamp-3':'line-clamp-none'}`}>
                {video?.description}
              </p>
              <span className='absolute top-3 right-4 text-white cursor-pointer text-sm font-medium' onClick={() => setLineClamp(!lineClamp)}>Show more</span>
            </div>
          </div>
        </div>

        {/* related videos */}
        <div className='flex flex-col w-[30%]'>
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== 'video') {
              return false;
            } else {
              return <SuggestionVideoCard key={index} video={item?.video} />
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default VideoDetails