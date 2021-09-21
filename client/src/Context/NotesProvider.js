import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import NotesApi from '../Api/NotesApi';
import { v4 as uuidV4 } from 'uuid';

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

	const updateNote = async (id, data) => {
		const note = notes.find(note => note.noteId === id);

		setNotes(notes => {
			return notes.map(note => {
				if (note._id === id) {
					return { ...note, title: data.title, body: data.body };
				}
				return note;
			});
		});

		try {
			const { data: response, status } = await notesApi.updateNote(id, data);
			if (status !== 200) {
				console.log('Unable to update the note');
				return setNotes(notes => [...notes, note]);
			}
			console.log(response);
		} catch (err) {
			console.log(err);
			console.log('Unable to update the note');
			return setNotes(notes => [...notes, note]);
		}
	};

	const removeNote = async id => {
		const note = notes.find(note => note.noteId === id);
		setNotes(notes => {
			return notes.filter(note => note.noteId !== id);
		});

		try {
			const { data, status } = await notesApi.deleteNote(id);
			if (status !== 200) {
				console.log('Unable to delete the note');
				return setNotes(notes => [...notes, note]);
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			console.log('Unable to delete the note');
			return setNotes(notes => [...notes, note]);
		}
	};

	const addNewNote = async ({ title, body }) => {
		const noteId = uuidV4();
		const note = {
			noteId,
			title,
			body,
		};
		setNotes(notes => [note, ...notes]);
		try {
			const { data, status } = await notesApi.addNote(note);
			if (status !== 201) {
				console.log('Unable to add note');
				return setNotes(notes => notes.filter(note => note.noteId !== noteId));
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			console.log('Unable to add note');
			return setNotes(notes => notes.filter(note => note.noteId !== noteId));
		}
	};

	return (
		<NotesContext.Provider
			value={{
				notes,
				setNotes,
				loading,
				error,
				updateNote,
				removeNote,
				addNewNote,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
};

export default NotesProvider;
