<template>
  <main>
    <div class="mainContainer">
      <div id="descr">
        <p>
          Это не просто работа. Это координация действий в команде.
        </p>
        <p>
          Начните с досок, колонок и карточек, а затем переходите к более сложным функциям. Управляйте проектами, упорядочивайте задачи и поддерживайте командный дух — все это в Trello.
        </p>
      </div>
      <div id="img">
        <img src="https://i.postimg.cc/mr7G7WkS/example.png">
      </div>
      <div id="reg" class="lbrown">
        <p>
          Начните планировать свои групповые проекты прямо сейчас
        </p>
        <form>
          <p>
            Пройдите регистрацию:
          </p>
          <div id="inp">
            <input id="mail" placeholder="Имя пользователя">
            <router-link to="/registration/" id="regButton" type="submit" class="green">
              Зарегистрироваться
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        username: ''
      }
    }
  }
</script>

<style scoped>
#descr {
  margin-bottom: 30px;
}
#descr p {
  text-align: center;
  color: black;
  font-size: 24px;
}
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 100px;
  padding-top: 50px;
  background: linear-gradient(to bottom, #a4fffa, #ffffff);
}
.mainContainer {
  width: 30%;
}
img {
  width: 100%;
}
#reg {
  border-radius: 10px;
  width: 50%;
  margin: 0 auto;
  padding: 10px 5px;
  text-align: left;
  font-size: 18px;
}
a {
  text-decoration: none;
}
#reg p {
  color: white;
}
.lbrown {
  background-color: #6A5D5E;
}
.green {
  background-color: #86920F;
}
#inp {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#regButton {
  border: 0;
  border-radius: 10px;
  padding: 5px;
  color: white;
  text-align: center;
}

#mail {
  border: 0;
  border-radius: 10px;
  text-align: center;
  padding: 10px 0px;
  width: 45%;
}

#regButton:hover {
  background-color: #B2BC4E;
}
</style>