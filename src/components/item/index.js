import PropTypes from "prop-types";
import React from "react";
import { useMoneyFormatter } from "../../hooks/useMoneyFormatter";
import './style.css';

function Item(props) {

  const formatter = useMoneyFormatter();

  const onAdd = () => {
    props.onAdd(props.item.code);
  };

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{`${formatter.format(props.item.price)}`}</div>
      <div className='Item-button'>
        <button onClick={onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(Item);
