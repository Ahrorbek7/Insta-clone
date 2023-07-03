<template>
    <div class="register-container flex justify-center">
      <div class="register-form">
        <img class="insta-logo" src="../../assets/img/insta-text.jpg" alt="" />
        <h3 class="see-friends--text text-center">
          Sign up to see photos and videos from your friends.
        </h3>
        <button @click="signInWithGoogle">
          <p><i class="bi bi-google"></i> Sign Up with Google</p>
        </button>
        <div
          class="hr-line"
          style="display: flex; align-items: center; justify-content: center"
        >
          <hr style="width: 40%; margin-right: 10px" />
          <span>OR</span>
          <hr style="width: 40%; margin-left: 10px" />
        </div>
        <p><input type="text" placeholder="Email" id="checkEmail" v-model="email"/></p>
        <p><input type="text" placeholder="Full Name" id="checkEmail" /></p>
        <p>
          <input
            type="text"
            placeholder="User Name"
            id="checkEmail"
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            id="checkPassword"
          />
        </p>
        <h5>
          People who use our service may have uploaded your contact information to
          Instagram. <a href="">Learn More</a>
        </h5>
        <h6>
          By signing up, you agree to our
          <a href="">Terms , Privacy Policy and Cookies Policy .</a>
        </h6>
        <p><button @click="register">Sign Up</button></p>
        <div class="have-account-reg">
      <p class="mx-8 my-6 w-full">Have an account?
          <router-link to="/sign-in">
            <span class="register-text cursor-pointer text-blue-400"> Login </span>
          </router-link>
      </p>
    </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name:"SignUp",
    setup() {
      const email = ref('');
      const password = ref('');
  
      const router = useRouter();
      const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
          .then((data) => {
            console.log('Successfully registered!');
            router.push('/main-page');
          })
          .catch((error) => {
            console.log(error.code);
            alert(error.message);
          });
      };
      const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
          .then((result) => {
            console.log(result.user);
            router.push('/main-page');
          })
          .catch(() => {
            alert('Error with signing with Google');
          });
      };
  
      return {
        email,
        password,
        register,
        signInWithGoogle,
      };
    },
  };
  </script>
  
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Damion&family=Encode+Sans&display=swap");
  
  .insta-logo {
    width: 180px;
    height: 50px;
    margin-left: 5rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
  .hr-line span {
    color: gray;
    font-size: 13px;
    font-weight: 500;
  }
  .infoSave p {
    margin: 0 0.7rem;
    font-size: 14px;
  }
  .see-friends--text {
    font-weight: 500;
    color: rgb(109, 108, 108);
    font-size: 17px;
    max-width: 280px;
    margin: 0 auto;
  }
  .have-account-reg{
    width: 350px;
    height: 70px;
    border: 1px solid rgb(213, 213, 213);
    margin: 1rem 0;
  }
  .have-account-reg p{
    font-size: 15px;
    margin-top: 1.5rem;
    margin-left: 6rem;
  }
  .register-form {
    width: 350px;
    height: 600px;
    border: 1px solid rgb(227, 227, 227);
    margin: 1rem 40vw;
  }
  
  .register-form h1 {
    font-size: 32px;
    font-family: "Damion", cursive;
    margin: 3rem;
    text-align: center;
  }
  
  .register-form #checkEmail,
  #checkPassword {
    margin: 0.5rem 2rem;
    width: 80%;
    outline: none;
    border: 1px solid rgb(227, 227, 227);
    padding: 0.6rem 0.3rem;
    font-size: 13px;
  }
  
  .register-form input:focus {
    border: 1px solid rgb(169, 166, 166);
  }
  
  .register-form button {
    width: 80%;
    margin: 1rem 2rem;
    font-weight: 500;
    height: 2.1rem;
    border: none;
    color: white;
    background-color: rgb(48, 141, 255);
    font-size: 14px;
    border-radius: 6px;
  }
  h5, h6{
    font-size: 12.5px;
    max-width: 270px;
    color: rgb(174, 172, 172);
    text-align: center;
    margin: 0.4rem auto;
  }
  h5 a, h6 a {
    color: rgb(16, 16, 104);
    font-size: 12px;
  }
  .google-text:hover {
    color: rgb(133, 188, 255);
  }
  </style>
  