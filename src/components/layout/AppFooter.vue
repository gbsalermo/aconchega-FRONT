<script setup lang="ts">import BrandMark from '../BrandMark.vue'</script>
<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div><BrandMark/><p class="footer-copy">Moradia com contexto local, informação clara e menos atrito para quem chega a Cruz das Almas.</p></div>
      <div><h4>Navegação</h4><RouterLink to="/imoveis">Encontrar moradia</RouterLink><RouterLink to="/anuncios/novo">Anunciar</RouterLink><RouterLink to="/login">Entrar</RouterLink></div>
      <div><h4>Projeto</h4><a href="/#como-funciona">Como funciona</a><a href="/#sobre">Sobre</a></div>
    </div>
    <div class="container footer-bottom">Aconchega Aí · Cruz das Almas, Bahia</div>
  </footer>
</template>
