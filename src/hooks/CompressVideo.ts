// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

// import { FFmpeg } from "@ffmpeg/ffmpeg"
// import { fetchFile } from "@ffmpeg/util"
import { downloadWithProgress } from "@ffmpeg/util"
// import { useRef } from "react"
// const ffmpeg = createFFmpeg({ log: true })

const CompressVideo = async ({ video, ffmpegRef }) => {
  console.log(video);

  function getFileExtension(fileName: string) {
    return fileName.split(".").pop();
  }

  

const { name } = video;
const ffmpeg = ffmpegRef.current;
if (!ffmpeg.loaded) return false 
//   if (!ffmpeg.) {
//     await ffmpeg.load();
//   }
const inputDir = '/input';
const inpurtFIle = `${inputDir}/${video.name}`
  await ffmpeg.writeFile("trimInput.mp4", video);
  await ffmpeg.mount('WORKERS', {
    files: [video]
  }, inpurtFIle)
  // await ffmpeg.exec(['-i', 'input.webm', 'output.mp4'], 1000);
  await ffmpeg.exec([
    "-i",
    name,
    "-c:v",
    "h264",
    "-crf",
    "28",
    "-b:v",
    "0",
    "row-mt",
    "1",
    "-f",
    `${getFileExtension(name)}`,
    `out.${getFileExtension(name)}`,
  ]);
  const data = await ffmpeg.readFile(`out.${getFileExtension(name)}`);
  console.log("This is the data", data)
  let finalData = URL.createObjectURL(
    new Blob([data.buffer], { type: `video/${getFileExtension(name)}` })
  );

//   ffmpeg.on('log', ({message}) => {
//     console.log(message)
//   })

  console.log(downloadWithProgress)
  console.log("This is the finalData", finalData);
  return finalData;
  // const fileData = await fetchFile(video)
  // await ffmpeg.load()
  // ffmpeg.FS('writeFile', 'trimInput.mp4', fileData)
  // await ffmpeg
};

export default CompressVideo;
