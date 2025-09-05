import { Route, Routes } from "react-router"
import Footer from "./components/footer"
import Header from "./components/header"
import Main from "./components/main"
import './style.css'
import Detail from "./pages/Detail"
import MainLayout from "./layout/MainLayout"
import WishList from "./pages/WishList"
import Basket from "./pages/Basket"
import Category from "./pages/Category"
import Bestsellers from "./pages/Bestsellers"
import Authors from "./pages/Authors"

function App() {

	return (
		<div>
			<Header />
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Main />} />
					<Route path="/kitab/:name/:id" element={<Detail />} />
					<Route path="/wish-list" element={<WishList />} />
					<Route path="/basket" element={<Basket />} />
					<Route path="/catalog/:firstcat/:secondcat?/:thirdcat?" element={<Category />} />  
					<Route path="/bestsellers" element={<Bestsellers />} />
					<Route path="/authors" element={<Authors />} />
				</Route>
			</Routes>
			<Footer />
		</div>
	)
}

export default App
