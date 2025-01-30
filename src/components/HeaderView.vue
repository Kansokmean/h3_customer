<template>
  <header>
    <div class="container">
      <nav class="d-flex justify-content-between pt-3">
        <div class="border-start border-5 lh-1 ps-4 border-primary">
          <RouterLink to="/" class="text-decoration-none fw-bold" :class="locale === 'km' ? 'h5' : 'h4'">{{ t('header.title') }}</RouterLink>
          <p :class="locale === 'km' ? 'mt-1' : 'mt-0'">{{ t('header.desc') }}</p>
        </div>
        <div class="language col-3 text-end">
          <button 
            type="button" 
            class="btn " 
            :class="locale === 'km' ? 'btn-primary' : 'btn-lang'" 
            @click="setLanguage('km')">
            <div class="d-flex"><img src="@/assets/cambodia_flag.svg" class="w-15" alt=""> <span class="d-none d-md-block">ភាសាខ្មែរ</span></div>
          </button>
          <button 
            type="button" 
            class="btn ms-2" 
            :class="locale === 'en' ? 'btn-primary' : 'btn-lang'" 
            @click="setLanguage('en')">
            <div class="d-flex"><img src="@/assets/en_flag.svg" class="w-15" alt=""> <span class="d-none d-md-block">English</span></div>
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
