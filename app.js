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

        //sync remove button UI
        syncRemoveButtons();
    }

    function syncRemoveButtons(){
        //if only one attendee, hide the first remove button
        //otherwise, show all remove buttons
        if(getAttendeeCount()===1){
            $('.attendee-list .attendee .remove-attendee').first().hide();
        }else{
            $('.attendee-list .attendee .remove-attendee').show();
        }
    }
    
    function syncPurchaseButton(){
        //total up the count for the checkout button total
        $('#checkout-button span.amount').html(
            '$' + data.cost * getAttendeeCount()
        );
    }

    //events
    $('.add-attendee').on('click', function (event){
        event.preventDefault();
        addAttendee();
        $(this).trigger('attendee.add');
    }).on('attendee:add', function(){
        syncPurchaseButton();
        syncRemoveButtons();
    })

    //attach an even handler to the dynamic row remove button
    $('#app').on('click', 'attendee .remove-attendee', function (event){
        event.preventDefault();
        var $row = $(event.target).closest('.attendee.row');

        $row.remove();
        $('#app').trigger('attendee:remove');
    });

    $('#app').on('attendee:remove', function(){
        syncPurchaseButton();
        syncRemoveButtons();
    });

    //initialize the form

    //set up the unit cost of one ticket
    $('#unit-price').html('$' + data.cost + ' ea.');

    //add one attendee by default on init
    addAttendee();
    syncPurchaseButton();
});