$(document).ready(function (){

    var data = {
        cost: 9.99
    };

    /**Get the attendee count */

    function getAttendeeCount(){
        return $('.attendee-list .row.attendee').length;
    }

    function addAttendee(){
        $('.attendee-list').append(
            $('script[data-template="attendee"]').text()
        );
    }
    
    function syncPurchaseButton(){
        //total up the count for the checkout button total
        $('#checkout-button span.amount').html(
            '$' + data.cost * getAttendeeCount()
        );
    }

    //initialize the form

    //set up the unit cost of one ticket
    $('#unit-price').html('$' + data.cost + ' ea.');

    //add one attendee by default on init
    addAttendee();
    syncPurchaseButton();
});