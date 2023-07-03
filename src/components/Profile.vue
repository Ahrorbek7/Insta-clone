<template>
  <div class="profile-container m-auto">
    <ProfileInfo />
    <div class="posted-tab border-t border-solid border-gray-300 p-4 absolute top-[30%] w-[50%] flex justify-center ">
      <h3 :class="{ selectedTab: activeLink === '/posts' }" class="cursor-pointer" selectedTab='posts'><i
          class="bi bi-table"></i> POSTS</h3>
          </div>
    <div class="post-main-section my-[4%] mx-[25%] w-[76%]">
      <Posts />
    </div>
    <div class="profile-footer">
      <a href="https://about.meta.com">Meta</a>
      <a href="https://about.instagram.com">About</a>
      <a href="https://about.instagram.com/blog">Blog</a>
      <a href="https://www.instagram.com/about/jobs">Jobs</a>
      <a href="https://help.instagram.com">Help</a>
      <a href="https://developers.instagram.com/docs">API</a>
      <a href="https://www.instagram.com/legal/privacy/">Privacy</a>
      <a href="https://www.instagram.com/legal/terms/">Terms</a>
      <a href="https://www.instagram.com/directory/profiles/">Top Accounts</a>
      <a href="https://www.instagram.com/explore/locations/">Locations</a>
      <a href="https://www.instagram.com/web/lite/">Instagram Lite</a>
      <a href="https://www.instagram.com/web/lite/">Contact Uploading & Non-Users</a>
      <a href="https://about.meta.com/technologies/meta-verified/">Meta Verified</a>
      <a href="">© 2023 Instagram from Meta</a>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Posts from './Posts.vue'
import ProfileInfo from './ProfileInfo.vue'

export default {
  name: "Profile",
  components: {
    Posts,
    ProfileInfo,
  },
  data() {
    return {
      activeTab: 'posts'
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
};
</script>
<style>
.posted-tab {
  left: 29%;
}

.post-main-section {
  margin: 1rem 26%;
}

.posted-tab h3 {
  font-size: 13px;
  margin: 0 1.7rem;
  color: gray;
}

.name-user i {
  font-size: 23px;
}

.popul-user {
  width: 100%;
  margin: 1rem 0;
}

.popul-user p {
  margin: 0 1rem;
}

.real-name {
  font-weight: 500;
}

.real-name h3 {
  font-size: 15px;
  margin: 0.8rem 0;
}


.selectedTab {
  color: black !important;
  font-weight: 500;
}

.profile-footer {
  width: 80%;
  text-align: center;
  color: gray;
  margin: 1rem 20%;
}

.profile-footer a {
  font-size: 13px;
  margin: 1rem;
  text-align: center;
}

.profile-footer a:hover {
  text-decoration: underline;
}
</style>