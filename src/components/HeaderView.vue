<template>
  <header>
    <div class="container">
      <nav class="d-flex justify-content-between pt-3">
        <div class="border-start border-5 lh-1 ps-4 border-primary">
          <RouterLink to="/" class="text-decoration-none fw-bold" :class="locale === 'km' ? 'h5' : 'h4'">{{ t('home.hero.title') }}</RouterLink>
          <p :class="locale === 'km' ? 'mt-1' : 'mt-0'">{{ t('home.hero.desc') }}</p>
        </div>
        <div class="language">
          <button 
            type="button" 
            class="btn kantumruy" 
            :class="locale === 'km' ? 'btn-primary' : 'btn-outline-primary'" 
            @click="setLanguage('km')">
            <img src="@/assets/cambodia_flag.svg" class="w-15" alt=""> ភាសាខ្មែរ
          </button>
          <button 
            type="button" 
            class="btn kantumruy ms-2" 
            :class="locale === 'en' ? 'btn-primary' : 'btn-outline-primary'" 
            @click="setLanguage('en')">
            <img src="@/assets/en_flag.svg" class="w-15" alt=""> English
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const {t} = useI18n()

const { locale } = useI18n();

const setLanguage = (lang) => {
  locale.value = lang; 
};
</script>
