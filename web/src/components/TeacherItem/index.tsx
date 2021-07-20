import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.scss';

export type Teacher = {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

type TeacherProps = {
  teacher: Teacher;
}

export function TeacherItem({ teacher }: TeacherProps) {

  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
      <img src={teacher.avatar} alt={teacher.name} />
      
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      
      <p>{teacher.bio}</p>
      
      <footer>
        <p>
          Preço por hora
          <strong>R$ {teacher.cost}</strong>
        </p>
      
        <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} target="_blank" rel="noopener noreferrer" type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
        
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}