/**
 * Created by dalia on 17/05/16.
 */

'use strict';

describe('controller:footerCtrl:feedbackCtrl', function(){
    beforeEach(module('shoppingCart'));

    var modalInstance, ctrl, scope;

    beforeEach(inject(function($controller,$rootScope){
        scope = $rootScope.$new();

        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        ctrl = $controller('feedbackCtrl', {
            $scope: scope,
            $uibModalInstance: modalInstance
        });
    }));
    it('should instanciate modal controller', function(){
        expect(ctrl).not.toBeUndefined();
    });
    it('should close the modal window with result "a" when pressed OK', function(){
        scope.feedback = {'name': 'D', 'email': 'B', 'details': 'S'};
        scope.ok();
        expect(modalInstance.close).toHaveBeenCalledWith(scope.feedback);
    });
    it('should dismiss the modal window when pressed Cancel', function(){
        scope.cancel();
        expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });
});
