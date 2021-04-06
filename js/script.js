// var myData = [
//     02 {
//         03
//         id: 0,
//             04
//         title: 'Item 1 '
//         05
//     }, {
//         06
//         id: 1,
//         07
//         title: 'Item 2',
//         08
//         subs: [
//             09 {
//                 10
//                 id: 10,
//                     11
//                 title: 'Item 2-1'
//                 12
//             }, {
//                 13
//                 id: 11,
//                 14
//                 title: 'Item 2-2'
//                 15
//             }, {
//                 16
//                 id: 12,
//                 17
//                 title: 'Item 2-3'
//                 18
//             }
//             19
//         ]
//         20
//     }, {
//         21
//         id: 2,
//         22
//         title: 'Item 3'
//         23
//     },
//     24
//     // more data here
//     25
// ];


// $('#example').comboTree({
//     2
//     source: myData
//     3
// });

// jquery datepicker init
$(function() {
    var dateFormat = "mm/dd/yy",
        from = $("#from")
        .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
        })
        .on("change", function() {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
        })
        .on("change", function() {
            from.datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});
// jquery datepicker init