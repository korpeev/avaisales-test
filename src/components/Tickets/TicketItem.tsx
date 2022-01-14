import React, { FC } from 'react';
import airlineLogo from '../../airlineslogo.svg';
import { Segment } from '../../types';

interface TicketItemProps {
  price: number;
  segments: Segment[];
}

const TicketItem: FC<TicketItemProps> = ({ price, segments }) => {
  const transformedPrice = price
    .toString()
    .split('')
    .reverse()
    .reduce((acc, number, i) => {
      if (i % 3 === 0) {
        return `${acc} ${number}`;
      }
      return acc.concat(number);
    }, '')
    .split('')
    .reverse()
    .join('');
  const getDestionationTime = (date: string, duration: number, type = '') => {
    return type === 'min'
      ? new Date(date).setMinutes(new Date(date).getMinutes() + duration)
      : new Date(date).setHours(
          new Date(date).getHours() + Math.floor(duration / 60)
        );
  };

  const formatTime = (
    date: string | number,
    type: string = ''
  ): string | null => {
    switch (type) {
      case 'hours': {
        const hours = new Date(date).getHours();
        return hours < 10 ? `0${hours}` : hours.toString();
      }
      case 'minutes': {
        const minutes = new Date(date).getMinutes();
        return minutes < 10 ? `0${minutes}` : minutes.toString();
      }
      default:
        return null;
    }
  };
  const getTotalTime = (duration: number) => {
    const hour = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hour}ч ${minutes}мин`;
  };
  const renderSegment = React.useMemo(() => {
    return segments.map(
      ({ date, destination, id, duration, origin, stops }) => {
        return (
          <div key={id} className='segment'>
            <div className='segment_col'>
              <span className='transparent'>
                {origin}-{destination}
              </span>
              <span>
                {formatTime(date, 'hours')}
                <span>:</span>
                {formatTime(date, 'minutes')}
                <span> - </span>
                {formatTime(
                  getDestionationTime(date, duration, 'hour'),
                  'hours'
                )}
                <span>:</span>
                {formatTime(
                  getDestionationTime(date, duration, 'min'),
                  'minutes'
                )}
              </span>
            </div>
            <div className='segment_col'>
              <span className='transparent'>В Пути</span>
              <span>{getTotalTime(duration)}</span>
            </div>
            <div className='segment_col'>
              <span className='transparent'>
                {stops.length ? `${stops.length} Пересадки` : 'Без Пересадок'}{' '}
              </span>
              <span>{stops.join(', ')}</span>
            </div>
          </div>
        );
      }
    );
  }, []);

  return (
    <li className='ticket__item'>
      <div className='ticket__header'>
        <span className='ticket__header-price'>{transformedPrice} Р</span>
        <img
          className='ticket__header-logo'
          src={airlineLogo}
          alt='airline logo'
        />
      </div>
      <div className='ticket__content'>{renderSegment}</div>
    </li>
  );
};

export default TicketItem;
