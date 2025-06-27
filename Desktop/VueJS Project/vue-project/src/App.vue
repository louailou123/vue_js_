

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { computed,ref,onBeforeMount } from 'vue'
import NNavbar from '@/components/navbar.vue'
import { RouterView } from 'vue-router'
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
    <div style="display: flex; flex-direction: column;height: 100vb;width: 100vb;">
<routerView />
</div>
</template>

