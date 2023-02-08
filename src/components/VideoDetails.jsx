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
      <div className='flex flex-col md:flex-row justify-between gap-5 px-4 mt-[57px]'>

        <div className='flex flex-col md:w-[70%] pb-5'>
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type ===
                    "VERIFIED_CHANNEL" && (
                      <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                {`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} Views`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return (
              <SuggestionVideoCard
                key={index}
                video={item?.video}
              />
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default VideoDetails