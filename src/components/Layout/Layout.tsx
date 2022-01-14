import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/useDispatchAndSelector';
import logo from '../../logo.svg';
import { MappingBySort, Ticket } from '../../types';
import FilterBy from '../FilterBy/FilterBy';
import SortBy from '../SortBy/SortBy';
import Tickets from '../Tickets/Tickets';
import './Layout.scss';

const Layout = () => {
  const { tickets: items } = useAppSelector((state) => state);
  const [sortTickets, setSortTickets] = useState<Ticket[]>([]);
  const [activeId, setActiveId] = useState<string | null>('cheapest');
  const [filterId, setFilterId] = useState<string>('');
  const handleOnClick = useCallback(
    (id: string) => () => {
      setActiveId(id);
      setFilterId(id);
    },
    [filterId, activeId]
  );
  const mappingBySort: MappingBySort = useMemo(() => {
    return {
      cheapest: [...sortTickets].sort((a, b) => a.price - b.price),
      faster: [...sortTickets].sort((a, b) => {
        const A_segments = Math.min(
          ...a.segments.map(({ duration }) => duration)
        );
        const B_segments = Math.max(
          ...b.segments.map(({ duration }) => duration)
        );
        return A_segments - B_segments;
      }),
      optimal: [...sortTickets]
        .sort((a, b) => a.price - b.price)
        .filter(({ segments }) =>
          segments.every(({ stops }) => stops.length == 1)
        ),
      all: [...items],
      withoutTransfer: [...sortTickets].filter(({ segments }) =>
        segments.some(({ stops }) => !stops.length)
      ),
      '1_transfer': [...sortTickets].filter(({ segments }) =>
        segments.some(({ stops }) => stops.length === 1)
      ),
      '2_transfers': [...sortTickets].filter(({ segments }) =>
        segments.some(({ stops }) => stops.length === 2)
      ),
      '3_transfers': [...sortTickets].filter(({ segments }) =>
        segments.some(({ stops }) => stops.length === 3)
      ),
    };
  }, [filterId]);

  const sortedItems = useMemo(() => {
    const sorted = mappingBySort[filterId as string];
    return sorted ? sorted : items;
  }, [filterId, items]);
  useEffect(() => {
    setSortTickets(sortedItems);
  }, [filterId, items]);

  return (
    <div className='container'>
      <div className='layout'>
        <div className='layout__logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='content'>
          <FilterBy setFilterId={setFilterId} />
          <div>
            <SortBy
              handleOnClick={handleOnClick}
              activeId={activeId as string}
            />
            <Tickets tickets={sortTickets} setFilterId={setFilterId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
