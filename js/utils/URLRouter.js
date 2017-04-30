define([], function(){
  
    // relative
    var relativePath = function(currentPath, newPath){
      var currentFolder = currentPath.substring(0, currentPath.lastIndexOf('/'));
      var currentSteps = currentFolder.split('/');
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
    var absolutePath = function(currentPath, path){
      return path;
    };
  
    var URLRouter = function(){
        this.currentUrl = window.location.href;
        this.currentPath = window.location.pathname;
        
        this.goPath = function(path){
          
          if(path.startsWith('/')){
            location.pathname = absolutePath(this.currentPath, path);
          }else{
            location.pathname = relativePath(this.currentPath, path);
          }
         
        };
    };
    
    return URLRouter;
});