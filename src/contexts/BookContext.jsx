import React, { createContext, useState, useEffect, useContext } from 'react';

const BookContext = createContext();

export function BookProvider({ children }) {
    const [books, setBooks] = useState(() => {
        const saved = localStorage.getItem('family-book-log-data');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('family-book-log-data', JSON.stringify(books));
    }, [books]);

    const addBook = (book) => {
        const newBook = {
            ...book,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            date: new Date().toISOString()
        };
        setBooks(prev => [newBook, ...prev]);
    };

    const removeBook = (id) => {
        setBooks(prev => prev.filter(b => b.id !== id));
    };

    const getBooksByUser = (userId) => {
        return books.filter(b => b.childId === userId);
    };

    return (
        <BookContext.Provider value={{ books, addBook, removeBook, getBooksByUser }}>
            {children}
        </BookContext.Provider>
    );
}

export function useBooks() {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBooks must be used within a BookProvider');
    }
    return context;
}
