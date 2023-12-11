import StoreModule from "../module";

class CatalogItem extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      itemInfo: null,
    }
  }
  
  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      itemInfo: json.result,
    }, 'Информация о товаре')
  }
}

export default CatalogItem;

