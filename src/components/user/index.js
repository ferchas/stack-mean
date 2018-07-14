import './style.css';
import view from './view.html';

const userController = ($scope, $http) => {
  $scope.rowCollection = [];
  
  // Get user List
  const usterList = () => {
    $scope.isLoading = true;
    $http.get('/api/users')
    .then((response) => {
      $scope.rowCollection = response.data;
    })
    .catch((error) => {
      console.log(error);
    }).then(() => {
      $scope.isLoading = false;
    });
  };

  // delete user by ID
  $scope.removeUser = (row) => {
    $http.delete(`/api/delete-user/${row.id }`)
      .then((response) => {
        const index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Search by ID
  $scope.searchUser = () => {
    console.log($scope.search);
  };

  //add new user
  $scope.addUser = () => {
    $http.post('/api/add-user')
      .then((response) => {
        $scope.rowCollection.push(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // refresh user list
  $scope.refreshUser = () => {
    usterList();
  };
  
  // start component
  usterList();
};

const user = {
  template: view,
  controller: userController,
};

export default user;
