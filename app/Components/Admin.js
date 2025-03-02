'use client';

import React from 'react';

export default function Admin({ user }) {
  return (
    <div>
      {user && user.id_role === 2 ? (
        <>Ты админ, крутое достижение, но тут ничего пока нет</>
      ) : (
        <div>У вас нет прав администратора</div>
      )}
    </div>
  );
}
