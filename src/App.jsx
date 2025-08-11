import { Route, Routes } from "react-router"
import Footer from "./components/footer"
import Header from "./components/header"
import Main from "./components/main"
import './style.css'
import Detail from "./pages/Detail"
import MainLayout from "./layout/MainLayout"

function App() {

	return (
		<div>
			<Header />
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Main />} /> 
					<Route path="/kitab/:name/:id" element={<Detail />} />  
				</Route>
			</Routes>
			<Footer />
		</div>
	)
}

export default App
