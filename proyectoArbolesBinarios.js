//Luis Eduardo Nava Covarrubias 3H
class Nodo{                     //Clase nodo que almacena un valor ya sea número o operador, así como su hijo izq y der
    constructor(valor){
        this.valor=valor;
        this.hIzq=null;
        this.hDer=null;
    }
}

class Analizador{               //Clase que realiza el arbol binario y los recorridos pre y post order

    constructor(funcion){
        this.raiz=null;                                         //Raíz del árbol
        this.funcion=funcion;                                   //Operación a realizar
        this.elementosFuncion=new Array()                       //elementosLista donde se guardará cada elemento
        for (let i = 0; i < funcion.length; i++) {              //Ciclo que guarda los elementos en el elementosLista
            this.elementosFuncion.push(new Nodo(funcion[i]))     
        }
        this.listaPreOrder="";      //Lista de los elementos del arbol en preOrder
        this.listaPostOrder="";     //Lista de los elementos del arbol en postOrder
}

    crearArbol(){
    let aux = this.elementosFuncion[0]                      //Variable de apoyo donde se guarda la primer posicion del elementosLista
    let contador=0;
    while(contador<this.elementosFuncion.length){           //Ciclo para el acomodo de los elementos de "*" y "/"
        if(aux!=null&&(aux.valor=="*"||aux.valor=="/")){
            aux.hIzq=this.elementosFuncion[contador-1]
            aux.hDer=this.elementosFuncion[contador+1]
            this.elementosFuncion.splice(contador+1,1)
            this.elementosFuncion.splice(contador-1,1)
        }
        contador++
        aux=this.elementosFuncion[contador]
    }
    aux=this.elementosFuncion[0]
    contador=0;
    while(contador<this.elementosFuncion.length){           //Ciclo para el acomodo de los elementos de "*" y "-"
        if(aux.valor=="+"||aux.valor=="-"){
            aux.hIzq=this.elementosFuncion[contador-1]
            aux.hDer=this.elementosFuncion[contador+1]
            this.elementosFuncion.splice(contador+1,1)
            this.elementosFuncion.splice(contador-1,1)
            contador--
        }
        contador++
        aux=this.elementosFuncion[contador]
    }
        this.raiz=this.elementosFuncion[0]
    }

    preOrder(){
        this.listaPreOrder= ""
        if(this.raiz==null){
            console.log("");
        }else{
            this.preOrderRecur(this.raiz)
        }
        return this.listaPreOrder
    }
    preOrderRecur(nodoX){
        this.listaPreOrder+=`${nodoX.valor}`
        if(nodoX.hIzq!=null){
            this.preOrderRecur(nodoX.hIzq);
        }
        if(nodoX.hDer!=null){
            this.preOrderRecur(nodoX.hDer);
        }
    }
    postOrder(){
        this.listaPostOrder= ""
        if(this.raiz==null){
            console.log("");
        }else{
            this.postOrderRecur(this.raiz)
        }
        return this.listaPostOrder
    }
    postOrderRecur(nodoX){
        if(nodoX.hIzq!=null){
            this.postOrderRecur(nodoX.hIzq);
        }
        if(nodoX.hDer!=null){
            this.postOrderRecur(nodoX.hDer);
        }
        this.listaPostOrder+=`${nodoX.valor}`
    }


}


let analizador= (lista)=>{          //Función que realiza la operación
    let elementosLista= Array.from(lista)   // Creamos un vector de los elementos de la lista recibida
    let pila = [];                          // Creamos la pila donde se guardarán los elementos en el orden que se extraen

    //Verificamos si es una lista preOrder o post order (pre order siempre inician con un operador, post order con un número)
    if(elementosLista[0]=="+"||elementosLista[0]=="-"||elementosLista[0]=="*"||elementosLista[0]=="/"){
        while(elementosLista.length != 0) {
            let aux = elementosLista.pop();      //Variable auxiliar para la extraccion de los elementos de la pila
            if(aux!="*" && aux!="/" && aux!="+" && aux!="-"){     
                pila.push(parseInt(aux));       //Agregamos el nodo a la pila mientras no sea operador
            }else{
                let operacion = [pila.pop(),pila.pop()];    //Al encontrar un operador creamos la variable operacion con los dos valores que serán procesados
                switch(aux){        //Hacemos el switch el cual dependiendo el operador se realizará la operacion correspondiente
                    case "*":
                        pila.push(operacion[0]*operacion[1]);
                        break;
                    case "/":
                        pila.push(operacion[0]/operacion[1]);
                        break;
                    case "+":
                        pila.push(operacion[0]+operacion[1]);
                        break;
                    case "-":
                        pila.push(operacion[0]-operacion[1]);
                        break;
                }
            }
        }
    }else{
        while(elementosLista.length != 0) {
            let aux = elementosLista.shift();       //Al ser una FIFO se usa .shift y no .pop para extraer el primero
            if(aux!="*" && aux!="/" && aux!="+" && aux!="-"){
                pila.push(parseInt(aux));
            }else{
                let operacion = [pila.pop(),pila.pop()];
                switch(aux){                     //Al ser postOrder, se invierten el lugar de los numeros para la operacion [1,0] en vez de [0,1]
                    case "*":
                        pila.push(operacion[1]*operacion[0]);
                        break;
                    case "/":
                        pila.push(operacion[1]/operacion[0]);
                        break;                       
                    case "+":
                        pila.push(operacion[1]+operacion[0]);
                        break;
                    case "-":
                        pila.push(operacion[1]-operacion[0]);
                        break;
                }
            }
        }
    }
    return pila;     //Regresamos toda la pila ya que solo contiene un valor que será el resultado final
}

let funcion1 =new Analizador('2*1+5-1/2+1');    //Aquí ingresamos la operación que queremos realizar y listo
funcion1.crearArbol();
console.log("--- Operación: "+funcion1.funcion)
console.log("--- Lista preOrder: "+funcion1.preOrder());
console.log("--- Lista postOrder: "+funcion1.postOrder());
console.log("--- Resultado con preOrder(LIFO): " + analizador(funcion1.preOrder()))
console.log("--- Resultado con postOrder(FIFO): " + analizador(funcion1.postOrder()))



