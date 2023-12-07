import { cn as bem } from '@bem-react/classname';
import React, { useState } from "react";
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import './style.css';

const SEPARATOR_OFFSET = 3;

function Pages () {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const select = useSelector(state => ({
    count: state.catalog.count,
  }));

  const cn = bem('Pages');

  const handlePageClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const page = parseInt(event.target.textContent);
    setCurrentPage(page);
    store.actions.catalog.load(page);
  }

  const getPagesCount = (count) => {
    const itemsLimit = 10;
    const overItems = count % itemsLimit;
    const fullPages = (count - overItems) / itemsLimit; 
    return overItems === 0 ? fullPages : fullPages + 1;
  }

  const pagesCount = getPagesCount(select.count);

  function getPages(total, current) {
    const prefix = <>
      <a className={cn('link', {active: 1 === current})}>1</a>
      { current < SEPARATOR_OFFSET && <>
        <a className={cn('link', {active: 2 === current})}>2</a>
        <a className={cn('link', {active: SEPARATOR_OFFSET === current})}>3</a>
      </> }
      { Math.abs(1 - current) >= SEPARATOR_OFFSET && <span className={cn('separator')}> ... </span> }
    </>;

    const middle = current >= SEPARATOR_OFFSET && current <= (total - SEPARATOR_OFFSET + 1) && <>
      <a className={cn('link')}>{ current - 1}</a>
      <a className={cn('link', {active: true})}>{current}</a>
      <a className={cn('link')}>{ current + 1 }</a>
    </>;

    const beforeLast = total - 1;
    const postfix = <>
      { total - current >= SEPARATOR_OFFSET && <span className={cn('separator')}> ... </span> }
      { current > total - SEPARATOR_OFFSET + 1 && <>
        <a className={cn('link', {active: beforeLast - 1 === current})}>{ beforeLast - 1 }</a>
        <a className={cn('link', {active: beforeLast === current})}>{ beforeLast }</a>
      </> }
      <a className={cn('link', {active: total === current})}>{total}</a>
    </>

    return [prefix, middle, postfix];
  }

  return <div className={cn()} onClick={handlePageClick}>{ getPages(pagesCount, currentPage) }</div>
};



export default Pages;