<template>
  <header
    class="relative py-4 bg-black border-b border-accent"
  >
    <DefaultContainer
      class="flex justify-between items-center"
    >
      <div
        class="logo flex justify-center items-center cursor-pointer"
        @click="$router.push({name: $routeNames.rootPage})"
      >
        <img
          :src="owlLogo"
          alt="logo"
          class="w-12 h-12 text-red-600"
        >
        <p class="logo-text font-bold text-2xl">
          QuizCraft
        </p>
        <el-badge
          value="BETA"
          type="primary"
          class="ml-1 mb-4"
        />
      </div>

      <NavBar :isActive="isActive" />

      <div
        class="flex"
      >
        <BurgerButton
          :isActive="isActive"
          class="md:hidden"
          @click="isActive = !isActive"
        />

        <el-dropdown
          v-if="authStore.activeUserData"
          trigger="click"
          @command="onDropdown"
        >
          <div
            class="w-10 h-10 flex justify-center items-center bg-white rounded-full border-4 border-double border-black
            ml-4 hover:bg-accent"
          >
            <IconAvatar />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </DefaultContainer>
  </header>
</template>

<script setup lang="ts">
import owlLogo from '@/assets/images/owl_logo.png'
import DefaultContainer from '@/layouts/DefaultContainer.vue'

const authStore = useAuthStore()

const isActive = ref(false)

const onDropdown = () => {
  authStore.logOut()
}
</script>

<style lang="scss" scoped>

.logo-text {
  background-color: black;
  background-image: linear-gradient(
    to right,
    #ff4713 10%,
    #000000,
  );
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  animation: rainbow-text 1000ms linear alternate infinite;
}
@keyframes rainbow-text {
  20% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 20%,
      #000000,
    );
  }
  40% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 40%,
      #000000,
    );
  }
  60% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 60%,
      #000000,
    );
  }
  80% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 80%,
      #000000,
    );
  }
  100% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 100%,
      #000000,
    );
  }
}
</style>
