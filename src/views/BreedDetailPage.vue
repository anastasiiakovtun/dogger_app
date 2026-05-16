<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import ProgressSpinner from 'primevue/progressspinner'

const route = useRoute()
const router = useRouter()
const breed = route.params.breed
const imageLoaded = ref(false)

const { data, isLoading, isError } = useQuery({
  queryKey: ['breed', breed],
  queryFn: async () => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
    return response.data.message
  },
  staleTime: Infinity
})
</script>

<template>
  <div class="page">
    <header class="hero">
      <button class="back-btn" @click="router.push('/')">← Back</button>
      <h1>{{ breed }}</h1>
      <p class="subtitle">Random photo of a {{ breed }}</p>
    </header>

    <main class="content">
      <Transition name="fade" mode="out-in">
        <div v-if="isLoading" class="centered" key="loading">
          <ProgressSpinner />
          <p>Loading photos...</p>
        </div>

        <div v-else-if="isError" class="centered error" key="error">
          <p>Failed to load photos. Please try again.</p>
        </div>

        <div v-else class="photo-card" key="photo">
          <img
            :src="data"
            :alt="breed"
            @load="imageLoaded = true"
            :style="{ opacity: imageLoaded ? 1 : 0 }"
          />
        </div>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.page {
  min-height: 100vh;
  background: #0f0f13;
  color: #fff;
}

.hero {
  padding: 60px 40px 50px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.back-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-bottom: 28px;
  display: inline-block;
}

.back-btn:hover {
  background: rgba(167, 139, 250, 0.15);
  color: #a78bfa;
  border-color: #a78bfa;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -2px;
  margin: 0 0 10px;
  text-transform: capitalize;
  background: linear-gradient(135deg, #fff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1rem;
  margin: 0;
  text-transform: capitalize;
}

.content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.photo-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.photo-card img {
  width: 100%;
  display: block;
  object-fit: cover;
  transition: opacity 0.4s ease;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 16px;
  color: rgba(255, 255, 255, 0.4);
}

.error {
  color: #f87171;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .hero {
    padding: 40px 20px 36px;
  }

  .content {
    padding: 24px 16px;
  }


}
</style>