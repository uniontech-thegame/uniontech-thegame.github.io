<template>
  <nav>
    <router-link to="/" exact><img src="../assets/images/book.png" alt="Introduction"></router-link>
    <router-link to="/detective" exact><img src="../assets/images/detective.png" alt="Détective"></router-link>
    <router-link to="/equipes" exact><img src="../assets/images/team.png" alt="Équipes et classement"></router-link>
    <router-link to="/bienfaiteurs" exact><img src="../assets/images/star.png" alt="Membres bienfaiteurs"></router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style scoped>
nav {
  position: fixed;

  padding: 0;
  margin: 0;
  margin-left: 20px;

  margin-top: 50vh;
  transform: translateY(-50%);
}

a {
  width: 32px;
  height: 32px;

  margin-bottom: 20px;

  display: block;
  text-decoration: none;
}

a.router-link-active {
  width: 48px;
  height: 48px;
}

a.router-link-active img {
  width: 48px;
  height: 48px;
}

a:last-of-type {
  margin-bottom: 0;
}

a img {
  width: 32px;
  height: 32px;
}
</style>
