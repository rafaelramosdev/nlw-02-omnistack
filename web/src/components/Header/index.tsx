import { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';

import backIcon from '../../assets/images/icons/back.svg';

import './styles.scss';

type HeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Header({ title, description, children }: HeaderProps) {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/" >
          <img src={backIcon} alt="Voltar" />
        </Link>
        
        <img src={logoImg} alt="Proffy" />
      </div>
        
      <div className="header-content">
        <strong>{title}</strong>

        { description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
}