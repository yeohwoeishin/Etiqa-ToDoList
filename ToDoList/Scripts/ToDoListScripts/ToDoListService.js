app.service('ToDoListService', function ($http) {


    //Create new ToDo task
    this.Save = function (List) {
        var request = $http({
            method: "post",
            url: "/api/ListsAPI",
            data: List
        });
        return request;
    }
    //Retrieve specific ToDo task based on list number (Primary key)
    this.Retrieve = function (ListNo) {
        return $http.get("/api/ListsAPI/" + ListNo);
    }

    //Retrieve all ToDo task
    this.RetrieveAll = function () {
        return $http.get("/api/ListsAPI");
    }


    //Update ToDo task
    this.Update = function (ListNo, List) {
        var request = $http({
            method: "put",
            url: "/api/ListsAPI/" + ListNo,
            data: List
        });
        return request;
    }
    //Delete task based on ListNo passed
    this.Delete = function (ListNo) {
        var request = $http({
            method: "delete",
            url: "/api/ListsAPI/" + ListNo
        });
        return request;
    }
});