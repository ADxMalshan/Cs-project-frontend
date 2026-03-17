import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";

import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppointmentPage from "./pages/client/appoinmentPage";
import LoginModal from "./pages/loginModel";
import RegisterModal from "./pages/registerPage";
import UserProfile from "./pages/client/userProfile";
import AppointmentUpdatePage from "./pages/client/appoitmentUpdate";

function App() {
	return (
		<GoogleOAuthProvider clientId = "631792534424-sbpquhqen559e84esbqa4jq92ifd27q4.apps.googleusercontent.com">
			<BrowserRouter>
			<Toaster position="bottom-right" reverseOrder={false}/>
				<Routes path="/*"> 
					<Route path="/admin/*" element={<AdminPage/>}/>
					<Route path="/login" element={<LoginModal/>}/>
					<Route path="/register" element={<RegisterModal/>}/>
					<Route path="/appointment" element={<AppointmentPage/>}/>
					<Route path="/update" element={<AppointmentUpdatePage />} />
					<Route path="/profile" element={<UserProfile/>}/>
					<Route path="/*" element={<HomePage/>}/>
				</Routes>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;
