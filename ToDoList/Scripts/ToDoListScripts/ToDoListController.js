app.controller('ToDoListController', function ($scope, ToDoListService) {

    $scope.IsNewRecord = 1;

    RetrieveAll();

    function RetrieveAll() {
        var promiseRetrieveAll = ToDoListService.RetrieveAll();

        promiseRetrieveAll.then(function (listData) { $scope.Lists = listData.data },
            function (listError) {
                $log.error('[RetrieveAll] Error occured: ', listError);
                $scope.error = "[RetrieveAll] Error occured: ", listError;
            });
    }

    $scope.save = function () {
        var List = {
            ListNo: $scope.ListNo,
            ListName: $scope.ListName,
            ListDesc: $scope.ListDesc,
            ListDate: $scope.ListDate,
            ListUser: $scope.ListUser
        };

        if ($scope.IsNewRecord === 1) {
            var promiseSave = ToDoListService.Save(List);
            promiseSave.then(function (listData) {
                $scope.ListNo = listData.data.ListNo;
                $scope.Message = "Saved Successfuly";
                //Retrieve all the list after saving to update the list
                RetrieveAll();
                $scope.clear();
            }, function (err) {
                console.log("[Save] Error occured: " + err);
                $scope.error = "[Save] Error occured: " + err;

            });
        } else { //Else Edit the record
            var promiseUpdate = ToDoListService.Update($scope.ListNo, List);
            promiseUpdate.then(function (listData) {
                $scope.Message = "Updated Successfuly";
                //Retrieve all the list after saving to update the list
                RetrieveAll();
                $scope.clear();
            }, function (err) {
                console.log("[Update] Error occured: " + err);
                $scope.error = "[Update] Error occured: " + err;
            });
        }
    };

    //Method to Delete
    $scope.delete = function (ListNo) {
        var promiseDelete = ToDoListService.Delete(ListNo);
        promiseDelete.then(function (listData) {
            $scope.Message = "Deleted Successfuly";
            //$scope.EmpNo = 0;
            //$scope.EmpName = "";
            //$scope.Salary = 0;
            //$scope.DeptName = "";
            //$scope.Designation = "";
            $scope.clear();
            RetrieveAll();
        }, function (err) {
            console.log("[Delete] Error occured: " + err);
            $scope.error = "[Delete] Error occured: " + err;
        });
    }

    $scope.retrieveByListNo = function (ListNo) {
        var promiseRetrieve = ToDoListService.Retrieve(ListNo);

        promiseRetrieve.then(function (listData) {
            var res = listData.data;
            $scope.ListNo = res.ListNo;
            $scope.ListName = res.ListName;
            $scope.ListDesc = res.ListDesc;
            $scope.ListDate = new Date(res.ListDate);
            $scope.ListUser = res.ListUser;

            $scope.IsNewRecord = 0;
        }, function (listError) {
            console.log("[Retrieve] Error occured: ", listError);
            $scope.error = "[Retrieve] Error occured: " + listError;
        });
    }
    //Clear the Scope models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.ListNo = 0;
        $scope.ListName = "";
        $scope.ListDesc = "";
        $scope.ListDate = "";
        $scope.ListUser = "";
    }
});