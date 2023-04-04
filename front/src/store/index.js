import { createStore } from 'vuex'
import { catModule } from './category'
export default createStore({  
  modules: {
    cats: catModule
  }
})
