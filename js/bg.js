var bg = {r : 40, g : 20, b : 100};

function transitionBG(newR, newG, newB) {
  var idR = setInterval(function(){
     if(bg.r > newR) {
       bg.r--;
     } else if(bg.r < newR) {
       bg.r++;
     } else {
       clearInterval(idR);
     }
   }, 10);

   var idG = setInterval(function(){
      if(bg.g > newG) {
        bg.g--;
      } else if(bg.g < newG) {
        bg.g++;
      } else {
        clearInterval(idG);
      }
    }, 10);

    var idB = setInterval(function(){
       if(bg.b > newB) {
         bg.b--;
       } else if(bg.b < newB) {
         bg.b++;
       } else {
         clearInterval(idB);
       }
     }, 10);

}
