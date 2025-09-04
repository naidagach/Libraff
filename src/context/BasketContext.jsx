import React, { createContext, useContext, useEffect, useState } from 'react'

const Basket = createContext(null)

function BasketContext({children}) {

    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || [])

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
    }, [])

    function addToBasket(item) {
        const check = basket.find(elem => elem.id === item.id)
        let newList
        if (!check) {
            newList = [...basket, {...item, count: 1}]
        } else {
            newList = basket.map(elem => (
                elem.id === item.id ? 
                {...elem, count: elem.count + 1} :
                elem
            ))
        }
        setBasket(newList)
        localStorage.setItem('basket', JSON.stringify(newList))
    }

    function removeFromBasket(id) {
        setBasket((prev) => {
            const updated = prev.filter(elem => elem.id !== id)
            localStorage.setItem('basket', JSON.stringify(updated))
            return updated
        })
    }

    function clearBasket() {
        setBasket([])
        localStorage.removeItem('basket')
    }

    return (
        <Basket.Provider value={{basket, setBasket, addToBasket, removeFromBasket, clearBasket}}>
            {children}
        </Basket.Provider>
    )
}

export default BasketContext
export const useBasket = () => useContext(Basket)
