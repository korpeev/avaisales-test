import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Ticket } from '../../types';
import TicketItem from './TicketItem';
import './Tickets.scss';

interface TicketsProps {
  tickets: Ticket[];
  setFilterId: (id: string) => void;
}

const Tickets: FC<TicketsProps> = ({ tickets, setFilterId }) => {
  const [limit, setLimit] = useState(5);
  const [limitedTickets, setLimitedTickets] = useState<Ticket[]>([]);
  const handleLimitTickets = () => {
    setLimit((prev) => prev + 5);
  };
  const handleFilterId = () => setFilterId('all');
  useLayoutEffect(() => {
    setLimitedTickets(tickets.slice(0, 5));
  }, [tickets]);
  useEffect(() => {
    setLimitedTickets((prev) => prev.concat(tickets.slice(limit - 5, limit)));
  }, [limit]);
  return (
    <div className='ticket'>
      {limitedTickets.length > 0 ? (
        <ul className='ticket__list'>
          {limitedTickets.map(({ price, segments, id }) => (
            <TicketItem
              key={id}
              price={price}
              segments={segments.map((segment) => ({ ...segment, id: uuid() }))}
            />
          ))}
          <div className='ticket__lg'>
            <button onClick={handleLimitTickets} className='ticket__lg-button'>
              Показать еще 5 билетов!
            </button>
          </div>
        </ul>
      ) : (
        <div className='ticket__notfound'>
          <h3>Ничего не найдено!</h3>
          <button onClick={handleFilterId} className='ticket__lg-button'>
            Загрузить все билеты?!
          </button>
        </div>
      )}
    </div>
  );
};

export default Tickets;
