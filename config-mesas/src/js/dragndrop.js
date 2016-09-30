	contador = 0; // Variable global para tener poder poner un id unico a cada elemento cuando se clona.
        
        function start(e) {
            e.dataTransfer.effecAllowed = 'move'; 
            e.dataTransfer.setData("Data", e.target.id); 
            console.log(document.getElementById(e.target.id).offsetHeight);
            e.dataTransfer.setDragImage(e.target, document.getElementById(e.target.id).offsetHeight,document.getElementById(e.target.id).offsetWidth); 
            e.target.style.opacity = "1";
        }

        function end(e){
            document.getElementById(draggedElement).style.opacity = "1";

            e.dataTransfer.clearData("Data");
        }

        function enter(e) {
            
        }

        function leave(e) {
            e.target.style.border = ''; 
        }

        function over(e) {
            var draggedElement = e.dataTransfer.getData("Data");

            var id = e.target.id;
            return false; 
        }

        function drop(e){

            var draggedElement = e.dataTransfer.getData("Data"); 
            document.getElementById(draggedElement).style.opacity = "1";
            e.target.style.border = '';

            console.log("Dragged: " + draggedElement);
            console.log("Target: " + e.target.id);

            tamContX = document.getElementById(e.target.id).offsetWidth; 
            tamContY = document.getElementById(e.target.id).offsetHeight;
            posXCont = document.getElementById(e.target.id).offsetLeft;
            posYCont = document.getElementById(e.target.id).offsetTop;

            tamElemX = document.getElementById(draggedElement).offsetWidth;
            tamElemY = document.getElementById(draggedElement).offsetHeight;

            x = e.layerX;
            y = e.layerY;
            if (posXCont + tamContX <= x + tamElemX){
                x = tamContX - tamElemX;
            }
            if (posYCont + tamContY <= y + tamElemY){
                y = tamContY - tamElemY;   
            }

            if(document.getElementById(draggedElement).parentNode.id!="table-container"){
                var clonedElement = document.getElementById(draggedElement).cloneNode(true); // Se clona el elemento
                
                clonedElement.id = "ClonedElement" + contador; // Se cambia el id porque tiene que ser unico
                
                console.log("Cloned: " + clonedElement.id);
                contador += 1;  
                clonedElement.style.position = "absolute";  // Se posiciona de forma "normal" (Sino habria que cambiar las coordenadas de la posición)  
                console.log(clonedElement.style.height);
                clonedElement.style.left = x-tamElemX + "px";
                clonedElement.style.top = y-tamElemY + "px";
                clonedElement.style.opacity = "1";
                e.target.appendChild(clonedElement);
            }
            else{
                document.getElementById(e.target.id).appendChild(document.getElementById(draggedElement));
                document.getElementById(draggedElement).style.position = "absolute";
                document.getElementById(draggedElement).style.left = x + "px";
                document.getElementById(draggedElement).style.top = y + "px";
            }

            
        }

      
        function eliminar(e){
            var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado
            elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
            e.target.style.border = '';   // Quita el borde
        }

        function clonar(e){

            alert(e.dataTransfer.getData("Data"));
            var draggedElement = e.dataTransfer.getData("Data"); // Elemento arrastrado
        // Dejamos la opacidad a su estado anterior para copiar el elemento igual que era antes

            tamContX = document.getElementById(e.target.id).offsetWidth;
            tamContY = document.getElementById(e.target.id).offsetHeight;
            posXCont = document.getElementById(e.target.id).offsetLeft;
            posYCont = document.getElementById(e.target.id).offsetTop;

            tamElemX = document.getElementById(draggedElement).offsetWidth;
            tamElemY = document.getElementById(draggedElement).offsetHeight;

            x = e.layerX;
            y = e.layerY;
            //alert(x + " " + y + " - " + tamContX + " " + tamContY + " - " + + tamElemX + " " + tamElemY + " - " + posXCont + " " + posYCont );
            if (posXCont + tamContX <= x + tamElemX){
                x = tamContX - tamElemX;
            }
            if (posYCont + tamContY <= y + tamElemY){
                y = tamContY - tamElemY;   
            }

            var clonedElement = document.getElementById(draggedElement).cloneNode(true); // Se clona el elemento
            clonedElement.id = "ElemClonado" + contador; // Se cambia el id porque tiene que ser unico
            contador += 1;  
            clonedElement.style.position = "absolute";  // Se posiciona de forma "normal" (Sino habria que cambiar las coordenadas de la posición)  
            clonedElement.style.left = x + "px";
            clonedElement.style.top = y + "px";
            clonedElement.style.opacity = "1";


            e.target.appendChild(clonedElement); // Se añade el elemento clonado
            e.target.style.border = '';   // Quita el borde del "cuadro clonador"
        }