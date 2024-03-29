var app = angular.module('selfiecode', [
  'ngAnimate', 
  'ui.bootstrap',
  'ngRoute',
  'admin',
  'dev',
  'proj',
  'atr',
  'devInfo',
  'modal',
  'devGraph'
//  'ui.mask'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/page-dev', {
        templateUrl: 'cadastro-desenvolvedor.html',
        controller: 'devCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
            	
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	authenticationSvc.verifySession(2);
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
      }).
      when('/page-project', {
          templateUrl: 'cadastro-projeto.html',
          controller: 'adminCtrl',
          resolve: {
              auth: function ($q, authenticationSvc) {
            	  
                  var userInfo = authenticationSvc.getUserInfo();
                  
                  if (userInfo) {
                	  authenticationSvc.verifySession(2);
                      return $q.when(userInfo);
                  } else {
                      return $q.reject({ authenticated: false });
                  }
              }
          }
        }).
        when('/atribuir', {
            templateUrl: 'atribuir-dev-proj.html',
            controller: 'atbCtrl',
            resolve: {
                auth: function ($q, authenticationSvc) {
                	
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                    	authenticationSvc.verifySession(2);
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }
            }
		  }).
		  when('/listar-proj', {
		  templateUrl: 'list-projeto.html',
		  controller: 'adminCtrl',
		  resolve: {
		      auth: function ($q, authenticationSvc) {
		    	 
		          var userInfo = authenticationSvc.getUserInfo();
		          if (userInfo) {
		        	  authenticationSvc.verifySession(2);
		              return $q.when(userInfo);
		          } else {
		              return $q.reject({ authenticated: false });
		          }
			    }
			  }
		  }).
		  when('/excluir-dev', {
			  templateUrl: 'excluir-dev.html',
			  controller: 'adminCtrl',
			  resolve: {
			      auth: function ($q, authenticationSvc) {
			    	  
			          var userInfo = authenticationSvc.getUserInfo();
			          if (userInfo) {
			        	  authenticationSvc.verifySession(2);
			              return $q.when(userInfo);
			          } else {
			              return $q.reject({ authenticated: false });
			          }
			      }
			  }
	         }).
	         when('/index', {
	            templateUrl: 'index.html',
	            controller: 'adminCtrl',
	            resolve: {
	            	
	                auth: function ($q, authenticationSvc) {
	                	
	                    var userInfo = authenticationSvc.getUserInfo();
	                    if (userInfo) {
	                    	authenticationSvc.verifySession();
	                        return $q.when(userInfo);
	                    } else {
	                        return $q.reject({ authenticated: false });
	                    }
	                }
	            }
	          }).
	          when('/listar-dev', {
	        	 
	              templateUrl: 'list-dev.html',
	              controller: 'devCtrl',
	              resolve: {
	                  auth: function ($q, authenticationSvc) {
	                	  
	                      var userInfo = authenticationSvc.getUserInfo();
	                      if (userInfo) {
	                    	  authenticationSvc.verifySession(2);
	                          return $q.when(userInfo);
	                      } else {
	                          return $q.reject({ authenticated: false });
	                      }
	                  }
	              }
	            }).
	            when('/edit-proj/:proj', {
	                templateUrl: 'edit-projeto.html',
	                controller:  'projCtrl',
	                resolve: {
	                    auth: function ($q, authenticationSvc) {
	                    	
	                        var userInfo = authenticationSvc.getUserInfo();
	                        if (userInfo) {
	                        	authenticationSvc.verifySession(2);
	                            return $q.when(userInfo);
	                        } else {
	                            return $q.reject({ authenticated: false });
	                        }
	                    }
	                }
	              }).
		          when('/edit-dev/:cpf', {
		                templateUrl: 'edit-desenvolvedor.html',
		                controller:  'devCtrl',
		                resolve: {
		                    auth: function ($q, authenticationSvc) {
		                    	
		                        var userInfo = authenticationSvc.getUserInfo();
		                        if (userInfo) {
		                        	 authenticationSvc.verifySession(2);
		                            return $q.when(userInfo);
		                        } else {
		                            return $q.reject({ authenticated: false });
		                        }
		                    }
		                }
		              }).        
		              when('/dev-info/:cpf', {
		                  templateUrl: 'dev-projeto-info.html',
		                  controller: 'devInfoCtrl',
		                  resolve: {
		                      auth: function ($q, authenticationSvc) {
		                    	  
		                          var userInfo = authenticationSvc.getUserInfo();
		                          if (userInfo) {
		                        	  authenticationSvc.verifySession(2);
		                              return $q.when(userInfo);
		                          } else {
		                              return $q.reject({ authenticated: false });
		                          }
		                      }
		                  }
		      		  }).
		              when('/dev-graph/:cpf/:proj', {
		                  templateUrl: 'dev-projeto-graph.html',
		                  controller: 'devGraphCtrl',
		                  resolve: {
		                      auth: function ($q, authenticationSvc) {
		                    	 
		                          var userInfo = authenticationSvc.getUserInfo();
		                          if (userInfo) {
		                        	  authenticationSvc.verifySession(2);
		                              return $q.when(userInfo);
		                          } else {
		                              return $q.reject({ authenticated: false });
		                          }
		                      }
		                  }
		      		  }).
		      otherwise({
		    	  templateUrl: 'admin-default.html',
		    	  controller: 'adminCtrl',
		          resolve: {
		              auth: function ($q, authenticationSvc) {
		            	  
		                  var userInfo = authenticationSvc.getUserInfo();
		                  
		                  if (userInfo) {
		                	  authenticationSvc.verifySession(2);
		                      return $q.when(userInfo);
		                  } else {
		                      return $q.reject({ authenticated: false });
		                  }
		              }
		          }
		      });
  }]);
  
  app.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
        	window.location.assign("index.html");
        }
    });
}]);

