import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from './AuthProvider';
import NotesApi from '../Api/NotesApi';

const notesApi = new NotesApi();

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { accessToken, user } = useAuth();

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const { data, status } = await notesApi.getAllNotes(
					user.id,
					accessToken
				);

				if (status === 200) {
					setNotes(data.notes);
				} else {
					console.log('error while fetching notes', data);
					setError(data);
				}

				setLoading(false);
			} catch (err) {
				console.log(err.message, err);
				setLoading(false);
			}
		};

		fetchNotes();

		return () => {
			notesApi.cancelToken.cancel();
		};
	}, [accessToken, user.id]);

	return (
		<NotesContext.Provider value={{ notes, setNotes, loading, error }}>
			{children}
		</NotesContext.Provider>
	);
};

export default NotesProvider;
