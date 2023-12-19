import StoreModule from "../module";

/**
 * информация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      userInfo: null,
      isAutorize: false,
      error: null,
    }
  }

  async loginUser(login, password) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password})
      });

      const data = await response.json();
      if(data.error) {
        this.setState({
          ...this.getState(),
          error: data.error.message,
        });
        return;
      }

      window.localStorage.setItem('token', data.result.token);
      this.setState({
        ...this.getState(),
        userInfo: data.result.user,
        isAutorize: true,
      });
    }
    catch (e) {
        this.setState({
          ...this.getState(),
          error: e.message,
        });
    }
  }

  async getAuthStatus () {
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.setState({
        ...this.getState(),
        isAutorize: false,
      });
    }
    if (token) {
      try {
        const response = await fetch("/api/v1/users/sign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Token": localStorage.getItem('token')
          }
        });
        this.setState({
          ...this.getState(),
          isAutorize: true,
        });
      }
      catch {

      }
    }
  }

  async getUserInfo () {
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem('token')
        },
      })
      const json = await response.json();

      // Информация загружена
      this.setState({
        ...this.getState(),
        userInfo: json.result,
      }, 'Загружена информация о пользователе');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        userInfo: null,
      });
    }
  }


  async deleteUserInfo() {
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": localStorage.getItem('token')
      },
    })
    this.setState({
      ...this.getState(),
      userInfo: null,
      isAutorize: false,
    });
  }
}

export default UserState;