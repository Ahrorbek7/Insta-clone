<template>
  <div class="posts-container right-0 absolute">
    <div class="posts-block flex justify-center flex-wrap">
      <video v-for="(url, index) in videoUrls" :key="index" ref="videos" @click="openModal(url)"
        class="cursor-pointer bg-black post-media">
        <source :src="url" type="video/mp4" />
      </video>
    </div>
    <div v-if="selectedVideoUrl" class="post-modal flex fixed top-[50%] left-[50%] bg-white justify-between">
      <span class="text-white cursor-pointer close-explore-modal" @click="hideModal">
        <h1>&#10005;</h1>
      </span>
      <video :src="selectedVideoUrl" controls autoplay></video>
      <div class="post-video--comments w-1/2">
        <div class="posted-user--commented">
          <img src="../assets/img/none-profile-img.jpg" alt="" />
          <h4>cristiano_fermine</h4>
          <p>My first video</p>
        </div>
        <div class="users-comments--all">
          <div v-for="(comment, index) in commentsData" :key="index" class="user-comments--comment">
            <img src="../assets/img/none-profile-img.jpg" alt="" />
            <h4>{{ comment.username }}</h4>
            <p>{{ comment.commentText }}</p>
          </div>
        </div>
      </div>
      <div class="post-video--statistics absolute right-0 bottom-0">
        <div class="post-st-reaction">
          <i class="bi bi-heart"></i>
          <i class="bi bi-chat"></i>
          <i class="bi bi-telegram"></i>
        </div>
        <div class="post-st-number">
          <h4>22, 007 likes</h4>
        </div>
        <input type="text" placeholder="Add comment" class="outline-none w-full h-1/3" />
      </div>
    </div>
    <div class="upload-post-section" v-if="videoUrls.length === 0">
      <input type="file" id="upload-input" @change="uploadVideo" accept="video/*" />
      <label for="upload-input" class="label-main">
        <h1 class="upload-label"><i class="bi bi-camera"></i></h1>
      </label>
      <h2>Share Photos</h2>
      <p>When you share photos, they will appear on your profile.</p>
      <label for="upload-input">
        <h3>Share your first photo</h3>
      </label>
      <h3>{{ uploadingText }}</h3>
    </div>
  </div>
</template>

<script>
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";

export default {
  data() {
    return {
      videoUrls: [
      ],
      selectedVideoUrl: null,
      videoPaths: JSON.parse(localStorage.getItem('videoPaths') || "[]"),
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

    methods: {
      async loadVideos() {
      for (const path of this.videoPaths) {
        const url = await this.getVideoUrl(path);
        this.videoUrls.push(url);
      }
    },
      openModal(url) {
        this.selectedVideoUrl = url;
        document.body.classList.add("post-modal-open");
      },
      hideModal() {
        this.selectedVideoUrl = null;
        document.body.classList.remove("post-modal-open");
      },
      async getVideoUrl(videoPath) {
        const storageRef = ref(this.$storage2, videoPath);
        const url = await getDownloadURL(storageRef);
        return url;
      },
      async uploadVideo(event) {
      const file = event.target.files[0];
      const storageRef = ref(this.$storage2, file.name);

      try {
        await uploadBytes(storageRef, file, {
          customMetadata: {
            'Cache-Control': 'no-store',
          },
        });

        console.log("Video uploaded successfully!");
        const videoName = file.name;
        this.addVideoToPaths(videoName); 

        localStorage.setItem('videoPaths', JSON.stringify(this.videoPaths));

        this.loadVideos();
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    },

    addVideoToPaths(videoName) {
      this.videoPaths.push(videoName);
    },
  },

  created() {
    this.loadVideos();
  },  

  };
</script>

<style>
.posts-container {
  width: 83%;
  position: relative;
  min-height: 400px;
  height: auto;
}

.posts-block {
  width: 100%;
  margin: 3rem 0;
}

.post-media {
  width: 270px;
  margin: 0.2rem;
  height: 300px;
}

.post-media:hover {
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

.upload-label {
  font-size: 35px;
  width: 70px;
  height: 70px;
  color: rgb(14, 14, 79);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid rgb(14, 14, 79);
}

.upload-post-section {
  width: 92%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#upload-input {
  display: none;
}

.upload-post-section h2 {
  font-size: 30px;
  font-weight: 1000;
}

.upload-post-section p {
  font-size: 14px;
  margin: 1rem 0;
}

.upload-post-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: rgb(109, 109, 255);
  cursor: pointer;
}

.upload-post-section h3:hover {
  color: rgb(14, 14, 79);
}

.post-video--comments {
  height: 101%;
}

.post-video--statistics {
  height: 22%;
  width: 50%;
}

.post-video {
  width: 300px;
  height: 300px;
}

.post-modal input {
  border-top: 1px solid gray;
}

.post-video--statistics i {
  font-size: 23px;
  margin: 2rem 0.7rem;
}

.post-video--statistics h4 {
  margin: 1rem 0.4rem;
  font-size: 16px;
  font-weight: 500;
}

.post-modal {
  transform: translate(-50%, -50%);
  z-index: 123333;
  width: 700px;
  padding: 1rem;
  width: 70%;
  height: 80%;
}

body.post-modal-open::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
}

.post-modal video {
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

.post-modal img {
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

.post-modal p {
  font-size: 13px;
  margin: 0 0.2rem;
}

span {
  position: absolute;
  top: -10%;
  right: -20%;
}


</style>
