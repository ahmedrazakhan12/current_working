"use strict";

let timer; // Variable to store the setTimeout reference

// Event listener for changes in the time tracker message input
$("#time_tracker_message").on('change keyup paste', function () {
    localStorage.setItem("msg", $(this).val());
});

// Function to open the timer section
function open_timer_section() {
    if (is_timer_stopped) {
        $("#pause").attr("disabled", true);
        $("#end").attr("disabled", true);
    }
    $("#time_tracker_message").val(localStorage.getItem("msg"));
    if(localStorage.getItem("recorded_id")==null){
        timerCycle();
    }
}

// Variables to store hours, minutes, and seconds
var hr = parseInt($("#hour").length > 0 ? $("#hour").val() : 0);
var min = parseInt($("#minute").length > 0 ? $("#minute").val() : 0);
var sec = parseInt($("#second").length > 0 ? $("#second").val() : 0);
var is_timer_stopped = true;
let recorded_id = "00";

// Check if the timer was paused and has a recorded ID
if (
    parseInt(localStorage.getItem("Pause")) == 1 &&
    parseInt(localStorage.getItem("recorded_id")) > 0
) {
    is_timer_stopped = true;
    time_tracker_img();
}

// Function to start the timer
function startTimer() {
    if (is_timer_stopped == true) {
        $.ajax({
            url: "/time-tracker/store",
            type: 'POST',
            dataType: "json",
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').val()
            },
            beforeSend: function () {
                $("#start").attr("disabled", true);
                time_tracker_img();
            },
            success: function (result) {
                if (result["error"] == false) {
                    recorded_id = result["id"];
                    localStorage.setItem("recorded_id", recorded_id);
                    localStorage.setItem("msg", $('#time_tracker_message').val());

                    if (localStorage.getItem("Seconds") > "00") {
                        is_timer_stopped = false;
                        timerCycle();
                    } else {
                        hr = "00";
                        sec = "00";
                        min = "00";
                        is_timer_stopped = false;
                        timerCycle();
                        time_tracker_img();
                    }
                    $("#start").attr("disabled", true);
                    time_tracker_img();
                    $("#pause").attr("disabled", false);
                    $("#end").attr("disabled", false);
                    if (
                        localStorage.getItem("Pause") == "0" ||
                        localStorage.getItem("Pause") == "00"
                    ) {
                        localStorage.setItem("Pause", "1");
                    }

                    toastr.success(result['message']);
                } else {
                    toastr.error(result['message']);
                }
            },
        });
    }
}

// Function to pause the timer
function pauseTimer() {
    if (is_timer_stopped == false && $("#second").val() > "00") {
        is_timer_stopped = true;
        window.localStorage.setItem("Pause", "0");

        $("#start").attr("disabled", false);
        $("#pause").attr("disabled", true);
        $("#end").attr("disabled", true);
        clearInterval(timer); // Clear the interval to avoid multiple executions
        time_tracker_img();

        var r_id = localStorage.getItem("recorded_id");
        var msg = $("#time_tracker_message").val();
        var input_body = {
            record_id: r_id,
            'message': msg,
        };
        $.ajax({
            type: "POST",
            data: input_body,
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').val()
            },
            url: "/time-tracker/update",
            dataType: "json",
            success: function (result) {
                if (result["error"] == false) {
                    toastr.success('Timer has been paused successfully.');
                    localStorage.setItem("msg", $('#time_tracker_message').val());

                    if (typeof total_records !== 'undefined' && total_records == 0) {
                        location.reload();
                    } else {
                        $('#timesheet_table').bootstrapTable('refresh');
                    }
                } else {
                    toastr.error(result['message']);
                }
            },
        });
    } else {
        toastr.warning('Please make sure the timer has started.');
    }
}

// Check if the page is reloaded or navigated
if (
    window.performance.getEntriesByType("navigation")[0]["type"] == "reload" ||
    window.performance.getEntriesByType("navigation")[0]["type"] == "navigate"
) {
    hr = localStorage.getItem("Hour");
    sec = localStorage.getItem("Seconds");
    min = localStorage.getItem("Minutes");
    $("#hour").val("00");
    $("#minute").val("00");
    $("#second").val("00");
    if (hr) {
        $("#hour").val(hr);
    } else {
        $("#hour").val("00");
    }
    if (min) {
        $("#minute").val(min);
    } else {
        $("#minute").val("00");
    }
    if (sec) {
        $("#second").val(sec);
    } else {
        $("#second").val("00");
    }
    if (
        localStorage.getItem("Seconds") > "00" &&
        localStorage.getItem("Pause") != "0"
    ) {
        is_timer_stopped = false;
        timerCycle();
    }
}

