import StoreModule from "../module";

/**
 * информация о текущем пользователе
 */
class AuthState extends StoreModule {

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

export default AuthState;