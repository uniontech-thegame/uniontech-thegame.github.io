<template>
  <div class="page">
    <div class="container">
      <h1>UNION'TECH: The Game</h1>
      <p><img src="../assets/images/logo_big.png" alt="UNION'TECH" id="image"></p>
      <p>
        Bienvenue sur le site UNION'TECH: The Game!<br>
        Ici, vous allez pouvoir suivre le cours de la compétition tout au long du semestre.
      </p>

      <h2><i class="material-icons">turned_in</i> Qu'est-ce que c'est ?</h2>

      <p>
        Projet PFH de S4 orchestré par l'équipe <i>UNION'TECH</i>,
        <i>UNION'TECH: The Game</i> est l'occasion pour vous de faire des rencontres au sein d'IN'TECH
        au travers de multiples activités : un <a href="https://fr.wikipedia.org/wiki/Paintball">Paintball 🔫</a> et un <a href="https://fr.wikipedia.org/wiki/Jeu_d%27%C3%A9vasion_grandeur_nature">Escape Game 🔎</a>.<br>
        Mais pas seulement ! Tout au long du semestre, vous allez pouvoir <router-link to="/detective">jouer au détective</router-link>, en trouvant des codes cadeaux
        dans l'enceinte de l'école ou dans certains emails (soyez attentifs !), ainsi que des énigmes à résoudre.<br>
      </p>

      <p>Allez, on est gentils, vous pourrez trouver des codes si vous allez voir <a href="https://github.com/uniontech-thegame/uniontech-thegame.github.io">le code source de ce site</a>...</p>

      <h2><i class="material-icons">access_time</i> Quand est-ce que ça se passe ?</h2>

      <p>
        Les codes cadeaux et énigmes seront diffusés tout le long du semestre. Pendant les pauses et la pause repas,
        vous êtes susceptibles de recevoir un email contenant une énigme. À vous d'être le plus rapide à rentrer la
        bonne réponse sur ce même site pour empocher des points.
      </p>

      <p>
        Les activités se passeront courant décembre pour le Paintball et début janvier pour l'Escape Game.<br>
        Les dates précises vous seront communiquées par email.
      </p>

      <h2><i class="material-icons">done</i> Comment on participe ?</h2>

      <p>
        Vous avez tous été affectés de façon aléatoire à une équipe, un email vous informant de l'équipe à laquelle vous appartenez.<br>
        Vous pouvez consulter les membres de chaque équipe:
        <ul>
          <li><router-link to="/equipe/bleu">Équipe Bleu</router-link></li>
          <li><router-link to="/equipe/jaune">Équipe Jaune</router-link></li>
          <li><router-link to="/equipe/vert">Équipe Vert</router-link></li>
          <li><router-link to="/equipe/rouge">Équipe Rouge</router-link></li>
        </ul>
      </p>

      <p>
        Nous avons fait le choix de vous attribuer aléatoirement une équipe pour vous inciter à travailler en équipe
        et à faire de nouvelles rencontres, dans l'esprit IN'TECH.
      </p>

      <p>
        Une à deux semaines avant le début de chaque activité, tous les participants recevront un formulaire d'inscription. Les places sont limitées, les premiers à s'inscrire seront les premiers servis
        (maximum de 5 membres par équipe).
      </p>
      
      <p class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/HXj3WJaNLEc?rel=0" frameborder="0" allowfullscreen></iframe></p>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.page {
  background-color: #27ae60;
}

h2, p a {
  color: #fff;
}

#image {
  width: 270px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
}
</style>
