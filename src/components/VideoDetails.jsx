import React from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { IoIosShareAlt } from 'react-icons/io';
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

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetcVideoDetailsFromYoutubeApi(id).then(data => {
      console.log('videodetails.jsx: fetchVideoDetails');
      const { contents } = data;
      setVideo(data);
      setLoading(false);
      console.log({ data });
    }).catch(error => {
      console.log("videodetails.jsx: error");
      console.log(error);
    });
  }

  const fetchRelatedVideos = () => {
    fetcRelatedVideosFromYoutubeApi(id).then(data => {
      console.log("videodetails.jsx: fetchRelatedVideos");
      console.log({ data });
    }).catch(error => {
      console.log("videodetails.jsx: error");
      console.log(error);
    });
  }

  return (
    <section className='h-full bg-black'>
      <div className='flex flex-row justify-between gap-5 px-4 h-[calc(100%-57px)]'>

        <div className='flex flex-col w-[70%]'>
          <div className='h-[450px]'>
            <ReactPlayer
              url={`https://youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-lg'>{video?.title}</h1>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row flex-2 gap-3 justify-start items-start'>
                <img
                  src={`${video?.author?.avatar?.[0]?.url}`}
                  className='w-[36px] h-[36px] rounded-full'
                />
                <div className='flex flex-col gap-1.5 justify-center'>
                  <p className='flex flex-col gap-0.5 text-white/[0.6] text-xs'>
                    <span className='flex items-center gap-1 text-base text-white font-semibold'>
                      {video?.author?.title}
                      {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" ? <BsFillCheckCircleFill className='text-md' /> : ''}
                    </span>
                    <span className='text-sm font-medium'>{`${abbreviateNumber(video?.author?.stats?.subscribers, 2)} subscribers`}</span>
                  </p>
                </div>
              </div>
              <div className='flex'>
                <button className='flex gap-2 justify-center items-center rounded-3xl bg-white/10 py-0.5 px-3 w-[100px]'>
                  <FcLike className='text-3xl' /> 34534
                </button>
                <button className='flex gap-2 justify-center items-center rounded-3xl bg-white/10 py-0.5 px-3 w-[100px]'>
                  <FcLike className='text-3xl' /> 34534
                </button>
                <button className='flex gap-2 justify-center items-center rounded-3xl bg-white/10 py-0.5 px-3 w-[100px]'>
                  <IoIosShareAlt className='text-3xl' /> Share
                </button>
                <button className='flex gap-2 justify-center items-center rounded-full bg-white/10 h-[50px] w-[50px]'>
                  ...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* related videos */}
        <div className='flex flex-col bg-slate-800 w-[30%]'></div>
      </div>
    </section>
  )
}

export default VideoDetails