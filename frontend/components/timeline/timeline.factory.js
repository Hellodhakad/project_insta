myApp.factory('timelineFact', function ($http) {
    return {
        getImage: function (cook) {
            var req = {
                url: 'http://localhost:8088/api/getImage',
                method: 'GET',
                headers: {
                    frontend: cook
                }
            };
            return $http(req)
        },
        getAllImage: function (cook) {
            var req = {
                url: 'http://localhost:8088/api/getAllImage',
                method: 'GET',
                headers: {
                    frontend: cook
                }
            };
            return $http(req)
        },
        saveComment: function (cook, data) {
            var req = {
                url: 'http://localhost:8088/api/comment',
                method: 'POST',
                data: data,
                headers: {
                    frontend: cook
                }
            };
            return $http(req)
        }
    }
})