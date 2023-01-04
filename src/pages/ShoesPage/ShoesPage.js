import { useState, useEffect } from 'react'

export default function ShoesPage (props){
    const [shoes, setShoes] = useState([])
    const [foundShoe, setFoundShoe] = useState(null)
    const [newShoe, setNewShoe] = useState({
        name: '',
        color: '',
        rare: false
    })
    const getShoes = async () => {
        try {
            const response = await fetch('/api/shoes')
            const data = await response.json()
            setShoes(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteShoe = async (id) => {
        try {
            const response = await fetch(`/api/shoes/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundShoe(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateShoe = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/shoes/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedData})
            })
            const data = await response.json()
            setFoundShoe(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createShoe = async () => {
            try {
                const response = await fetch(`/api/shoes`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newShoe})
                })
                const data = await response.json()
                setFoundShoe(data)
                setNewShoe({
                    name: '',
                    color: '',
                    rare: false
                })
            } catch (error) {
                console.error(error)
            }
        }

    const handleChange = (evt) => {
        setNewShoe({...newShoe, [evt.target.name]: evt.target.value})
    }

    useEffect(()=> {
        getShoes()
    }, [foundShoe])

    return (
        <>
            {
                shoes && shoes.length ? (<ul>
                    {
                        shoes.map((shoe) => {
                            return (
                                <li>
                                    {shoe.name} are {shoe.color} they are {shoe.rare? 'worth a lot of $$$' : 'they are worth dirt'}
                                    <br/><button onClick={() => deleteShoe(shoe._id)}>Delete This Shoe</button>
                                </li>
                            )
                        })
                    }
                </ul>): <h1>No Shoes Yet Add One Below</h1>
            }
            {'Name '}<input value={newShoe.name} onChange={handleChange} name="name"></input><br/>
            {'Color '}<input value={newShoe.color} onChange={handleChange} name="color"></input><br/>
            {'Rare '}<input type="checkbox" checked={newShoe.rare} onChange={(evt) => setNewShoe({...newShoe, rare: evt.target.checked })}></input><br/>
            <button onClick={() => createShoe() }>Create A New Shoe</button>
            {
                foundShoe? <div>
                    <h1>{foundShoe.name}</h1>
                    <h2>{foundShoe.color}</h2>
                    <h3>{foundShoe.rare? 'I am Super rare': 'I am not super rare'}</h3>
                </div>: <>No Shoe in Found Shoe State</>
            }
        </>
    )
}
