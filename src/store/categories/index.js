import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    }
  }
  setCategoriesMap(items, parent = null) {
    const result = [];
    for (const item of items) {
      if ((parent === null && item.parent === null) || (item.parent && item.parent._id === parent)) {
        const subCategories = this.setCategoriesMap(items, item._id);
        if (subCategories.length > 0) {
          item.subCategories = subCategories;
        }
        result.push(item);
      }
    }
    return result;
  };
  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState({
      categories: this.setCategoriesMap(json.result.items)
    });

  }
}

export default CategoriesState;