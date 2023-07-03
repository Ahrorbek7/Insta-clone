<template>
    <div class="reels-container">
      <div v-if="videoUrls.length <=2 " class="loader"></div>      <div class="reels-block">
        <video
          class="reels-video"
          v-for="(url, index) in videoUrls"
          :key="index"
          ref="videos"
          @click="openModal(url)"
          controls
          @mouseover="playVideo(index)"
          @mouseout="pauseVideo(index)"
        >
          <source :src="url" type="video/mp4">
        </video>
      </div>
    </div>
  </template>
  
  <script>
  import { getDownloadURL, ref } from 'firebase/storage';
  
  export default {
    data() {
      return {
        videoUrls: [],
        selectedVideoUrl: null,
      };
    },
    async created() {
      const videoPaths = [
        "FOIJSTdfx__m8qCM.mp4", "ted.mp4", "IMG_0794.MOV",
        "video-1.mp4", "video-2.mp4", "video-3.mp4", "video-4.mp4", "video-5.mp4",
        "video-6.mp4", "video-7.mp4", "video-8.mp4", "video-9.mp4", "video-10.mp4",
        "video-11.mp4", "video-12.mp4", "video-13.mp4", "video-14.mp4", "video-15.mp4",
        "video-16.mp4", "video-17.mp4", "video-18.mp4", "video-19.mp4", "video-20.mp4",
        "video-21.mp4", "video-22.mp4", "video-23.MP4"
      ];
  
      for (const path of videoPaths) {
        const url = await this.getVideoUrl(path);
        this.videoUrls.push(url);
      }
    },
    methods: {
      async getVideoUrl(videoPath) {
        const storageRef = ref(this.$storage, videoPath);
        const url = await getDownloadURL(storageRef);
        return url;
      },
      playVideo(index) {
    const videoElement = this.$refs.videos[index];
    videoElement.play();
  },

  pauseVideo(index) {
    const videoElement = this.$refs.videos[index];
    videoElement.pause();
    videoElement.currentTime = 0;
  },
    },
  };
  </script>
  
<style>
.reels-container {
    width: 83%;
    height: 400px;
    float: right;
    position: absolute;
    right: 0;
}
.reels-static-video{
    width: 500px !important;
    height: 500px !important;
    position: absolute;
    left: 20%;
    top: 10px;
}

.reels-block {
    width: 30%;
    margin: auto;
}
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 70%;
  left: 50%;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

video {
    width: 350px;
    height: 300px;
    cursor: pointer;
    margin: 0.5rem 0.1rem;
    background-color: rgb(0, 0, 0);
}
.reels-video:hover {
  opacity: 0.8;
}
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 70%;
  left: 50%;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.reels-video {
    height: 90vh;
    border-radius: 7px;
}
span {
    position: absolute;
    top: -10%;
    right: -20%;
}
</style>

  