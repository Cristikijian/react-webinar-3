import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from "react";
import './style.css';

function UserCard({userInfo, t}) {
  const cn = bem('UserCard');
  return (<div className={cn()}>
   <div className={cn('title')}>{t('user.profile')}</div>
   {userInfo && 
   <><div className={cn('prop')}>
     <div className={cn('label')}>{t('user.name')}</div>
     <div className={cn('value')}>{userInfo.profile.name}</div>
   </div>
   <div className={cn('prop')}>
     <div className={cn('label')}>{t('user.phone')}</div>
     <div className={cn('value')}>{userInfo.profile.phone}</div>
   </div>
   <div className={cn('prop')}>
     <div className={cn('label')}>{t('user.email')}</div>
     <div className={cn('value')}>{userInfo.email}</div>
   </div></>}
 </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
};

UserCard.defaultProps = {
  t: (text) => text
}

export default memo(UserCard);