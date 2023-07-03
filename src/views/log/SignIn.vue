<template>
<div class="login-container">
  <div class="flex justify-center ">
    <div class="img-section">
    <img src="../../assets/img/phone-img-login.jpg" alt="">
  </div>
  <div class="login-form">
    <img class="insta-logo" src="../../assets/img/insta-text.jpg" alt="">
    <p> <input type='text' placeholder="Email" v-model='email' id="checkEmail"/> </p>
    <p> <input type='password' placeholder="Password" v-model='password'  id="checkPassword" /> </p>
    <p class="mx-8 text-red-500" v-if="errMsg"> {{ errMsg }} </p>
    <p> <button @click="signIn"> Submit </button> </p>
    <div class="infoSave flex">
        <input type="checkbox" name="saveInfo" id="saveInfo">
        <label for="saveInfo">
          <p>Save my log Info</p>
        </label>
      </div>
    <div class="hr-line" style="display: flex; align-items: center; justify-content: center;margin: 2rem 0;">
        <hr style="width: 40%; margin-right: 10px;">
        <span>OR</span>
        <hr style="width: 40%; margin-left: 10px;">
      </div>
      <p class="google-text cursor-pointer mx-20" @click="signInWithGoogle"><i class="bi bi-google"></i> Sign in with Google</p>
  </div>
  </div>
  <div class="have-account">
    <p class="mx-8 my-6 w-full">Do not have any account?
        <router-link to="/sign-up">
          <span class="register-text cursor-pointer text-blue-400"> Register </span>
        </router-link>
    </p>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { isLoggedIn } from '../../state';
import { 
  getAuth, 
  signInWithEmailAndPassword,  
  signInWithPopup,
  GoogleAuthProvider, 
} from 'firebase/auth';
import { useRouter } from 'vue-router'; 

export default {
  name:'SigIn',
  setup() {
    const email = ref('');
    const password = ref('');
    const errMsg = ref();

    const router = useRouter(); 

    const signIn = () => {
      signInWithEmailAndPassword(getAuth(),email.value, password.value)
        .then((data) => {
          console.log('Successfully logged in!');
          router.push('/main-page')
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
                errMsg.value = 'Invalid email'
                break
            case 'auth/user-not-found':
                errMsg.value = 'No account with that email was found'
                break
            case 'auth/wrong-password':
                errMsg.value = 'Incorrect password'
                break  
            default:
                errMsg.value = 'Email or password was incorrect'
                break
          }
        });
    }

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("/main-page");
        })
        .catch((error) => {
          alert("Error with signing with Google")
        })
    }

    return {
      email,
      password,
      errMsg,
      signIn,
      signInWithGoogle,
    };
  },
};
</script>
<style>
.google-text {
  color: rgb(2, 5, 95);
}
img {
  margin: 1rem 1.7rem;
  margin-right: 4rem;
  width: 400px;
  height: 600px;
}
.register-text{
  font-weight: 500;
}
.register-text:hover {
  color: rgb(17, 17, 244);
}
.hr-line span {
  color: gray;
  font-size: 13px;
}
.insta-logo{
  width: 180px;
  height: 50px;
  margin-left: 5rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
}
.have-account{
  width: 350px;
  height: 70px;
  position: absolute;
  bottom: 10%;
  right: 22.5%;
  border: 1px solid rgb(213, 213, 213);
}
.login-container {
  width: 100%;
  height: 100vh;
  padding: 0;
  justify-content: center;
}
.infoSave {
  margin: 0.7rem 2rem ;
}
.infoSave p {
  margin: 0 0.7rem;
  font-size: 14px;
}
.login-form {
  width: 350px;
  height: 470px;
  border: 1px solid rgb(227, 227, 227);
  margin: 3rem 0 !important;
}

.login-form h1 {
  font-size: 32px;
  font-family: 'Encode Sans', sans-serif;
  margin: 3rem;
  text-align: center;
}

.login-form #checkEmail, #checkPassword {
  margin: 0.5rem 2rem;
  width: 80%;
  outline: none;
  border: 1px solid rgb(227, 227, 227);
  padding: 0.6rem 0.3rem;
  font-size: 13px;
}

.login-form input:focus {
  border: 1px solid rgb(169, 166, 166);
}

.login-form button {
  width: 80%;
  margin: 0.5rem 2rem;
  height: 2rem;
  border: none;
  color: white;
  background-color: rgb(51, 137, 242);
  font-size: 14px;
  border-radius: 6px;
}</style>