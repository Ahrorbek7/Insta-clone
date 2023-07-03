<template>
    <div class="explore-container right-0 absolute">
      <div
        v-if="videoUrls.length <= 4"
        class="loader absolute top-[50%] left-[50%]"
      ></div>
      <div v-else class="explore-block flex justify-center flex-wrap">
        <video
          v-for="(url, index) in videoUrls"
          :key="index"
          ref="videos"
          @click="openModal(url)"
          class="cursor-pointer bg-black explore-video"
        >
          <source :src="url" type="video/mp4" />
        </video>
      </div>
      <div
        v-if="selectedVideoUrl"
        class="explore-modal flex fixed top-[50%] left-[50%] bg-white justify-between"
      >
        <span class="text-white cursor-pointer close-explore-modal" @click="hideModal">
          <h1>&#10005;</h1>
        </span>
        <video :src="selectedVideoUrl" controls autoplay></video>
        <div class="explore-video--comments w-1/2">
          <div class="posted-user--commented">
            <img src="../assets/img/none-profile-img.jpg" alt="" />
            <h4>cristiano_fermine</h4>
            <p>My first video</p>
          </div>
          <div class="users-comments--all">
            <div
              v-for="(comment, index) in commentsData"
              :key="index"
              class="user-comments--comment"
            >
              <img src="../assets/img/none-profile-img.jpg" alt="" />
              <h4>{{ comment.username }}</h4>
              <p>{{ comment.commentText }}</p>
            </div>
          </div>
        </div>
        <div class="explore-video--statistics absolute right-0 bottom-0">
          <div class="explore-st-reaction">
            <i class="bi bi-heart"></i>
            <i class="bi bi-chat"></i>
            <i class="bi bi-telegram"></i>
          </div>
          <div class="explore-st-number">
            <h4>22, 007 likes</h4>
          </div>
          <input
            type="text"
            placeholder="Add comment"
            class="outline-none w-full h-1/3"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getDownloadURL, ref } from "firebase/storage";
  
  export default {
    data() {
      return {
        videoUrls: [],
        selectedVideoUrl: null,
        commentsData: [
          { username: "johnatan-swift", commentText: "Very good friend" },
          { username: "adriano_vespucci", commentText: "✊✊✊✊👍👍👍" },
          { username: "leianogarcia__001", commentText: "😅😅😅😅😅" },
          { username: "sofia-terras", commentText: "😱😱😱😱🙊" },
          { username: "garcia_0910", commentText: "Escupato le norte😞😞" },
          { username: "norte_sertu", commentText: "Hi vanire ol amutas😤😤😤" },
          { username: "verina", commentText: "😾😾😾💩💩 fulaeto lopas" },
          { username: "opaloc-loper", commentText: "🧑🏼‍🚀🧑🏼‍🚀come back please" },
          { username: "oops_lope", commentText: "Noleto koman reo" },
          { username: "buity_very wowo", commentText: "molpar porte" },
          { username: "johnatan-swift", commentText: "🌚🌚🌚🌚" },
          { username: "johnatan-swift", commentText: "🍅🍅timos" },
        ],
      };
    },
    async created() {
      const videoPaths = [
        "FOIJSTdfx__m8qCM.mp4",
        "ted.mp4",
        "IMG_0794.MOV",
        "video-1.mp4",
        "video-2.mp4",
        "video-3.mp4",
        "video-4.mp4",
        "video-5.mp4",
        "video-6.mp4",
        "video-7.mp4",
        "video-8.mp4",
        "video-9.mp4",
        "video-10.mp4",
        "video-11.mp4",
        "video-12.mp4",
        "video-13.mp4",
        "video-14.mp4",
        "video-15.mp4",
        "video-16.mp4",
        "video-17.mp4",
        "video-18.mp4",
        "video-19.mp4",
        "video-20.mp4",
        "video-21.mp4",
        "video-22.mp4",
        "video-23.MP4",
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
      openModal(url) {
        this.selectedVideoUrl = url;
        document.body.classList.add("explore-modal-open");
      },
      hideModal() {
        this.selectedVideoUrl = null;
        document.body.classList.remove("explore-modal-open");
      },
    },
  };
  </script>
  
  <style>
  .explore-container {
    width: 83%;
    height: 400px;
  }
  
  .explore-video {
    width: 350px;
    height: 300px;
    margin: 0.5rem 0.1rem;
  }
  
  .explore-video:hover {
    opacity: 0.8;
  }
  
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  
  .explore-video--comments {
    height: 101%;
  }
  
  .explore-video--statistics {
    height: 22%;
    width: 50%;
  }
  
  .explore-modal input {
    border-top: 1px solid gray;
  }
  
  .explore-video--statistics i {
    font-size: 23px;
    margin: 2rem 0.7rem;
  }
  
  .explore-video--statistics h4 {
    margin: 1rem 0.4rem;
    font-size: 16px;
    font-weight: 500;
  }
  
  .explore-modal {
    transform: translate(-50%, -50%);
    z-index: 123333;
    width: 700px;
    padding: 1rem;
    width: 70%;
    height: 80%;
  }
  
  body.explore-modal-open::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  }
  
  .explore-modal video {
    width: 50%;
    height: 102% !important;
    height: auto;
    margin: 0 -1rem;
  }
  
  .posted-user--commented {
    width: 100%;
    height: 7%;
    display: flex;
    align-items: center;
    margin: 0;
  }
  
  .explore-modal img {
    width: 35px;
    margin: 0 1rem;
    height: 35px;
  }
  
  .posted-user--commented h4 {
    font-size: 14px;
    font-weight: 500;
  }
  
  .users-comments--all {
    width: 100%;
    overflow-y: scroll;
    border-bottom: 1px solid rgb(203, 203, 203);
    height: 70%;
  }
  
  .users-comments--all::-webkit-scrollbar {
    display: none;
  }
  
  .users-comments--all .user-comments--comment {
    margin: 1rem;
    display: flex;
  }
  
  .user-comments--comment h4 {
    font-size: 14px;
    margin: 0 0.2rem;
    font-weight: 500;
  }
  
  .explore-modal p {
    font-size: 13px;
    margin: 0 0.2rem;
  }
  
  span {
    position: absolute;
    top: -10%;
    right: -20%;
  }
  </style>
  