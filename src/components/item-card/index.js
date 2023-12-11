import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import { memo } from "react";
import { numberFormat } from "../../utils";
import './style.css';

function ItemCard(props) {
  const { item, onAddToBasket } = props;
  const cn = bem('ItemCard');

  const callbacks = {
    handleAddToBasket: () => onAddToBasket(item._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('country')}>Страна производитель: <b>{item.madeIn.title}</b></div>
      <div className={cn('category')}>Категория: <b>{item.category.title}</b></div>
      <div className={cn('edition')}>Год выпуска: <b>{item.edition}</b></div>
      <div className={cn('price')}><b>Цена: {numberFormat(item.price)}</b></div>
      <div className={cn('button-container')}>
        <button type='submit' className={cn('button')} onClick={callbacks.handleAddToBasket}>Добавить</button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    country: PropTypes.string,
    description: PropTypes.string,
    edition: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToBasket: PropTypes.func,
};

export default memo(ItemCard);
