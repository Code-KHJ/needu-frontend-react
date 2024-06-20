import React, { useEffect, useMemo, useRef } from 'react';
import styles from './Element.module.scss';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index';
import Flatpickr from 'react-flatpickr';
import { Korean } from 'flatpickr/dist/l10n/ko';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import formattedDate from '@/utils/formattedDate';

interface InputProps {
  name: string;
  working: boolean;
  minDate: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDate: React.FC<InputProps> = ({
  name,
  working,
  minDate,
  value,
  onChange,
}) => {
  const today = formattedDate(new Date()).slice(0, 10);
  const inputRef = useRef(null);

  const options = useMemo(
    () => ({
      locale: Korean,
      minDate: minDate,
      maxDate: today,
      disableMobile: true,
      plugins: [new monthSelectPlugin({ shorthand: true, dateFormat: 'Y-m' })],
      onChange: (selectedDates: Date[]) => {
        const Date = formattedDate(selectedDates[0]);
        const event = {
          target: {
            name: name,
            value: Date.slice(0, 10),
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      },
    }),
    [minDate, name, onChange, today]
  );

  switch (name) {
    case 'start_date':
      return (
        <Flatpickr
          name={name}
          className={styles.input_date}
          ref={inputRef}
          options={options}
          value={value}
          placeholder="입사일"
        />
      );
    case 'end_date':
      if (working) {
        return (
          <Flatpickr
            name={name}
            className={styles.input_date}
            ref={inputRef}
            options={options}
            value="9999-12-31"
            placeholder="재직중"
            disabled
          />
        );
      }
      return (
        <Flatpickr
          name={name}
          className={styles.input_date}
          ref={inputRef}
          options={options}
          value={value}
          placeholder="퇴사일"
        />
      );
  }
};

export default InputDate;
