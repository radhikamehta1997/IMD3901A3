AFRAME.registerComponent("logic", {
    schema:{},
    init:function(){

        var parentEL = this.el;
        let visibleRandom = Math.floor((Math.random() * 6) +1);

        let children = Array.from(parentEL.children);
        children.forEach((el, index) =>{
           
           if (visibleRandom == 1){
            

           }

        })


        
    }




})