import React from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { BookProvider } from './contexts/BookContext';

function MainApp() {
  const { currentUser, login, USERS } = useUser();

  if (!currentUser) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
        <h1>독서 기록장에 오신 것을 환영합니다!</h1>
        <p>누구의 책을 기록할까요?</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {USERS.map(user => (
            <button
              key={user.id}
              onClick={() => login(user.id)}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                backgroundColor: user.color,
                color: 'white',
                borderRadius: '12px'
              }}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>안녕하세요, {currentUser.name} 학생!</h1>
      <p>오늘도 즐거운 독서 되세요!</p>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BookProvider>
        <MainApp />
      </BookProvider>
    </UserProvider>
  );
}

export default App;
