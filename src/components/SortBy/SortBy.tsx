import React, { FC, useMemo, useState } from 'react';
import cn from 'classnames';
import { ListButtons } from '../../types';
import './SortBy.scss';

interface SortByProps {
  activeId: string;
  handleOnClick: (id: string) => () => void;
}
const listButtons: ListButtons[] = [
  {
    id: 'cheapest',
    text: 'Самый дешёвый',
  },
  {
    id: 'faster',
    text: 'Самый быстрый',
  },
  {
    id: 'optimal',
    text: 'Оптимальный',
  },
];
const SortBy: FC<SortByProps> = ({ activeId, handleOnClick }) => {
  const renderButtons = useMemo(() => {
    return listButtons.map(({ text, id }) => {
      return (
        <div
          key={id}
          onClick={handleOnClick(id)}
          className={cn('sort__button', { active: id === activeId })}
        >
          <label htmlFor={id}>{text}</label>
          <input type='radio' name={id} id={id} />
        </div>
      );
    });
  }, [listButtons, activeId]);
  return (
    <div className='sort'>
      <div className='sort__buttons'>{renderButtons}</div>
    </div>
  );
};

export default SortBy;
