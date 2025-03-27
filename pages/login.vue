<script setup>
import { ref } from "vue";
import logo from "@/assets/ico.png";

const UsernameOrEmail = ref("");
const password = ref("");

const isLoading = ref(false);
const isPopUp = ref(false);
const route = useRoute().query;
const redirectUrl = route.redirect;

console.log(redirectUrl);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  console.log("Logging in...", {
    UsernameOrEmail: UsernameOrEmail.value,
    password: password.value,
  });

  if (String(UsernameOrEmail.value).includes("@")) {
    await authClient.signIn.email(
      {
        email: UsernameOrEmail.value,
        password: password.value,
      },
      {
        onRequest: () => {
          console.log("login processing");
        },
        onSuccess: () => {
          console.log("login succes");

          console.log("redirecting to", redirectUrl);

          if (redirectUrl !== undefined) {
            isLoading.value = false;

            navigateTo(redirectUrl, { external: true });
          } else {
            isLoading.value = false;

            navigateTo("/");
          }
        },
        onError: (ctx) => {
          isLoading.value = false;
          if (ctx.error.status === 403) {
            alert("Please verify your email.");
            navigateTo("https://account.thealphaones.com/account-options", {
              external: true,
            });
            return;
          }

          alert(ctx.error.message);
        },
      }
    );
    // Implement better-auth logic here
  } else {
    const data = await authClient.signIn.username(
      {
        username: UsernameOrEmail.value,
        password: password.value,
      },
      {
        onRequest: () => {
          console.log("login processing");
        },
        onSuccess: () => {
          console.log("login succes");

          if (redirectUrl !== undefined) {
            isLoading.value = false;

            navigateTo(redirectUrl, { external: true });
          } else {
            isLoading.value = false;

            navigateTo("/");
          }
        },
        onError: (ctx) => {
          isLoading.value = false;

          if (ctx.error.status === 403) {
            alert("Please verify your email.");
            navigateTo("https://account.thealphaones.com/account-options", {
              external: true,
            });
            return;
          }
          alert(ctx.error.message);
        },
      }
    );
  }
};

const handleForgetPassword = async () => {
  navigateTo("https://account.thealphaones.com/account-options", {
    external: true,
  });
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="brand italianno-regular">
        <span class="brand-icon"> <img :src="logo" alt="tao-logo" /></span>
        TheAlphaOnes
      </div>
      <div class="testimonial">
        <p class="testimonial-text">
          "Welcome back to TheAlphaOnes. Secure, seamless, and built by creators
          like you. Log in to access our products and experience the future of
          innovation."
        </p>
        <p class="testimonial-author">Vishnu Gupta</p>
      </div>
    </div>
    <div class="auth-content">
      <div class="auth-header">
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-subtitle">Enter your details to access your account</p>
      </div>

      <form @submit="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="UserName&email">Username or Email</label>
          <input
            id="UserName&email"
            v-model="UsernameOrEmail"
            type="text"
            placeholder="name@example.com or username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="submit-button" disabled v-if="isLoading">
          Loading...
        </button>

        <button type="submit" class="submit-button" v-else>Sign In</button>

        <!-- <div class="divider">
          <span>OR CONTINUE WITH</span>
        </div> -->

        <!-- <button type="button" class="github-button">
          <svg viewBox="0 0 24 24" width="24" height="24" class="github-icon">
            <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button> -->
      </form>

      <p class="auth-switch">
        Forgot your password?
        <a @click="handleForgetPassword" class="switch-button"
          >Change Password</a
        >
        <br />
        Don't have an account?
        <router-link to="/signup" class="switch-button"> Sign Up </router-link>
      </p>

      <!-- <p class="terms">
        By clicking continue, you agree to our
        <a href="#" class="link">Terms of Service</a>
        and
        <a href="#" class="link">Privacy Policy</a>
      </p> -->
    </div>
  </div>
  <EmailVerificationPopup
    :email="UsernameOrEmail"
    @close="
      () => {
        isPopUp = false;
      }
    "
    v-if="isPopUp"
  />
</template>

<style scoped>
.auth-container {
  display: flex;
  min-height: 100vh;
  background-color: #000;
  position: relative;
}

.auth-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at top left,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.auth-left {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 2.7rem;
  font-weight: 500;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-icon img {
  height: 35px;
}

.testimonial {
  max-width: 32rem;
}

.testimonial-text {
  color: #ffffff;
  font-size: 1.5rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.auth-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 32rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-header {
  margin-bottom: 2rem;
}

.auth-title {
  color: #ffffff;
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  transition: all 0.15s ease-in-out;
  backdrop-filter: blur(5px);
}

.form-group input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  color: #000000;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  backdrop-filter: blur(5px);
}

.submit-button:hover {
  background: #ffffff;
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider span {
  background: #000;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 0.5rem;
  font-size: 0.75rem;
  position: relative;
  z-index: 1;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.github-button {
  width: 100%;
  padding: 0.75rem;
  color: #ffffff;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.15s ease-in-out;
  backdrop-filter: blur(5px);
}

.github-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.github-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.auth-switch {
  margin-top: 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.switch-button {
  background: none;
  border: none;
  padding: 0;
  margin-left: 0.25rem;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.switch-button:hover {
  text-decoration: underline;
}

.terms {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
  color: #ffffff;
}

@media (max-width: 1024px) {
  .auth-left {
    display: none;
  }

  .auth-content {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .auth-content {
    padding: 1.5rem;
  }

  .auth-title {
    font-size: 1.5rem;
  }

  .form-group input,
  .submit-button,
  .github-button {
    padding: 0.625rem;
  }
}
</style>
