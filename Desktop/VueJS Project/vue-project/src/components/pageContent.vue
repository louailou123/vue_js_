  

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { computed,ref,onBeforeMount } from 'vue'
const status = false
const pizzas = ref(['margaretta', 'thon', 'viande ache', 'trois froumage', 'quatres saisons'])
const quantites = ref([5, 7, 7, 2, 0])

const narutoFacts =ref('')
const newPizza = ref('')
const newQauntite = ref('')
const pizzaName= ref('')
const pizzaStatus = ref(false)
const quantiteStatus = ref(false)
const deletePizzaStatus =ref(false)
const our_function = () => pizzas.value.length > 0
const addPizza = () => {
  pizzaStatus.value = false
  quantiteStatus.value = false

  if (newPizza.value.length === 0) {
    pizzaStatus.value = true
  }

  if (newQauntite.value.length === 0) {
    quantiteStatus.value = true
  }

  if (!pizzaStatus.value && !quantiteStatus.value) {
    pizzas.value.push(newPizza.value)
    quantites.value.push(Number(newQauntite.value))
    newPizza.value = ''
    newQauntite.value = ''
  }

}
const countPizzaName =computed(()=>{
    return (pizzaName.value.length || 1)
})
const deletePizza = () => {
    deletePizzaStatus.value=false
    if(pizzaName.value.length ==0)
    deletePizzaStatus.value=true
if(!deletePizzaStatus.value)
{
pizzas.value = pizzas.value.filter((pizza)=>{return (pizza != pizzaName.value)})
pizzaName.value=''
}

}
onBeforeMount(async ()=>{
    try{
        const response =await fetch("https://api.jsongpt.com/json?prompt=Generate 5 Naruto trivia facts &trivia=array of trivia facts")
        const data = await response.json()
        narutoFacts.value=data.trivia

    } 
    catch(err)
    {
   console.log(err)
    }
})
</script>
<template>
    <p v-if='status'> {{ `iam showing my status ${status}` }}</p>
    <table v-if="our_function()" class="table table-bordered">
        <thead>
        <tr>
        <th v-for="pizza in pizzas">{{ pizza }}</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="quantite in quantites">{{ quantite }}</td>
            </tr>
        </tbody>
    </table>
<form @submit.prevent="addPizza()">
    <p v-if="pizzaStatus">you should add the name of your pizza</p>
    <label for="newPizza">add new name for your pizza</label>
    <input type="text" name="newPizza" v-model="newPizza">
    <p v-if="quantiteStatus">you should add the number of your pizzas</p>
    <label for="newQantitue">add the number of pizzas you have</label>
    <input type="text" name="newQauntite" v-model="newQauntite">
    <button type="submit">submit</button>
</form>
<br>
<form @submit.prevent="deletePizza()">
<label for="pizzaName">deletePizza</label>
<p v-if="deletePizzaStatus">please enter the name of the pizza you want to delete</p>
<input type="text" name="pizzaName" v-model="pizzaName">
<button type="submit">delete</button>
</form>
<p>{{ countPizzaName }}</p>
<ul>
    <li v-if="index<3" v-for="(narutoFact,index) in narutoFacts">{{ narutoFact }}</li>
</ul>
</template>
  