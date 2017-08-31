myApp.controller('homeCtrl', function ($scope,$cookies, $uibModal, $location) {
    console.log('inside home')
    $scope.openSignup = function () {
        $uibModal.open({
            templateUrl: 'components/common/signup.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, homeFact, $uibModalInstance) {
                console.log('inside siginin');
                $scope.data = {};
                $scope.doSignUp = function () {
                    console.log($scope.data);
                    homeFact.doSignUp($scope.data).then(function (success) {
                        if (success.data.error) {
                            alert('Alraedy registerwes');
                        } else {
                            $scope.cancel();
                            $cookies.put('frontend', success.data.data._id);                            
                            $location.url('/timeline');
                        }
                    }, function (err) {
                        console.log(err)
                    })
                }
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });//end of modal.open
    }
    $scope.openSignin = function () {
        $uibModal.open({
            templateUrl: 'components/common/signin.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, homeFact, $uibModalInstance) {
                console.log('inside siginin');
                $scope.data = {};
                $scope.doSignIn = function () {
                    console.log($scope.data);
                    homeFact.doSignIn($scope.data).then(function (success) {
                        if (success.data.error) {
                            alert('Invalid User');
                        } else {
                            $scope.cancel();
                            $cookies.put('frontend', success.data.data._id);
                            $location.url('/timeline');
                        }
                    }, function (err) {
                        console.log(err)
                    })
                }
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });//end of modal.open
    }
})