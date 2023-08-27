<template>
  <main>
    <form>
      <p>
        Регистрация нового пользователя
      </p>
      <input class="regForm" placeholder="Электронная почта">
      <input class="regForm" placeholder="Пароль">
      <button class = "regForm gray" id="regButton" type="submit">
        Зарегистрироваться
      </button>
      <div id="login">
        <p id="haveAcc">
          Уже есть аккаунт?
        </p>
        <router-link to="/users/1/desks" id="loginButton" class="gray">Войти</router-link>
      </div>
    </form>
  </main>
</template>

<script>

</script>

<style scoped>
main {
  height: 90%;
  display: flex;
  align-items: center;
  width: 300px;
  margin: 0 auto;
}
.gray {
  background-color: #979797;
}
form {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  text-align: center;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  padding: 12px 20px;
}
#regButton {
  color: white;
  border: none;
  margin-bottom: 20px;
}

#regButton:hover {
  background-color: #C3C3C3;
}
.regForm {
  width: 100%;
  text-align: center;
  margin: 10px 0;
  padding: 8px;
  border-radius: 5px;
  border-width: 1px;
}
#loginButton {
  padding: 8px 10px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-size: 14px;
}

#loginButton:hover {
  background-color: #C3C3C3;
}

#haveAcc {
  font-size: 11px;
  color: #9B9B9B;
}
</style>