import React from 'react';
import styles from './Element.module.scss';

interface LabelProps {
  title: string;
  target: string;
  required: boolean;
}

const Label: React.FC<LabelProps> = ({ title, target, required }) => {
  switch (required) {
    case true:
      return (
        <label
          htmlFor={target}
          className={`${styles.label_default}`}
        >
          {title}
          <span style={{ color: 'red' }}>*</span>
        </label>
      );
    case false:
      return (
        <label
          htmlFor={target}
          className={`${styles.label_default}`}
        >
          {title}
        </label>
      );
  }
};

export default Label;
