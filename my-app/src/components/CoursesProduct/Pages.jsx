import { useState } from 'react';
import ChapterNav from './ChapterNav'

const Pages = () => {
  const [currentChapter, setCurrentChapter] = useState();

  const handleChapterClick = (chapter) => {
    setCurrentChapter(chapter);
  };
  return (
    <div className='flex'>
        <div className="basis-[22%] h-[100vh] border-r-[1px]">
           <ChapterNav onChapterClick={handleChapterClick}/>
        </div>
        <div className='basis-[84%] h-[100vh] w-full overflow-scroll'>
        <iframe
          style={{ width: '100%', height: '90%', border: 'none' }}
          src={currentChapter} title="YouTube video player"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        </div>
    </div>
  )
}

export default Pages