/**
 * Created by evan on 2017/4/29.
 */
var MyMockHTTPRequest = function(){

    // practice list
    var parcticeList = [
        {

        }
    ];


};


var URLRouter = function(){
  this.currentUrl = window.location.href;
  this.currentPath = window.location.pathname;
  
  
  // relative
    var relativePath = function(currentPath, newPath){
      var currentSteps = currentPath.split('/');
      var pathSteps = newPath.split('/');
      
      while(pathSteps.length> 0){
        var step = pathSteps.shift();
        if(step === '..'){
          // go up
          if(currentSteps.length<=1){
            // check 
            throw 'no more up path';
          }
          
          currentSteps.pop();
          
        }else if(step === '.'){
          // stay
          
        }else{
          // go down 
          currentSteps.push(step);
        }
      
      };
      
      var finalPath = currentSteps.join('/');
      return finalPath;
    };
  
        // absolute
    var absolutePath = function(path){
      return path;
    };
  
  this.goPath = function(path){
    
    if(path.startsWith('/')){
      location.pathname = absolutePath(path);
    }else{
      location.pathname = relativePath(path);
    }
   
  };
};