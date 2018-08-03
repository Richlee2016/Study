
//接口扩展：接口可以继承接口   


    // interface Animal{

    //     eat():void;
    // }

    // interface Person extends Animal{

    //     work():void;
    // }

    // class Web implements Person{

    //     public name:string;
    //     constructor(name:string){
    //         this.name=name;
    //     }

    //     eat(){

    //         console.log(this.name+'喜欢吃馒头')
    //     }
    //     work(){

    //         console.log(this.name+'写代码');
    //     }
        
    // }

    // var w=new Web('小李');

    // w.eat();











    
    interface Animal{

        eat():void;
    }

    interface Person extends Animal{

        work():void;
    }


    class Programmer{

        public name:string;
        constructor(name:string){
            this.name=name;
        }
        
        coding(code:string){

            console.log(this.name+code)
        }
    }


    class Web extends Programmer implements Person{
        
        constructor(name:string){
           super(name)
        }
        eat(){

            console.log(this.name+'喜欢吃馒头')
        }
        work(){

            console.log(this.name+'写代码');
        }
        
    }

    var w=new Web('小李');

    // w.eat();

    w.coding('写ts代码');