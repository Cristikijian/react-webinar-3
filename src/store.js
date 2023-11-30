/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  openModal() {
    this.setState({
      ...this.state,
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      showModal: false,
    });
  }

  /**
   * Добавление записи по коду
   * @param code
   */
  addItem(code) {
    let basket;

    if (this.state.basket.find((i) => i.code === code)) {
      basket = this.state.basket.map((basketItem) => {
          if(code === basketItem.code) {
            basketItem.count++;
          }          
          return basketItem;
        });
    } else {
      const item = this.state.list.find((i) => i.code === code);
      basket = [...this.state.basket, { ...item, count: 1}];
    }

    this.setState({
      ...this.state,
      basket,
    })
  }

  deleteItem(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== code)
    })
  }
}

export default Store;
