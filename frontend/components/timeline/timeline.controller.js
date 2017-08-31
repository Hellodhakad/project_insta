myApp.controller('timelineCtrl', function ($scope, $cookies, Upload, $location, timelineFact) {
    timelineFact.getImage($cookies.get('frontend')).then(function (res) {
        $scope.allImage = res.data.data;
        console.log(res)
    }, function (err) {
        console.log(err)
    })
    $scope.toggleComment = function (index) {
        console.log(index)
        // $scope[show + index] = $scope.index === true ? false : true;
    }
    $scope.submit = function () {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };
    $scope.upload = function (file) {
        console.log('img upoj')
        Upload.upload({
            url: 'http://localhost:8088/api/upload',
            data: { file: file },
            headers: {
                frontend: $cookies.get('frontend')
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            timelineFact.getImage($cookies.get('frontend')).then(function (res) {
                $scope.allImage = res.data.data;
            }, function (err) {
                console.log(err)
            })
        }, function (resp) {
            $location.url('/');
            console.log('Error status: ' + resp.status);
        })
    };
})

myApp.controller('allTimelineCtrl', function ($scope, timelineFact, $cookies) {
    $scope.allImage = [];
    console.log('dsfsdf')
    timelineFact.getAllImage($cookies.get('frontend')).then(function (res) {
        $scope.allImage = res.data.data;
    }, function (err) {
        console.log(err);
    })

    $scope.saveComment = function (imgId, username, commentData) {
        var data = {
            comment_data: commentData,
            user_id: $cookies.get('frontend'),
            username: username,
            image_id: imgId
        }
        console.log(data)
        timelineFact.saveComment($cookies.get('frontend'), data).then((res) => {
            console.log(res);
            timelineFact.getAllImage($cookies.get('frontend')).then(function (res) {
                $scope.allImage = res.data.data;
            }, function (err) {
                console.log(err);
            })
        }, (err) => {
            console.log(err);
        })
    }
})