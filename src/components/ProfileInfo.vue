<template>
    <div class="profile-info min-h-[30vh]">
      <div class="static absolute t-3 flex justify-around min-w-[43%] left-[30%]">
        <div class="img-user flex justify-end items-center">
          <img class="w-1/3 mx-4 my-6" src="../assets/img/none-profile-img.jpg" alt="">
        </div>
        <div class="user-profile-statics flex flex-col min-w-[50%]">
          <div class="name-user my-2 flex justify-around items-center">
            <h3 class="text-[20px]">ahrorbek.uralbayev</h3>
            <button class="w-24 my-0 mx-6 font-semibold h-8 rounded-md bg-gray-200 text-[14px]">Edit profile</button>
            <i class="bi bi-gear-wide"></i>
          </div>
          <div class="popul-user flex">
            <h4><span>1</span> posts</h4>
            <p><span>130 </span>followers</p>
            <p><span>90</span> following</p>
          </div>
          <div class="real-name">
            <h3>Ahrorbek Uralbayev</h3>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: "ProfileInfo",
}
</script>