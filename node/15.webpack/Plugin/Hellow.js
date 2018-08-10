class HellowPlugin{
    constructor(options){
        console.log(options);
        this.options = options;
    }
    apply(compiler){
        
    }
}

module.exports = HellowPlugin;