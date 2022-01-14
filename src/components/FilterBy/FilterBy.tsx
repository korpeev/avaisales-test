import React, { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/useDispatchAndSelector';
import { ListButtons } from '../../types';
import './FilterBy.scss';

const filterList: ListButtons[] = [
  {
    text: 'Все',
    id: 'all',
    checked: false,
  },
  {
    text: 'Без Пересадок',
    id: 'withoutTransfer',
    checked: false,
  },
  {
    text: '1 Пересадка',
    id: '1_transfer',
    checked: false,
  },
  {
    text: '2 Пересадки',
    id: '2_transfers',
    checked: false,
  },
  {
    text: '3 Пересадки',
    id: '3_transfers',
    checked: false,
  },
];
interface FilterByProps {
  setFilterId: (id: string) => void;
}
const FilterBy: FC<FilterByProps> = ({ setFilterId }) => {
  const [list, setList] = useState(filterList);
  const handleOnChange = (checked: boolean, id: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setList((prev) =>
        prev.map((prevList) =>
          prevList.id === id ? { ...prevList, checked: !checked } : prevList
        )
      );
    };
  };

  const handleOnClick = (id: string) => {
    const checked = list.find((item) => item.id === id)?.checked as boolean;
    if (!checked) {
      setFilterId(id);
    }
  };

  const renderList = React.useMemo(() => {
    return list.map(({ text, id, checked }) => {
      return (
        <li
          onClick={() => handleOnClick(id)}
          key={id}
          className='filter__menu-item'
        >
          <input
            onChange={handleOnChange(checked as boolean, id)}
            className='custom_checkbox'
            checked={checked as boolean}
            type='checkbox'
            id={id}
          />
          <label htmlFor={id}>{text}</label>
        </li>
      );
    });
  }, [list]);
  return (
    <div className='filter'>
      <span className='filter__title title'>Количества пересадок</span>
      <ul className='filter__menu-list'>{renderList}</ul>
    </div>
  );
};

export default FilterBy;
