app.service('MessageService', ['toaster', function (toaster) {

    this.addError = function (message) {
        return toaster.pop("error", message);
    };

    this.addInfo = function(message){
        return toaster.pop("info", message);
    };

    this.addSuccess = function(message){
        return toaster.pop("success", message);
    };

    //this.addConfirm = function(message,btnTextConfirm,btnTextCancel){
    //    ngDialog.open({
    //        preCloseCallback: function(value) {
    //            var nestedConfirmDialog = ngDialog.openConfirm({
    //                template:'\
    //            <p>message</p>\
    //            <div class="ngdialog-buttons">\
    //                <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">btnTextCancel</button>\
    //                <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">btnTextConfirm</button>\
    //            </div>',
    //                plain: true
    //            });
    //
    //            return nestedConfirmDialog;
    //        }
    //    });
    //}

}]);