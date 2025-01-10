<template>
  <div class="static-page">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
.static-page {
  padding: 32px;
}
.static-page h1 {
  margin-bottom: 16px;
}
</style>
