import PropTypes from 'prop-types';
import { memo } from "react";
import './style.css';

function Categories(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  const createCategoryOption = (acc, category, level = 0) => {
      acc.push(<option key={category._id} value={category._id}>{'-'.repeat(level)}{category.title}</option>);
      
      if (category.subCategories) {
        return category.subCategories.reduce((result, category) => createCategoryOption(result, category, level + 1), acc);
      }
     
      return acc;
  }

  return (
    <select className="Categories" value={props.value} onChange={onSelect}>
      <option value='' key='1'>Все</option>
      {props.options.reduce((acc, category) => createCategoryOption(acc, category), [])}
    </select>
  )
}

Categories.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Categories.defaultProps = {
  onChange: () => {
  }
}

export default memo(Categories);
