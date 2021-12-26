import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Avatar } from "../Components";
import { useAuth } from "../Context/AuthProvider";
import { useNotes } from "../Context/NotesProvider";
import UserApi from "../Api/UserApi";

const userApi = new UserApi();

const Profile = () => {
	const { user, accessToken, setUser } = useAuth();
	const { notes } = useNotes();
	const [isEditMode, setIsEditMode] = useState(false);
	const [userDetails, setUserDetails] = useState(user);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		userApi.setAccessToken(accessToken);
	}, [accessToken]);

	const handleUpdate = async () => {
		try {
			setLoading(true);
			const payload = {
				name: `${userDetails.firstName} ${userDetails.lastName}`,
			};

			if (!isDefaultDisplayPicture(userDetails.displayPicture)) {
				payload.displayPicture = userDetails.displayPicture;
			}

			const { data, status } = await userApi.updateUser(payload, user.id);

			if (status === 200) {
				setLoading(false);
				setUser(data.user);
				history.push("/");
			} else {
				history.push("/me");
			}
		} catch (err) {
			console.log("Updating User", err);
		}
	};

	const isDefaultDisplayPicture = picUrl => {
		console.log(/https:\/\/t4\.ftcdn\.net\//.test(picUrl), picUrl);
		return /https:\/\/t4\.ftcdn\.net\//.test(picUrl);
	};

	return (
		<div>
			<AppBar user={user} />
			<div className="text-center" style={{ marginTop: "15px" }}>
				<Avatar size="lg" src={user.displayPicture} />
				{isEditMode && (
					<>
						<p>Paste the image url here</p>
						<input
							className="input"
							type="url"
							name="displayPicture"
							placeholder="Paste the image url here"
							value={
								isDefaultDisplayPicture(userDetails.displayPicture)
									? ""
									: userDetails.displayPicture
							}
							onInput={e =>
								setUserDetails(prev => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						/>
					</>
				)}
			</div>
			<section
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					className="bg-white"
					style={{
						minWidth: "400px",
						maxWidth: "400px",
						marginTop: "20px",
						padding: "10px",
					}}
				>
					<div style={{ marginBottom: "10px" }}>
						<span className="flex-center-between">
							<strong>Firstname: </strong>
							{isEditMode ? (
								<input
									className="input"
									type="text"
									name="firstName"
									value={userDetails.firstName}
									onChange={e =>
										setUserDetails(prev => ({
											...prev,
											[e.target.name]: e.target.value,
										}))
									}
								/>
							) : (
								<span>{user?.firstName}</span>
							)}
						</span>
					</div>

					<div style={{ marginBottom: "10px" }}>
						<span className="flex-center-between">
							<strong>Lastname: </strong>
							{isEditMode ? (
								<input
									className="input"
									type="text"
									name="lastName"
									value={userDetails.lastName}
									onChange={e =>
										setUserDetails(prev => ({
											...prev,
											[e.target.name]: e.target.value,
										}))
									}
								/>
							) : (
								<span>{user?.lastName ?? "----"}</span>
							)}
						</span>
					</div>

					<div style={{ marginBottom: "10px" }}>
						<span className="flex-center-between">
							<strong>Email: </strong>
							<span>{user?.email}</span>
						</span>
					</div>

					<div style={{ marginBottom: "10px" }}>
						<span className="flex-center-between">
							<strong>Created At: </strong>
							<span>
								{new Date(user?.createdAt).toLocaleString("en-GB", {
									day: "2-digit",
									month: "short",
									year: "numeric",
									hour12: true,
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</span>
					</div>

					<div style={{ marginBottom: "10px" }}>
						<span className="flex-center-between">
							<strong>Total Notes: </strong>
							<span>{notes?.length}</span>
						</span>
					</div>
				</div>
			</section>

			<div className="text-center" style={{ margin: "15px" }}>
				<button
					style={{ margin: "10px" }}
					className="btn btn-warning-box"
					onClick={() => setIsEditMode(prev => !prev)}
				>
					<i
						className={`fas ${isEditMode ? "fa-times" : "fa-pen"}`}
						style={{ marginRight: "10px" }}
					></i>
					{isEditMode ? "Cancel" : "Edit"}
				</button>

				{isEditMode && (
					<button
						disabled={loading}
						className="btn btn-success-box"
						onClick={handleUpdate}
					>
						<i className="fas fa-check" style={{ marginRight: "10px" }}></i>
						Udpate
					</button>
				)}
			</div>
			<div className="text-center">
				<Link to="/" className="btn btn-primary-box" style={{ margin: "10px" }}>
					Back To Home
				</Link>
			</div>
		</div>
	);
};

export default Profile;
