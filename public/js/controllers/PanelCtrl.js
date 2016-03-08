angular.module('PanelCtrl', []).controller('PanelController', function(){
    this.tab = 1;

    this.selectTab = function(setTab){
        this.tab = setTab;
    };

    this.isSelected = function(checkedTab){
        return this.tab === checkedTab;
    };
});