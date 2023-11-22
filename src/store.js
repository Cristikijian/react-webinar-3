/**
 * Хранилище состояния приложения
 */
class Store {
  lastId = 0;

  constructor(initState = { list: [] }) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    if (this.state.list.length > 0) {
      this.lastId = this.state.list.length;
    }
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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
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

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: ++this.lastId, title: "Новая запись", counter: 0 },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected === true) {
            item.counter += 1;
          }
        }
        if (item.code !== code) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
