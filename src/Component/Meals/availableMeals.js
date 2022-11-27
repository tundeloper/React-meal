import { useEffect, useState  } from 'react'
import classes from './availableMeals.module.css'
import Card from '../UI/Card'
import MealsITem from './MealsItem/mealsItem'
import Loading from '../UI/Loading'

// const DUMMY_MEALS = [
//     {id: 'm1',
//     name: 'sushi',
//     desciption: 'finest fish veggies',
//     price: 22.9
// },

// {id: 'm2',
//     name: 'Schnitzel',
//     desciption: 'A German speciality',
//     price: 16.5
// },

// {id: 'm3',
//     name: 'Barbecue burger',
//     desciption: 'American, raw, meaty',
//     price: 16.5
// },

// {id: 'm4',
//     name: 'Greem Bowl',
//     desciption: 'helathy... and green...',
//     price: 18.99
// },
// ]

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false )
    const [error, setError] = useState()

    useEffect(() => {
        setIsLoading(true)
       const fetchMeals = async () => {
       const respons =  await fetch('https://order-bb0f5-default-rtdb.firebaseio.com/meals.json')

       if(!respons.ok) {
        throw new Error('Something went wrong!')
       }

       const data = await respons.json()

       const loadedMeal = []

       for (const i in data) {
            loadedMeal.push({
                id: i,
                name: data[i].name,
                desciption: data[i].desciption,
                price: data[i].price,
            })
       }
       setMeals(loadedMeal)
       setIsLoading(false)
    }

    fetchMeals().catch((err) => {
        setIsLoading(false)
        setError(err.message)
    })

    }, [])

    const mealsList = meals.map(meals =>   <MealsITem key={meals.id} id={meals.id} name={meals.name} description={meals.desciption} price={meals.price}/>)

    if(error){
        return <section className={classes.mealsError}><h2>{error}</h2></section>
    }

    if(isLoading) {
        return <section className={classes.mealsLoading}>
            <Loading />
            </section>
    }

    return (
    <section className={classes.meals}>
        <Card>
      <ul>{mealsList}</ul>
      </Card>
    </section>
    )
}
export default AvailableMeals