import StoreModule from "../module";

/**
 * информация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      userInfo: null,
    }
  }

  async getUserInfo (id) {
    try {
      const response = await fetch(`/api/v1/users/${id}?fields=*`, {
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
      this.setState({
        userInfo: null,
      });
    }
  }
}

export default UserState;