<template>
  <div class="app">
  </div>
  <div class="home-container">
    <Suggested />
</div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onBeforeUnmount } from 'vue';
import Suggested from "../../components/Suggested.vue";

export default {
    name: "MainView",
    components: {Suggested},
    setup() {
        const router = useRouter();
        const authListener = onAuthStateChanged(getAuth(), function (user) {
            if (!user) {
                alert("you must be logged in to view this. redirecting to the home page");
                router.push("/sign-up");
            }
        });
        onBeforeUnmount(() => {
            authListener();
        });
    },
};
  
</script>

<style>
.app {
  min-height: 100vh;
}
.home-container{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.home-form{
    border: 1px solid rgb(211, 211, 211);
    min-width: 38%;
    width: auto;
    margin: 3rem 0;
    height: 100vh;
    border-radius: 4px;
}
.suggest-user {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.4rem;
}
.suggest-user__info {
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 0.5rem;
    width: 49%;
}
.suggest-user__info img {
    width: 40px;
    height: 40px;
    border: 1px solid rgb(180, 180, 180);
    border-radius: 50%;
}
.suggest-user h4 {
    font-size: 15px;
    font-weight: 500;
}
.suggest-user p {
    color: gray;
    font-size: 13px;
    font-weight: 350;
}
.suggest-user h6{
    font-size: 13px;
    color: rgb(95, 94, 94);
}
.follow-btn {
    width: 85px;
    height: 32px;
    background-color: rgb(67, 123, 207);
    margin: 1rem 0.2rem;
    color: white;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
}
#off-insta{
    border: none;
    width: 22px;
    height: 22px;
}
</style>