app.factory("authenticationSvc", ["$http","$q","$window",function ($http, $q, $window) {
    var userInfo = [];
    console.log($q);
    function login(userName, password) {
        var deferred = $q.defer();
        $http.post('http://localhost/WebService/selfieCode/service/login?user='+userName+'&pass='+password).
            then(function (result) {
                userInfo = {
                    accessToken: result.data.result,
                    userName: result.data.username,
                    type: result.data.tipo
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
                if(userInfo.type <= 2)
                {
                	$window.location.assign("http://localhost/WebService/pages/admin.html");
                }
                else
                {
                	$window.location.assign("http://localhost/WebService/pages/flot.html");
                }
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
    
    function verifySession(tipoPage) {
        var deferred = $q.defer();
       
        $http({
            method: "POST",
            url: 'http://localhost/WebService/selfieCode/service/verifySession', 
            headers: {
                "key": userInfo.accessToken
            }
        	}).
            then(function (result) {

            	if(result.data.result == 'expired')
        		{
	                logout();
        		}
            	if(tipoPage < userInfo.type)
            	{
            		$window.location.assign("http://localhost/WebService/pages/flot.html");
            	}
                
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
    
    function logout() {
        var deferred = $q.defer();

        $http({
            method: "POST",
            url: "http://localhost/WebService/selfieCode/service/logout",
            headers: {
                "key": userInfo.accessToken
            }
        }).then(function (result) {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            deferred.resolve(result);
            $window.location.assign("index.html")
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo,
        verifySession: verifySession,
    };
}]);

app.factory("managerSrvc", ["$http","$window",function ($http, $window) {
   
   
    function list(key, callback) {
       
    	 $http({
             method: "POST",
             url: 'http://localhost/WebService/selfieCode/service/listarDev',
             headers: {
                 "key": key
             }
    	 	}).
            then(function (result) {
            	console.log("function" + result.data);
            	var devs = result.data.devs;
            	
            	for(var i = 0; i < devs.length; i++)
        		{
            		devs[i].dataNascimento = new Date(devs[i].dataNascimento);
            		
            		devs[i].dataNascimento.setDate(devs[i].dataNascimento.getDate()+1);
            		devs[i].dataNascimento = devs[i].dataNascimento.toLocaleDateString();
            		
            		devs[i].dataCadastro = new Date(devs[i].dataCadastro);
            		
            		devs[i].dataCadastro.setDate(devs[i].dataCadastro.getDate()+1);
            		devs[i].dataCadastro = devs[i].dataCadastro.toLocaleDateString();
        		}
            	
            	callback(result.data);
            }, function (error) {
                
            });
    }

    return {
    	list: list
    };
}]);

app.factory("projectSvc", ["$http","$window", "authenticationSvc", function ($http, $window, authenticationSvc ) {
    	   
    	//var projetos = listKey(authenticationSvc.getUserInfo().accessToken);   
    	    	
    	function getProjetos()
    	{   	
    		return  $http({
                method: "POST",
                url: 'http://localhost/WebService/selfieCode/service/listarProj',
                headers: {
                    "key": authenticationSvc.getUserInfo().accessToken
                }
       	 	}).
               then(function (result) {
               	projetos = result.data;
               	return result.data;
               }, function (error) {
                   
               });
    		
    	}
    	
        function list(key, callback) {
           
        	 $http({
                 method: "POST",
                 url: 'http://localhost/WebService/selfieCode/service/listarProj',
                 headers: {
                     "key": key
                 }
        	 	}).
                then(function (result) {
                	projetos = result.data;
                	callback(result.data);
                }, function (error) {
                    
                });
        }
        
        function listCpf(cpf, key, callback) {
            
       	 $http({
                method: "POST",
                url: 'http://localhost/WebService/selfieCode/service/listarProjCpf',
                headers: {
                	"cpf": cpf,
                    "key": key
                }
       	 	}).
               then(function (result) {
               	projetos = result.data;
               	callback(result.data);
               }, function (error) {
                   
               });
       }      
        return {
        	list: list,
        	listCpf: listCpf,
        	projetos: getProjetos
        };
}]);

