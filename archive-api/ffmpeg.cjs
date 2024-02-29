const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

// https://medium.com/@hongseongho/introduction-to-hls-e7186f411a02
Array.from({ length: 8 })
  .map((_name, idx) => `video_${idx + 1}`)
  .forEach((fileName) => {
    var command = ffmpeg(`videos/${fileName}.mp4`)
      .input(fs.createReadStream(`videos/${fileName}.mp4`))
      .output(`videos/stream/${fileName}/output.m3u8`)
      .on('end', () => {
        console.log(`${fileName} end`);
      })
      .run();
  });
