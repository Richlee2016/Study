import Mvvm from "./mvvm";

let data = {
    a:1,
    b:{c:2,d:3},
    c:"nice"
}

const app = new Mvvm({
    el:'#root',
    data,
    methods:{
        test:function(){
            this.a++;
            this.go();
        },
        go:function(){
            console.log(2);
        }
    },
    watch:{
        a:function(n,o){
            console.log(n,o);
        }
    }
})

// app.$data.a= 6;

console.log(app);