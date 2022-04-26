import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cloudMusic:'',
        musicShow:true
    },
    mutations: {
        setCloudMusic(state,payload){
            state.cloudMusic=payload;
        },
        cloudMusicShow(state){
            state.musicShow=true;
        },
        cloudMusicHide(state){
            state.musicShow=false;
        }
    },
    actions: {},
    modules: {}
})
