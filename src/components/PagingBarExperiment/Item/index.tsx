import React from 'react';
import styles from './item.module.scss';

type TProps = {
  content: string;
  onClick: (content: string) => void;
  className?: string;
};

export const Item: React.FC<TProps> = ({ content, onClick, className }) => (
  <li className={`${styles.item} ${className || ''}`} onClick={() => onClick(content)}>{content}</li>
);