// Function for the timer cycle
function timerCycle() {
    if (is_timer_stopped == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);
        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10) {
            sec = "0" + sec;
        } else {
            sec = "" + sec;
        }
        if (min < 10) {
            min = "0" + min;
        } else {
            min = "" + min;
        }
        if (hr < 10) {
            hr = "0" + hr;
        } else {
            hr = "" + hr;
        }
        window.localStorage.setItem("Hour", hr);
        window.localStorage.setItem("Minutes", min);
        window.localStorage.setItem("Seconds", sec);
        $("#hour").val(hr);
        $("#minute").val(min);
        $("#second").val(sec);
        timer = setTimeout(timerCycle, 1000); // Use setTimeout instead of setInterval
    }
}

// Function to stop the timer
function stopTimer() {
    if (is_timer_stopped == false && $("#second").val() > "00") {
        $('#stopTimerModal').modal('show');
        $('#stopTimerModal').off('click', '#confirmStop');
        $('#stopTimerModal').on('click', '#confirmStop', function (e) {
            $('#confirmStop').html(label_please_wait).attr('disabled', true);
            is_timer_stopped = true;
            localStorage.removeItem("Minutes");
            localStorage.removeItem("Seconds");
            localStorage.removeItem("Hour");
            localStorage.removeItem("msg");
            var r_id = localStorage.getItem("recorded_id");
            var msg = $('#time_tracker_message').val();
            $("#start").attr("disabled", false);
            $("#pause").attr("disabled", true);
            $("#end").attr("disabled", true);

            $("#hour").val("00");
            $("#minute").val("00");
            $("#second").val("00");
            $('#time_tracker_message').val(msg);
            time_tracker_img();
            clearInterval(timer); // Clear the interval before stopping the timer
            var input_body = {
                record_id: r_id,
                'message': msg,
            };
            $.ajax({
                type: "POST",
                data: input_body,
                headers: {
                    'X-CSRF-TOKEN': $('input[name="_token"]').val()
                },
                url: "/time-tracker/update",
                dataType: "json",
                success: function (result) {
                    $('#confirmStop').html(label_yes).attr('disabled', false);
                    if (result["error"] == false) {
                        toastr.success(result['message']);
                        if (typeof total_records !== 'undefined' && total_records == 0) {
                            location.reload();
                        } else {
                            $('#stopTimerModal').modal('hide');
                            $('#timerModal').modal('hide');
                            $('#timesheet_table').bootstrapTable('refresh');
                        }
                    } else {
                        toastr.error(result['message']);
                        $('#stopTimerModal').modal('hide');
                    }
                },
            });
        });
    } else {
        toastr.warning('Please make sure the timer has started.');
    }
}

// Function to change the timer image
function time_tracker_img() {
    if (!is_timer_stopped) {
        $("#timer-image").attr("src", "/storage/94150-clock.gif");
    } else {
        $("#timer-image").attr("src", "/storage/94150-clock.png");
    }
}


function time_tracker_query_params(p) {

    return {
        "user_id": $('#timesheet_user_filter').val(),
        "start_date_from": $('#timesheet_start_date_from').val(),
        "start_date_to": $('#timesheet_start_date_to').val(),
        "end_date_from": $('#timesheet_end_date_from').val(),
        "end_date_to": $('#timesheet_end_date_to').val(),
        limit: p.limit,
        sort: p.sort,
        order: p.order,
        offset: p.offset,
        search: p.search
    };
}

window.icons = {
    refresh: 'bx-refresh',
    toggleOff: 'bx-toggle-left',
    toggleOn: 'bx-toggle-right'
}

function loadingTemplate(message) {
    return '<i class="bx bx-loader-alt bx-spin bx-flip-vertical" ></i>'
}
function timeSheetUserFormatter(value, row, index) {
    return '<div class="d-flex">' + row.photo + '<div class="mx-2 mt-2"><h6 class="mb-1">' + row.user_name +
        '</div>';

}
function timeSheetActionsFormatter(value, row, index) {
    return [
        '<button title=' + label_delete + ' type="button" class="btn delete action_delete_timesheet" data-id=' + row.id + ' data-type="time-tracker" data-table="timesheet_table">' +
        '<i class="bx bx-trash text-danger mx-1"></i>' +
        '</button>'
    ]
}
$('#timesheet_user_filter').on('change', function (e) {
    e.preventDefault();
    $('#timesheet_table').bootstrapTable('refresh');
});