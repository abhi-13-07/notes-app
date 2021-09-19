import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import NotesApi from '../Api/NotesApi';

const notesApi = new NotesApi();

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { accessToken, user } = useAuth();

	useEffect(() => {
		notesApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchNotes = async () => {
			console.log('Running notes provider effect');

			setLoading(true);
			try {
				const { data, status } = await notesApi.getAllNotes(
					user.id,
					source.token
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
			console.log('cleanup');
			source.cancel();
		};
	}, [user.id]);

	const updateNote = (id, data) => {
		console.log('updating notes');
		setNotes(notes => {
			return notes.map(note => {
				if (note._id === id) {
					return { ...note, title: data.title, body: data.body };
				}
				return note;
			});
		});
	};

	const removeNote = id => {
		setNotes(notes => {
			return notes.filter(note => note._id !== id);
		});
	};

	return (
		<NotesContext.Provider
			value={{ notes, setNotes, loading, error, updateNote, removeNote }}
		>
			{children}
		</NotesContext.Provider>
	);
};

export default NotesProvider;
