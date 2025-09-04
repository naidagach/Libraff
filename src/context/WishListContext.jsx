import { createContext, useContext, useEffect, useState } from "react";

const WishList = createContext(null)
 
function WishListContext({children}) {

    const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')) || [])

    useEffect(() => {
        localStorage.setItem('wishList', JSON.stringify(wishList))
    }, [])

    function addLike(item) {
        const check = wishList.find(elem => elem.id === item.id)
        let newList
        if (!check) {
          newList = [...wishList, {...item, count: 1}]
        } else {
          newList = wishList.map(elem => (
            elem.id === item.id 
              ? {...elem, count: elem.count + 1}
              : elem
          ))
        }
        setWishList(newList)
        localStorage.setItem('wishList', JSON.stringify(newList))
    }

    function removeLike(id) {
        setWishList((prev) => {
            const updated = prev.filter(el => el.id !== id)
            localStorage.setItem('wishList', JSON.stringify(updated))
            return updated
        })

    }

    function clearLikes() {
        setWishList([])
        localStorage.removeItem("wishList")
    }
   return (
        <WishList.Provider value={{wishList, setWishList, addLike, removeLike, clearLikes}}>
            {children}
        </WishList.Provider>
   )
 }
 
 export default WishListContext
 export const useWishList = () => useContext(WishList)
 