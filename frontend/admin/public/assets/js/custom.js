'use strict';
$(document).on('click', '.delete', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var type = $(this).data('type');
    var reload = $(this).data('reload'); // Get the value of data-reload attribute
    if (typeof reload !== 'undefined' && reload === true) {
        reload = true;
    } else {
        reload = false;
    }
    var tableID = $(this).data('table') || 'table';
    var destroy = type == 'users' ? 'delete_user' : (type == 'contract-type' ? 'delete-contract-type' : (type == 'project-media' || type == 'task-media' ? 'delete-media' : (type == 'expense-type' ? 'delete-expense-type' : (type == 'milestone' ? 'delete-milestone' : 'destroy'))));
    type = type == 'contract-type' ? 'contracts' : (type == 'project-media' ? 'projects' : (type == 'task-media' ? 'tasks' : (type == 'expense-type' ? 'expenses' : (type == 'milestone' ? 'projects' : type))));
    $('#deleteModal').modal('show'); // show the confirmation modal
    $('#deleteModal').off('click', '#confirmDelete');
    $('#deleteModal').on('click', '#confirmDelete', function (e) {
        $('#confirmDelete').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: '/' + type + '/' + destroy + '/' + id,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            success: function (response) {
                $('#confirmDelete').html(label_yes).attr('disabled', false);
                $('#deleteModal').modal('hide');
                if (response.error == false) {
                    if (reload) {
                        location.reload();
                    } else {
                        toastr.success(response.message);
                        if (tableID) {
                            $('#' + tableID).bootstrapTable('refresh');
                        }

                    }
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (data) {
                $('#confirmDelete').html(label_yes).attr('disabled', false);
                $('#deleteModal').modal('hide');
                toastr.error(label_something_went_wrong);
            }

        });
    });
});

$(document).on('click', '.delete-selected', function (e) {
    e.preventDefault();
    var table = $(this).data('table');
    var type = $(this).data('type');
    var destroy = type == 'users' ? 'delete_multiple_user' : (type == 'contract-type' ? 'delete-multiple-contract-type' : (type == 'project-media' || type == 'task-media' ? 'delete-multiple-media' : (type == 'expense-type' ? 'delete-multiple-expense-type' : (type == 'milestone' ? 'delete-multiple-milestone' : 'destroy_multiple'))));
    type = type == 'contract-type' ? 'contracts' : (type == 'project-media' ? 'projects' : (type == 'task-media' ? 'tasks' : (type == 'expense-type' ? 'expenses' : (type == 'milestone' ? 'projects' : type))));
    var selections = $('#' + table).bootstrapTable('getSelections');
    var selectedIds = selections.map(function (row) {
        return row.id; // Replace 'id' with the field containing the unique ID
    });
    if (selectedIds.length > 0) {

        $('#confirmDeleteSelectedModal').modal('show'); // show the confirmation modal
        $('#confirmDeleteSelectedModal').off('click', '#confirmDeleteSelections');
        $('#confirmDeleteSelectedModal').on('click', '#confirmDeleteSelections', function (e) {
            $('#confirmDeleteSelections').html(label_please_wait).attr('disabled', true);
            $.ajax({
                url: '/' + type + '/' + destroy,
                data: {
                    'ids': selectedIds,
                },
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
                },
                success: function (response) {
                    if (type == 'settings/languages') {
                        location.reload();
                    } else {
                        $('#confirmDeleteSelections').html(label_yes).attr('disabled', false);
                        $('#confirmDeleteSelectedModal').modal('hide');
                        if (response.error == false) {
                            $('#' + table).bootstrapTable('refresh');
                            toastr.success(response.message);
                        } else {
                            toastr.error(response.message);
                        }
                    }
                },
                error: function (data) {
                    $('#confirmDeleteSelections').html(label_yes).attr('disabled', false);
                    $('#confirmDeleteSelectedModal').modal('hide');
                    toastr.error(label_something_went_wrong);
                }

            });
        });


    } else {
        toastr.error(label_please_select_records_to_delete);
    }



});

function update_status(e) {
    var id = e['id'];
    var name = e['name'];
    var reload = e.getAttribute('reload') ? true : false;
    var status;
    var is_checked = $('input[name=' + name + ']:checked');

    if (is_checked.length >= 1) {
        status = 1;
    } else {
        status = 0;
    }
    $.ajax({
        url: '/todos/update_status',
        type: 'POST', // Use POST method
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        data: {
            _method: 'PUT', // Specify the desired method
            id: id,
            status: status
        },
        success: function (response) {
            if (response.error == false) {
                if (reload) {
                    location.reload();
                }
                toastr.success(response.message); // show a success message
                $('#' + id + '_title').toggleClass('striked');
            } else {
                toastr.error(response.message);
            }

        }

    });
}

$(document).on('click', '.edit-todo', function () {
    var id = $(this).data('id');
    $('#edit_todo_modal').modal('show');
    $.ajax({
        url: '/todos/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#todo_id').val(response.todo.id)
            $('#todo_title').val(response.todo.title)
            $('#todo_priority').val(response.todo.priority)
            $('#todo_description').val(response.todo.description)
        },

    });
});


$(document).on('click', '.edit-note', function () {
    var id = $(this).data('id');
    $('#edit_note_modal').modal('show');
    var classes = $('#note_color').attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    $.ajax({
        url: '/notes/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#note_id').val(response.note.id)
            $('#note_title').val(response.note.title)
            $('#note_color').val(response.note.color).removeClass(currentColorClass).addClass('select-bg-label-' + response.note.color)
            var description = response.note.description !== null ? response.note.description : '';
            $('#edit_note_modal').find('#note_description').val(description);
        },

    });
});


$(document).on('click', '.edit-status', function () {
    var id = $(this).data('id');
    $('#edit_status_modal').modal('show');
    var classes = $('#status_color').attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    $.ajax({
        url: '/status/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#status_id').val(response.status.id)
            $('#status_title').val(response.status.title)
            $('#status_color').val(response.status.color).removeClass(currentColorClass).addClass('select-bg-label-' + response.status.color)

            var modalForm = $('#edit_status_modal').find('form');
            var usersSelect = modalForm.find('.js-example-basic-multiple[name="role_ids[]"]');

            usersSelect.val(response.roles);
            usersSelect.trigger('change'); // Trigger change event to update select2
        },

    });
});


$(document).on('click', '.edit-tag', function () {
    var id = $(this).data('id');
    $('#edit_tag_modal').modal('show');
    var classes = $('#tag_color').attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    $.ajax({
        url: '/tags/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#tag_id').val(response.tag.id)
            $('#tag_title').val(response.tag.title)
            $('#tag_color').val(response.tag.color).removeClass(currentColorClass).addClass('select-bg-label-' + response.tag.color)
        },

    });
});

$(document).on('click', '.edit-leave-request', function () {
    var id = $(this).data('id');
    $('#edit_leave_request_modal').modal('show');
    $.ajax({
        url: '/leave-requests/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedFromDate = moment(response.lr.from_date).format(js_date_format);
            var formattedToDate = moment(response.lr.to_date).format(js_date_format);
            var fromDateSelect = $('#edit_leave_request_modal').find('#update_start_date');
            var toDateSelect = $('#edit_leave_request_modal').find('#update_end_date');
            var reasonSelect = $('#edit_leave_request_modal').find('[name="reason"]');
            var totalDaysSelect = $('#edit_leave_request_modal').find('#update_total_days');
            $('#lr_id').val(response.lr.id);
            $('#leaveUser').val(response.lr.user.first_name + ' ' + response.lr.user.last_name);
            fromDateSelect.val(formattedFromDate);
            toDateSelect.val(formattedToDate);
            initializeDateRangePicker('#update_start_date,#update_end_date');

            var start_date = moment(fromDateSelect.val(), js_date_format);
            var end_date = moment(toDateSelect.val(), js_date_format);
            var total_days = end_date.diff(start_date, 'days') + 1;
            totalDaysSelect.val(total_days);

            if (response.lr.from_time && response.lr.to_time) {
                $('#updatePartialLeave').prop('checked', true).trigger('change');
                var fromTimeSelect = $('#edit_leave_request_modal').find('[name="from_time"]');
                var toTimeSelect = $('#edit_leave_request_modal').find('[name="to_time"]');
                fromTimeSelect.val(response.lr.from_time);
                toTimeSelect.val(response.lr.to_time);
            } else {
                $('#updatePartialLeave').prop('checked', false).trigger('change');
            }
            if (response.lr.visible_to_all) {
                $('#edit_leave_request_modal').find('.leaveVisibleToAll').prop('checked', true).trigger('change');
            } else {
                $('#edit_leave_request_modal').find('.leaveVisibleToAll').prop('checked', false).trigger('change');
                var visibleToSelect = $('#edit_leave_request_modal').find('.js-example-basic-multiple[name="visible_to_ids[]"]');
                var visibleToUsers = response.visibleTo.map(user => user.id);
                visibleToSelect.val(visibleToUsers);
                visibleToSelect.trigger('change');
            }
            reasonSelect.val(response.lr.reason);
            $("input[name=status][value=" + response.lr.status + "]").prop('checked', true);
        }
    });
});

$(document).on('click', '.edit-contract-type', function () {
    var id = $(this).data('id');
    $('#edit_contract_type_modal').modal('show');
    $.ajax({
        url: '/contracts/get-contract-type/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#update_contract_type_id').val(response.ct.id);
            $('#contract_type').val(response.ct.type);
        }
    });
});

$(document).on('click', '.edit-contract', function () {
    var id = $(this).data('id');
    $('#edit_contract_modal').modal('show');
    $.ajax({
        url: '/contracts/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            if (response.error == false) {
                var formattedStartDate = moment(response.contract.start_date).format(js_date_format);
                var formattedEndDate = moment(response.contract.end_date).format(js_date_format);
                var value = parseFloat(response.contract.value);
                $('#contract_id').val(response.contract.id);
                $('#title').val(response.contract.title);
                $('#value').val(value.toFixed(decimal_points));
                $('#client_id').val(response.contract.client_id);
                $('#project_id').val(response.contract.project_id);
                $('#contract_type_id').val(response.contract.contract_type_id);
                var description = response.contract.description !== null ? response.contract.description : '';
                $('#update_contract_description').val(description);
                $('#update_start_date').val(formattedStartDate);
                $('#update_end_date').val(formattedEndDate);
                initializeDateRangePicker('#update_start_date, #update_end_date');
            } else {
                location.reload();
            }


        }
    });
});
$(document).on('click', '.edit-expense-type', function () {
    var id = $(this).data('id');
    $('#edit_expense_type_modal').modal('show');
    $.ajax({
        url: '/expenses/get-expense-type/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#update_expense_type_id').val(response.et.id);
            $('#expense_type_title').val(response.et.title);
            $('#expense_type_description').val(response.et.description);
        }
    });
});

$(document).on('click', '.edit-expense', function () {
    var id = $(this).data('id');
    $('#edit_expense_modal').modal('show');
    $.ajax({
        url: '/expenses/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedExpDate = moment(response.exp.expense_date).format(js_date_format);
            var amount = parseFloat(response.exp.amount);
            $('#update_expense_id').val(response.exp.id);
            $('#expense_title').val(response.exp.title);
            $('#expense_type_id').val(response.exp.expense_type_id);
            $('#expense_user_id').val(response.exp.user_id);
            $('#expense_amount').val(amount.toFixed(decimal_points));
            $('#update_expense_date').val(formattedExpDate);
            $('#expense_note').val(response.exp.note);
        }
    });
});

$(document).on('click', '.edit-language', function () {
    var id = $(this).data('id');
    $('#edit_language_modal').modal('show');
    $.ajax({
        url: '/settings/languages/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#language_id').val(response.language.id)
            $('#language_title').val(response.language.name)
        },

    });
});

$(document).on('click', '.edit-payment', function () {
    var id = $(this).data('id');
    $('#edit_payment_modal').modal('show');
    $.ajax({
        url: '/payments/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedExpDate = moment(response.payment.payment_date).format(js_date_format);
            var amount = parseFloat(response.payment.amount);
            $('#update_payment_id').val(response.payment.id);
            $('#payment_user_id').val(response.payment.user_id);
            $('#payment_invoice_id').val(response.payment.invoice_id);
            $('#payment_pm_id').val(response.payment.payment_method_id);
            $('#payment_amount').val(amount.toFixed(decimal_points));
            $('#update_payment_date').val(formattedExpDate);
            $('#payment_note').val(response.payment.note);
        }
    });
});
function initializeDateRangePicker(inputSelector) {
    $(inputSelector).daterangepicker({
        alwaysShowCalendars: true,
        showCustomRangeLabel: true,
        // minDate: moment($(inputSelector).val(), js_date_format),
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: true,
        locale: {
            cancelLabel: 'Clear',
            format: js_date_format
        }
    });
}

$(document).on('click', '#set-as-default', function (e) {
    e.preventDefault();
    var lang = $(this).data('lang');
    $('#default_language_modal').modal('show'); // show the confirmation modal
    $('#default_language_modal').on('click', '#confirm', function () {
        $('#default_language_modal').find('#confirm').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: '/settings/languages/set-default',
            type: 'PUT',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            data: {
                lang: lang
            },
            success: function (response) {
                $('#default_language_modal').find('#confirm').html(label_yes).attr('disabled', false);
                if (response.error == false) {
                    location.reload();
                } else {
                    toastr.error(response.message);
                    $('#default_language_modal').modal('hide');
                }

            }

        });
    });
});

$(document).on('click', '#set-default-view', function (e) {
    e.preventDefault();
    var type = $(this).data('type');
    var view = $(this).data('view');
    var url = '/save-' + type + '-view-preference';
    $('#set_default_view_modal').modal('show');
    $('#set_default_view_modal').off('click', '#confirm');
    $('#set_default_view_modal').on('click', '#confirm', function () {
        $('#set_default_view_modal').find('#confirm').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: url,
            type: 'PUT',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            data: {
                type: type,
                view: view
            },
            success: function (response) {
                $('#set_default_view_modal').find('#confirm').html(label_yes).attr('disabled', false);
                if (response.error == false) {
                    $('#set-default-view').text(label_default_view).removeClass('bg-secondary').addClass('bg-primary');
                    $('#set_default_view_modal').modal('hide');
                    toastr.success(response.message);
                } else {
                    toastr.error(response.message);
                }

            }

        });
    });
});

$(document).on('click', '#remove-participant', function (e) {
    e.preventDefault();
    $('#leaveWorkspaceModal').modal('show'); // show the confirmation modal
    $('#leaveWorkspaceModal').on('click', '#confirm', function () {
        $.ajax({
            url: '/workspaces/remove_participant',
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            success: function (response) {
                location.reload();
            },
            error: function (data) {
                location.reload();
            }
        });
    });
});
function resetDateFields($form) {
    var currentDate = moment(new Date()).format(js_date_format); // Get current date
    $form.find('input').each(function () {
        var $this = $(this);
        if ($this.data('daterangepicker')) {
            // Destroy old instance
            $this.data('daterangepicker').remove();

            // Reinitialize with new value
            $this.val(currentDate).daterangepicker({
                alwaysShowCalendars: true,
                showCustomRangeLabel: true,
                // minDate: moment($(id).val(), js_date_format),
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: true,
                locale: {
                    cancelLabel: 'Clear',
                    format: js_date_format
                }
            });
        }
    });
}

$(document).ready(function () {
    // Define the IDs you want to process
    var idsToProcess = ['#start_date', '#end_date', '#update_start_date', '#update_end_date', '#lr_end_date', '#meeting_end_date', '#expense_date', '#update_expense_date', '#payment_date', '#update_payment_date', '#update_milestone_start_date', '#update_milestone_end_date', '#task_start_date', '#task_end_date'];

    // Loop through the IDs
    for (var i = 0; i < idsToProcess.length; i++) {
        var id = idsToProcess[i];

        if ($(id).length) {
            if (id === '#payment_date' && !$(id).closest('#create_payment_modal').length) {
                continue;
            }
            if ($(id).val() == '') {
                $(id).val(moment(new Date()).format(js_date_format));
            }
            $(id).daterangepicker({
                alwaysShowCalendars: true,
                showCustomRangeLabel: true,
                // minDate: moment($(id).val(), js_date_format),
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: true,
                locale: {
                    cancelLabel: 'Clear',
                    format: js_date_format
                }
            });
        }
    }



    // Define the IDs you want to process
    var idsToProcess = ['#payment_date', '#dob', '#doj'];
    var minDateStr = '01/01/1950';
    var minDate = moment(minDateStr, 'DD/MM/YYYY');

    // Loop through the IDs
    for (var i = 0; i < idsToProcess.length; i++) {
        var id = idsToProcess[i];

        if ($(id).length) {
            $(id).daterangepicker({
                alwaysShowCalendars: true,
                showCustomRangeLabel: true,
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: false,
                minDate: minDate,
                locale: {
                    cancelLabel: 'Clear',
                    format: js_date_format
                }
            });

            $(id).on('apply.daterangepicker', function (ev, picker) {
                // Update the input with the selected date
                $(this).val(picker.startDate.format(js_date_format));
            });
        }
    }
});



$(document).ready(function () {
    if ($("#total_days").length) {
        // Function to calculate and display the total days for create modal
        function calculateCreateTotalDays() {
            var start_date = moment($('#start_date').val(), js_date_format);
            var end_date = moment($('#lr_end_date').val(), js_date_format);

            if (start_date.isValid() && end_date.isValid()) {
                var total_days = end_date.diff(start_date, 'days') + 1;
                $('#total_days').val(total_days);
            }
        }

        // Bind the event handlers to both date pickers in the create modal
        $('#start_date').on('apply.daterangepicker', function (ev, picker) {
            calculateCreateTotalDays();
        });

        $('#lr_end_date').on('apply.daterangepicker', function (ev, picker) {
            calculateCreateTotalDays();
        });
    }

    if ($("#update_total_days").length) {
        // Function to calculate and display the total days for update modal
        function calculateUpdateTotalDays() {
            var start_date = moment($('#update_start_date').val(), js_date_format);
            var end_date = moment($('#update_end_date').val(), js_date_format);

            if (start_date.isValid() && end_date.isValid()) {
                var total_days = end_date.diff(start_date, 'days') + 1;
                $('#update_total_days').val(total_days);
            }
        }

        // Bind the event handlers to both date pickers in the update modal
        $('#update_start_date').on('apply.daterangepicker', function (ev, picker) {
            calculateUpdateTotalDays();
        });

        $('#update_end_date').on('apply.daterangepicker', function (ev, picker) {
            calculateUpdateTotalDays();
        });
    }
});

$(document).ready(function () {

    $('#start_date_between,#end_date_between,#project_start_date_between,#project_end_date_between,#task_start_date_between,#task_end_date_between,#lr_start_date_between,#lr_end_date_between,#contract_start_date_between,#contract_end_date_between,#timesheet_start_date_between,#timesheet_end_date_between,#meeting_start_date_between,#meeting_end_date_between,#activity_log_between_date,#expense_from_date_between,#payment_date_between').daterangepicker({
        alwaysShowCalendars: true,
        showCustomRangeLabel: true,
        singleDatePicker: false,
        showDropdowns: true,
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear',
            format: js_date_format
        },
    });
    $('#start_date_between,#end_date_between,#project_start_date_between,#project_end_date_between,#task_start_date_between,#task_end_date_between,#lr_start_date_between,#lr_end_date_between,#contract_start_date_between,#contract_end_date_between,#timesheet_start_date_between,#timesheet_end_date_between,#meeting_start_date_between,#meeting_end_date_between,#activity_log_between_date,#expense_from_date_between,#payment_date_between').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format(js_date_format) + ' To ' + picker.endDate.format(js_date_format));
    });
});


if ($("#project_start_date_between").length) {
    $('#project_start_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#project_start_date_from').val(startDate);
        $('#project_start_date_to').val(endDate);

        $('#projects_table').bootstrapTable('refresh');
    });

    $('#project_start_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#project_start_date_from').val('');
        $('#project_start_date_to').val('');
        $('#projects_table').bootstrapTable('refresh');
        $('#project_start_date_between').val('');
    });

    $('#project_end_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#project_end_date_from').val(startDate);
        $('#project_end_date_to').val(endDate);

        $('#projects_table').bootstrapTable('refresh');
    });
    $('#project_end_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#project_end_date_from').val('');
        $('#project_end_date_to').val('');
        $('#projects_table').bootstrapTable('refresh');
        $('#project_end_date_between').val('');
    });
}

if ($("#task_start_date_between").length) {

    $('#task_start_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#task_start_date_from').val(startDate);
        $('#task_start_date_to').val(endDate);

        $('#task_table').bootstrapTable('refresh');
    });

    $('#task_start_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#task_start_date_from').val('');
        $('#task_start_date_to').val('');
        $('#task_table').bootstrapTable('refresh');
        $('#task_start_date_between').val('');
    });

    $('#task_end_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#task_end_date_from').val(startDate);
        $('#task_end_date_to').val(endDate);

        $('#task_table').bootstrapTable('refresh');
    });
    $('#task_end_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#task_end_date_from').val('');
        $('#task_end_date_to').val('');
        $('#task_table').bootstrapTable('refresh');
        $('#task_end_date_between').val('');
    });
}

if ($("#timesheet_start_date_between").length) {
    $('#timesheet_start_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#timesheet_start_date_from').val(startDate);
        $('#timesheet_start_date_to').val(endDate);

        $('#timesheet_table').bootstrapTable('refresh');
    });

    $('#timesheet_start_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#timesheet_start_date_from').val('');
        $('#timesheet_start_date_to').val('');
        $('#timesheet_table').bootstrapTable('refresh');
        $('#timesheet_start_date_between').val('');
    });

    $('#timesheet_end_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#timesheet_end_date_from').val(startDate);
        $('#timesheet_end_date_to').val(endDate);

        $('#timesheet_table').bootstrapTable('refresh');
    });
    $('#timesheet_end_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#timesheet_end_date_from').val('');
        $('#timesheet_end_date_to').val('');
        $('#timesheet_table').bootstrapTable('refresh');
        $('#timesheet_end_date_between').val('');
    });
}

if ($("#meeting_start_date_between").length) {
    $('#meeting_start_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#meeting_start_date_from').val(startDate);
        $('#meeting_start_date_to').val(endDate);

        $('#meetings_table').bootstrapTable('refresh');
    });

    $('#meeting_start_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#meeting_start_date_from').val('');
        $('#meeting_start_date_to').val('');
        $('#meetings_table').bootstrapTable('refresh');
        $('#meeting_start_date_between').val('');
    });

    $('#meeting_end_date_between').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        $('#meeting_end_date_from').val(startDate);
        $('#meeting_end_date_to').val(endDate);

        $('#meetings_table').bootstrapTable('refresh');
    });
    $('#meeting_end_date_between').on('cancel.daterangepicker', function (ev, picker) {
        $('#meeting_end_date_from').val('');
        $('#meeting_end_date_to').val('');
        $('#meetings_table').bootstrapTable('refresh');
        $('#meeting_end_date_between').val('');
    });
}

$('textarea#footer_text,textarea#contract_description,textarea#update_contract_description,textarea.description').tinymce({
    height: 250,
    menubar: false,
    plugins: [
        'link', 'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons', 'code'
    ],
    toolbar: 'link | undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | code blockquote emoticons table help'
});




$(document).on('submit', '.form-submit-event', function (e) {
    e.preventDefault();
    if ($('#net_payable').length > 0) {
        var net_payable = $('#net_payable').text();
        $('#net_pay').val(net_payable);
    }
    var formData = new FormData(this);
    var currentForm = $(this);
    var submit_btn = $(this).find('#submit_btn');
    var btn_html = submit_btn.html();
    var btn_val = submit_btn.val();
    var redirect_url = currentForm.find('input[name="redirect_url"]').val();
    redirect_url = (typeof redirect_url !== 'undefined' && redirect_url) ? redirect_url : '';
    var button_text = (btn_html != '' || btn_html != 'undefined') ? btn_html : btn_val;
    var tableInput = currentForm.find('input[name="table"]');
    var tableID = tableInput.length ? tableInput.val() : 'table';
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: formData,
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        beforeSend: function () {
            submit_btn.html(label_please_wait);
            submit_btn.attr('disabled', true);
        },
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (result) {

            submit_btn.html(button_text);
            submit_btn.attr('disabled', false);
            if (result['error'] == true) {
                toastr.error(result['message']);
            } else {
                if ($('.empty-state').length > 0) {
                    if (result.hasOwnProperty('message')) {
                        toastr.success(result['message']);
                        // Show toastr for 3 seconds before reloading or redirecting
                        setTimeout(handleRedirection, 3000);
                    } else {
                        handleRedirection();
                    }
                } else {
                    if (currentForm.find('input[name="dnr"]').length > 0) {
                        var modalWithClass = $('.modal.fade.show');
                        if (modalWithClass.length > 0) {
                            var idOfModal = modalWithClass.attr('id');
                            $('#' + idOfModal).modal('hide');
                            $('#' + tableID).bootstrapTable('refresh');
                            currentForm[0].reset();
                            var partialLeaveCheckbox = $('#partialLeave');
                            if (partialLeaveCheckbox.length) {
                                partialLeaveCheckbox.trigger('change');
                            }
                            resetDateFields(currentForm);
                            if (idOfModal == 'create_status_modal') {
                                var dropdownSelector = modalWithClass.find('select[name="status_id"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.status;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('data-color', newItem.color)
                                        .attr('selected', true)
                                        .text(newItem.title + ' (' + newItem.color + ')');
                                    $(dropdownSelector).append(newOption);

                                    var openModalId = dropdownSelector.closest('.modal.fade.show').attr('id');

                                    // List of all possible modal IDs
                                    var modalIds = ['#create_project_modal', '#edit_project_modal', '#create_task_modal', '#edit_task_modal'];

                                    // Iterate through each modal ID
                                    modalIds.forEach(function (modalId) {
                                        // If the modal ID is not the open one
                                        if (modalId !== '#' + openModalId) {
                                            // Find the select element within the modal
                                            var otherModalSelector = $(modalId).find('select[name="status_id"]');

                                            // Create a new option without 'selected' attribute
                                            var otherOption = $('<option></option>')
                                                .attr('value', newItem.id)
                                                .attr('data-color', newItem.color)
                                                .text(newItem.title + ' (' + newItem.color + ')');

                                            // Append the option to the select element in the modal
                                            otherModalSelector.append(otherOption);
                                        }
                                    });
                                }
                            }
                            if (idOfModal == 'create_priority_modal') {
                                var dropdownSelector = modalWithClass.find('select[name="priority_id"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.priority;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('class', 'badge bg-label-' + newItem.color)
                                        .attr('selected', true)
                                        .text(newItem.title + ' (' + newItem.color + ')');
                                    $(dropdownSelector).append(newOption);

                                    var openModalId = dropdownSelector.closest('.modal.fade.show').attr('id');

                                    // List of all possible modal IDs
                                    var modalIds = ['#create_project_modal', '#edit_project_modal', '#create_task_modal', '#edit_task_modal'];

                                    // Iterate through each modal ID
                                    modalIds.forEach(function (modalId) {
                                        // If the modal ID is not the open one
                                        if (modalId !== '#' + openModalId) {
                                            // Find the select element within the modal
                                            var otherModalSelector = $(modalId).find('select[name="priority_id"]');

                                            // Create a new option without 'selected' attribute
                                            var otherOption = $('<option></option>')
                                                .attr('value', newItem.id)
                                                .attr('class', 'badge bg-label-' + newItem.color)
                                                .text(newItem.title + ' (' + newItem.color + ')');

                                            // Append the option to the select element in the modal
                                            otherModalSelector.append(otherOption);
                                        }
                                    });
                                }
                            }
                            if (idOfModal == 'create_tag_modal') {
                                var dropdownSelector = modalWithClass.find('select[name="tag_ids[]"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.tag;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('data-color', newItem.color)
                                        .attr('selected', true)
                                        .text(newItem.title);
                                    $(dropdownSelector).append(newOption);
                                    $(dropdownSelector).trigger('change');

                                    var openModalId = dropdownSelector.closest('.modal.fade.show').attr('id');

                                    // List of all possible modal IDs
                                    var modalIds = ['#create_project_modal', '#edit_project_modal'];

                                    // Iterate through each modal ID
                                    modalIds.forEach(function (modalId) {
                                        // If the modal ID is not the open one
                                        if (modalId !== '#' + openModalId) {
                                            // Find the select element within the modal
                                            var otherModalSelector = $(modalId).find('select[name="tag_ids[]"]');

                                            // Create a new option without 'selected' attribute
                                            var otherOption = $('<option></option>')
                                                .attr('value', newItem.id)
                                                .attr('data-color', newItem.color)
                                                .text(newItem.title);

                                            // Append the option to the select element in the modal
                                            otherModalSelector.append(otherOption);
                                        }
                                    });
                                }
                            }
                            if (idOfModal == 'create_item_modal') {
                                var dropdownSelector = $('#item_id');
                                if (dropdownSelector.length) {
                                    var newItem = result.item;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('selected', true)
                                        .text(newItem.title);
                                    $(dropdownSelector).append(newOption);
                                    $(dropdownSelector).trigger('change');
                                }
                            }
                            if (idOfModal === 'create_contract_type_modal') {
                                var dropdownSelector = modalWithClass.find('select[name="contract_type_id"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.ct;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('selected', true)
                                        .text(newItem.type);

                                    // Append and select the new option in the current modal
                                    dropdownSelector.append(newOption);
                                    var openModalId = dropdownSelector.closest('.modal.fade.show').attr('id');
                                    var otherModalId = openModalId === 'create_contract_modal' ? '#edit_contract_modal' : '#create_contract_modal';
                                    var otherModalSelector = $(otherModalId).find('select[name="contract_type_id"]');

                                    // Create a new option for the other modal without 'selected' attribute
                                    var otherOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .text(newItem.type);

                                    // Append the option to the other modal
                                    otherModalSelector.append(otherOption);

                                }
                            }

                            if (idOfModal == 'create_pm_modal') {
                                var dropdownSelector = $('select[name="payment_method_id"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.pm;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('selected', true)
                                        .text(newItem.title);
                                    $(dropdownSelector).append(newOption);
                                }
                            }

                            if (idOfModal == 'create_allowance_modal') {
                                var dropdownSelector = $('select[name="allowance_id"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.allowance;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('selected', true)
                                        .text(newItem.title);
                                    $(dropdownSelector).append(newOption);
                                }
                            }

                            if (idOfModal == 'create_deduction_modal') {
                                var dropdownSelector = $('select[name="deduction_id"]');
                                if (dropdownSelector.length) {
                                    var newItem = result.deduction;
                                    var newOption = $('<option></option>')
                                        .attr('value', newItem.id)
                                        .attr('selected', true)
                                        .text(newItem.title);
                                    $(dropdownSelector).append(newOption);
                                }
                            }
                        }
                        toastr.success(result['message']);
                    } else {
                        if (result.hasOwnProperty('message')) {
                            toastr.success(result['message']);
                            // Show toastr for 3 seconds before reloading or redirecting
                            setTimeout(handleRedirection, 3000);
                        } else {
                            handleRedirection();
                        }

                    }
                }
            }
        },
        error: function (xhr, status, error) {
            submit_btn.html(button_text);
            submit_btn.attr('disabled', false);
            if (xhr.status === 422) {
                // Handle validation errors here
                var response = xhr.responseJSON; // Assuming you're returning JSON

                // You can access validation errors from the response object
                var errors = response.errors;

                // Example: Display the first validation error message
                toastr.error(label_please_correct_errors);
                // Assuming you have a list of all input fields with error messages
                var inputFields = currentForm.find('input[name], select[name], textarea[name]');
                inputFields = $(inputFields.toArray().reverse());

                // Iterate through all input fields
                inputFields.each(function () {
                    var inputField = $(this);
                    var fieldName = inputField.attr('name');
                    var errorMessageElement;

                    if (errors && errors[fieldName]) {
                        if (inputField.attr('type') !== 'radio' && inputField.attr('type') !== 'hidden') {
                            // Check if the error message element already exists
                            errorMessageElement = inputField.next('.text-danger.error-message');

                            // If it doesn't exist, create and append it
                            if (errorMessageElement.length === 0) {
                                errorMessageElement = $('<span class="text-danger error-message"></span>');
                                inputField.after(errorMessageElement);
                            }
                        } else {
                            errorMessageElement = inputField.next('.text-danger.error-message');
                        }

                        // If there is a validation error message for this field, display it
                        if (errorMessageElement && errorMessageElement.length > 0) {
                            if (errors[fieldName][0].includes('required')) {
                                errorMessageElement.text('This field is required.');
                            } else if (errors[fieldName][0].includes('format is invalid')) {
                                errorMessageElement.text('Only numbers allowed.');
                            } else {
                                errorMessageElement.text(errors[fieldName]);
                            }
                            inputField[0].scrollIntoView({ behavior: "smooth", block: "start" });
                            inputField.focus();
                        }
                    } else {
                        // If there is no validation error message, clear the existing message
                        errorMessageElement = inputField.next('.error-message');
                        if (errorMessageElement.length === 0) {
                            errorMessageElement = inputField.parent().nextAll('.error-message').first();
                        }
                        if (errorMessageElement && errorMessageElement.length > 0) {
                            errorMessageElement.remove();
                        }
                    }

                });

            } else {
                // Handle other errors (non-validation errors) here
                toastr.error(error);
            }
        }
    });
    function handleRedirection() {
        if (redirect_url === '') {
            window.location.reload(); // Reload the current page
        } else {
            window.location.href = redirect_url; // Redirect to specified URL
        }
    }
});




// Click event handler for the favorite icon
$(document).on('click', '.favorite-icon', function () {
    var icon = $(this);
    var projectId = $(this).data('id');
    var isFavorite = icon.attr('data-favorite');
    isFavorite = isFavorite == 1 ? 0 : 1;
    var reload = $(this).data("require_reload") !== undefined ? 1 : 0;
    var dataTitle = icon.data('bs-original-title');
    var temp = dataTitle !== undefined ? "data-bs-original-title" : "title";
    // Send an AJAX request to update the favorite status
    $.ajax({
        url: '/projects/update-favorite/' + projectId,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            is_favorite: isFavorite
        },
        success: function (response) {
            if (reload) {
                location.reload();
            } else {
                icon.attr('data-favorite', isFavorite);
                // Update the tooltip text
                if (isFavorite == 0) {
                    icon.removeClass("bxs-star");
                    icon.addClass("bx-star");
                    icon.attr(temp, add_favorite); // Update the tooltip text
                    toastr.success(label_project_removed_from_favorite_successfully);
                } else {
                    icon.removeClass("bx-star");
                    icon.addClass("bxs-star");
                    icon.attr(temp, remove_favorite); // Update the tooltip text
                    toastr.success(label_project_marked_as_favorite_successfully);
                }
            }

        },
        error: function (data) {
            // Handle errors if necessary
            toastr.error(error);
        }
    });
});

$(document).on('click', '.duplicate', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var type = $(this).data('type');
    var reload = $(this).data('reload'); // Get the value of data-reload attribute
    if (typeof reload !== 'undefined' && reload === true) {
        reload = true;
    } else {
        reload = false;
    }
    var tableID = $(this).data('table') || 'table';
    $('#duplicateModal').modal('show'); // show the confirmation modal
    $('#duplicateModal').off('click', '#confirmDuplicate');
    if (type != 'estimates-invoices' && type != 'payslips') {
        $('#duplicateModal').find('#titleDiv').removeClass('d-none');
        var title = $(this).data('title');
        $('#duplicateModal').find('#updateTitle').val(title);
    } else {
        $('#duplicateModal').find('#titleDiv').addClass('d-none');
    }
    $('#duplicateModal').on('click', '#confirmDuplicate', function (e) {
        e.preventDefault();
        var title = $('#duplicateModal').find('#updateTitle').val();
        $('#confirmDuplicate').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: '/' + type + '/duplicate/' + id + '?reload=' + reload + '&title=' + title,
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                $('#confirmDuplicate').html(label_yes).attr('disabled', false);
                $('#duplicateModal').modal('hide');
                if (response.error == false) {
                    if (reload) {
                        location.reload();
                    } else {
                        toastr.success(response.message);
                        if (tableID) {
                            $('#' + tableID).bootstrapTable('refresh');
                        }

                    }
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (data) {
                $('#confirmDuplicate').html(label_yes).attr('disabled', false);
                $('#duplicateModal').modal('hide');
                toastr.error(label_something_went_wrong);
            }

        });
    });
});

$('#deduction_type').on('change', function (e) {
    if ($('#deduction_type').val() == 'amount') {
        $('#amount_div').removeClass('d-none');
        $('#percentage_div').addClass('d-none');
    } else if ($('#deduction_type').val() == 'percentage') {
        $('#amount_div').addClass('d-none');
        $('#percentage_div').removeClass('d-none');
    } else {
        $('#amount_div').addClass('d-none');
        $('#percentage_div').addClass('d-none');
    }
});

$('#update_deduction_type').on('change', function (e) {
    if ($('#update_deduction_type').val() == 'amount') {
        $('#update_amount_div').removeClass('d-none');
        $('#update_percentage_div').addClass('d-none');
    } else if ($('#update_deduction_type').val() == 'percentage') {
        $('#update_amount_div').addClass('d-none');
        $('#update_percentage_div').removeClass('d-none');
    } else {
        $('#update_amount_div').addClass('d-none');
        $('#update_percentage_div').addClass('d-none');
    }
});


$('#tax_type').on('change', function (e) {
    if ($('#tax_type').val() == 'amount') {
        $('#amount_div').removeClass('d-none');
        $('#percentage_div').addClass('d-none');
    } else if ($('#tax_type').val() == 'percentage') {
        $('#amount_div').addClass('d-none');
        $('#percentage_div').removeClass('d-none');
    } else {
        $('#amount_div').addClass('d-none');
        $('#percentage_div').addClass('d-none');
    }
});

$('#update_tax_type').on('change', function (e) {
    if ($('#update_tax_type').val() == 'amount') {
        $('#update_amount_div').removeClass('d-none');
        $('#update_percentage_div').addClass('d-none');
    } else if ($('#update_tax_type').val() == 'percentage') {
        $('#update_amount_div').addClass('d-none');
        $('#update_percentage_div').removeClass('d-none');
    } else {
        $('#update_amount_div').addClass('d-none');
        $('#update_percentage_div').addClass('d-none');
    }
});


if (document.getElementById("system-update-dropzone")) {
    var is_error = false;
    if (!$("#system-update").hasClass("dropzone")) {
        var systemDropzone = new Dropzone("#system-update-dropzone", {
            url: $("#system-update").attr("action"),
            paramName: "update_file",
            autoProcessQueue: false,
            parallelUploads: 1,
            maxFiles: 1,
            acceptedFiles: ".zip",
            timeout: 360000,
            autoDiscover: false,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"), // Pass the CSRF token as a header
            },
            addRemoveLinks: true,
            dictRemoveFile: "x",
            dictMaxFilesExceeded: label_only_one_file_can_be_uploaded_at_a_time,
            dictResponseError: "Error",
            uploadMultiple: false,
            dictDefaultMessage:
                '<p><input type="button" value="' + label_select + '" class="btn btn-primary" /><br> ' + label_or + ' <br> ' + label_drag_and_drop_update_zip_here + '</p>'

        });

        systemDropzone.on("addedfile", function (file) {
            var i = 0;
            if (this.files.length) {
                var _i, _len;
                for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) {
                    if (
                        this.files[_i].name === file.name &&
                        this.files[_i].size === file.size &&
                        this.files[_i].lastModifiedDate.toString() ===
                        file.lastModifiedDate.toString()
                    ) {
                        this.removeFile(file);
                        i++;
                    }
                }
            }
        });

        systemDropzone.on("error", function (file, response) {
            console.log(response);
        });

        systemDropzone.on("sending", function (file, xhr, formData) {
            formData.append("flash_message", 1);
            xhr.onreadystatechange = function (response) {
                setTimeout(function () {
                    location.reload();
                }, 2000);
            };
        });
        $("#system_update_btn").on("click", function (e) {
            e.preventDefault();
            var queuedFiles = systemDropzone.getQueuedFiles();
            if (queuedFiles.length > 0) {
                if (is_error == false) {
                    $("#system_update_btn").attr('disabled', true).text(label_please_wait);
                    systemDropzone.processQueue();
                }
            } else {
                toastr.error('Please add a file to upload.');
            }

        });
    }
}


if (document.getElementById("media-upload-dropzone")) {
    var is_error = false;
    var mediaDropzone = new Dropzone("#media-upload-dropzone", {
        url: $("#media-upload").attr("action"),
        paramName: "media_files",
        autoProcessQueue: false,
        timeout: 360000,
        autoDiscover: false,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"), // Pass the CSRF token as a header
        },
        addRemoveLinks: true,
        dictRemoveFile: "x",
        dictResponseError: "Error",
        uploadMultiple: true,
        dictDefaultMessage:
            '<p><input type="button" value="' + label_select + '" class="btn btn-primary" /><br> ' + label_or + ' <br> ' + label_drag_and_drop_files_here + '</p>',
    });

    mediaDropzone.on("addedfile", function (file) {
        var i = 0;
        if (this.files.length) {
            var _i, _len;
            for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) {
                if (
                    this.files[_i].name === file.name &&
                    this.files[_i].size === file.size &&
                    this.files[_i].lastModifiedDate.toString() ===
                    file.lastModifiedDate.toString()
                ) {
                    this.removeFile(file);
                    i++;
                }
            }
        }
    });

    mediaDropzone.on("error", function (file, response) {
        console.log(response);
    });

    mediaDropzone.on("sending", function (file, xhr, formData) {
        var id = $("#media_type_id").val();
        formData.append("id", id);
    });

    mediaDropzone.on("queuecomplete", function () {
        $("#upload_media_btn").attr('disabled', false).text(label_upload);

        var lastFileResponse = mediaDropzone.files[mediaDropzone.files.length - 1].xhr.responseText;
        var response = JSON.parse(lastFileResponse);

        if (!response.error) {
            if ($('#add_media_modal').length) {
                $('#add_media_modal').modal('hide');
            }

            if ($('#project_media_table').length) {
                $('#project_media_table').bootstrapTable('refresh');
            }

            if ($('#task_media_table').length) {
                $('#task_media_table').bootstrapTable('refresh');
            }
            toastr.success(response.message);
        } else {
            toastr.error(response.message);
        }
        mediaDropzone.removeAllFiles();
    });

    $("#upload_media_btn").on("click", function (e) {
        e.preventDefault();
        if (mediaDropzone.getQueuedFiles().length > 0) {
            if (is_error == false) {
                $("#upload_media_btn").attr('disabled', true).text(label_please_wait);
                mediaDropzone.processQueue();
            }
        } else {
            toastr.error('No file(s) chosen.');
        }

    });
}

$(document).on('click', '.admin-login', function (e) {
    e.preventDefault();
    $('#email').val('admin@gmail.com');
    $('#password').val('123456');
});
$(document).on('click', '.member-login', function (e) {
    e.preventDefault();
    $('#email').val('member@gmail.com');
    $('#password').val('123456');
});
$(document).on('click', '.client-login', function (e) {
    e.preventDefault();
    $('#email').val('client@gmail.com');
    $('#password').val('123456');
});


// Row-wise Select/Deselect All
$('.row-permission-checkbox').change(function () {
    var module = $(this).data('module');
    var isChecked = $(this).prop('checked');
    $(`.permission-checkbox[data-module="${module}"]`).prop('checked', isChecked);
});

$('#selectAllColumnPermissions').change(function () {
    var isChecked = $(this).prop('checked');
    $('.permission-checkbox').prop('checked', isChecked);
    if (isChecked) {
        $('.row-permission-checkbox').prop('checked', true).trigger('change'); // Check all row permissions when select all is checked
    } else {
        $('.row-permission-checkbox').prop('checked', false).trigger('change'); // Uncheck all row permissions when select all is unchecked
    }
    checkAllPermissions(); // Check all permissions
});

// Select/Deselect All for Rows
$('#selectAllPermissions').change(function () {
    var isChecked = $(this).prop('checked');
    $('.row-permission-checkbox').prop('checked', isChecked).trigger('change');
});


// Function to check/uncheck all permissions for a module
function checkModulePermissions(module) {
    var allChecked = true;
    $('.permission-checkbox[data-module="' + module + '"]').each(function () {
        if (!$(this).prop('checked')) {
            allChecked = false;
        }
    });
    $('#selectRow' + module).prop('checked', allChecked);
}

// Function to check if all permissions are checked and select/deselect "Select all" checkbox
function checkAllPermissions() {
    var allPermissionsChecked = true;
    $('.permission-checkbox').each(function () {
        if (!$(this).prop('checked')) {
            allPermissionsChecked = false;
        }
    });
    $('#selectAllColumnPermissions').prop('checked', allPermissionsChecked);
}

// Event handler for individual permission checkboxes
$('.permission-checkbox').on('change', function () {
    var module = $(this).data('module');
    checkModulePermissions(module);
    checkAllPermissions();
});

// Event handler for "Select all" checkbox
$('#selectAllColumnPermissions').on('change', function () {
    var isChecked = $(this).prop('checked');
    $('.permission-checkbox').prop('checked', isChecked);
});

// Initial check for permissions on page load
$('.row-permission-checkbox').each(function () {
    var module = $(this).data('module');
    checkModulePermissions(module);
});
checkAllPermissions();




$(document).ready(function () {
    $('.fixed-table-toolbar').each(function () {
        var $toolbar = $(this);
        var $data_type = $toolbar.closest('.table-responsive').find('#data_type');
        var $data_table = $toolbar.closest('.table-responsive').find('#data_table');
        var $save_column_visibility = $toolbar.closest('.table-responsive').find('#save_column_visibility');


        if ($data_type.length > 0) {
            var data_type = $data_type.val();
            var data_table = $data_table.val() || 'table';
            // Create the "Delete selected" button
            var $deleteButton = $('<div class="columns columns-left btn-group float-left action_delete_' + data_type.replace('-', '_') + '">' +
                '<button type="button" class="btn btn-outline-danger float-left delete-selected" data-type="' + data_type + '" data-table="' + data_table + '">' +
                '<i class="bx bx-trash"></i> ' + label_delete_selected + '</button>' +
                '</div>');

            // Add the "Delete selected" button before the first element in the toolbar
            $toolbar.prepend($deleteButton);

            if (data_type == 'tasks') {
                // Create the "Clear Filters" button
                var $clearFiltersButton = $('<div class="columns columns-left btn-group float-left">' +
                    '<button type="button" class="btn btn-outline-secondary clear-filters">' +
                    '<i class="bx bx-x-circle"></i> ' + label_clear_filters + '</button>' +
                    '</div>');
                $deleteButton.after($clearFiltersButton);
            }
            if ($save_column_visibility.length > 0) {
                var $savePreferencesButton = $('<div class="columns columns-left btn-group float-left">' +
                    '<button type="button" class="btn btn-outline-primary save-column-visibility" data-type="' + data_type + '" data-table="' + data_table + '">' +
                    '<i class="bx bx-save"></i> ' + label_save_column_visibility + '</button>' +
                    '</div>');
                $deleteButton.after($savePreferencesButton);
            }
        }
    });
});



$('#media_storage_type').on('change', function (e) {
    if ($('#media_storage_type').val() == 's3') {
        $('.aws-s3-fields').removeClass('d-none');
    } else {
        $('.aws-s3-fields').addClass('d-none');
    }
});

$(document).on('click', '.edit-milestone', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/projects/get-milestone/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedStartDate = moment(response.ms.start_date).format(js_date_format);
            var formattedEndDate = moment(response.ms.end_date).format(js_date_format);
            $('#milestone_id').val(response.ms.id)
            $('#milestone_title').val(response.ms.title)
            $('#update_milestone_start_date').val(formattedStartDate)
            $('#update_milestone_end_date').val(formattedEndDate)
            $('#milestone_status').val(response.ms.status)
            $('#milestone_cost').val(response.ms.cost)
            var description = response.ms.description !== null ? response.ms.description : '';
            $('#edit_milestone_modal').find('#milestone_description').val(description);
            $('#milestone_progress').val(response.ms.progress)
            $('.milestone-progress').text(response.ms.progress + '%');
        },

    });
});


$(document).on('click', '#mark-all-notifications-as-read', function (e) {
    e.preventDefault();
    $('#mark_all_notifications_as_read_modal').modal('show'); // show the confirmation modal
    $('#mark_all_notifications_as_read_modal').on('click', '#confirmMarkAllAsRead', function () {
        $('#confirmMarkAllAsRead').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: '/notifications/mark-all-as-read',
            type: 'PUT',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            success: function (response) {
                location.reload();
                // $('#confirmMarkAllAsRead').html(label_yes).attr('disabled', false);
            }

        });
    });
});


$(document).on('click', '.update-notification-status', function (e) {
    var notificationId = $(this).data('id');
    var needConfirm = $(this).data('needconfirm') || false;
    if (needConfirm) {
        // Show the confirmation modal
        $('#update_notification_status_modal').modal('show');

        // Attach click event handler to the confirmation button
        $('#update_notification_status_modal').off('click', '#confirmNotificationStatus');
        $('#update_notification_status_modal').on('click', '#confirmNotificationStatus', function () {
            $('#confirmNotificationStatus').html(label_please_wait).attr('disabled', true);
            performUpdate(notificationId, needConfirm);
        });
    } else {
        // If confirmation is not needed, directly perform the update and handle response
        performUpdate(notificationId);
    }
});

function performUpdate(notificationId, needConfirm = '') {
    $.ajax({
        url: '/notifications/update-status',
        type: 'PUT',
        data: { id: notificationId, needConfirm: needConfirm },
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        success: function (response) {
            if (needConfirm) {
                $('#confirmNotificationStatus').html(label_yes).attr('disabled', false);
                if (response.error == false) {
                    toastr.success(response.message);
                    $('#table').bootstrapTable('refresh');
                    // Redirect after successful update
                } else {
                    toastr.error(response.message);
                }
                $('#update_notification_status_modal').modal('hide');
            } else {
                var redirectUrl = determineRedirectUrl(response.notification.type, response.notification.type_id);
                window.location.href = redirectUrl;
            }
        }
    });
}

function determineRedirectUrl(type, typeId) {
    var redirectUrl = '';
    switch (type) {
        case 'project':
            redirectUrl = '/projects/information/' + typeId;
            break;
        case 'task':
            redirectUrl = '/tasks/information/' + typeId;
            break;
        case 'workspace':
            redirectUrl = '/workspaces';
            break;
        case 'leave_request':
            redirectUrl = '/leave-requests';
            break;
        case 'meeting':
            redirectUrl = '/meetings';
            break;
        default:
            redirectUrl = '/';
    }
    return redirectUrl;
}
if (typeof manage_notifications !== 'undefined' && manage_notifications == 'true') {
    function updateUnreadNotifications() {
        // Make an AJAX request to fetch the count and HTML of unread notifications
        $.ajax({
            url: '/notifications/get-unread-notifications',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const unreadNotificationsCount = data.count;
                const unreadNotificationsHtml = data.html;

                $('#unreadNotificationsCount').text(unreadNotificationsCount);
                $('#unreadNotificationsCount').toggleClass('d-none', unreadNotificationsCount === 0);

                // Update the notifications list with the new HTML
                $('#unreadNotificationsContainer').html(unreadNotificationsHtml);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching unread notifications:', error);
            }
        });
    }

    // Call the updateUnreadNotifications function initially
    updateUnreadNotifications();

    // Update the unread notifications every 30 seconds
    setInterval(updateUnreadNotifications, 30000);
}


$('textarea#email_verify_email,textarea#email_account_creation,textarea#email_forgot_password,textarea#email_project_assignment,textarea#email_task_assignment,textarea#email_workspace_assignment,textarea#email_meeting_assignment,textarea#email_leave_request_creation,textarea#email_leave_request_status_updation,textarea#email_project_status_updation,textarea#email_task_status_updation,textarea#email_team_member_on_leave_alert').tinymce({
    height: 821,
    menubar: true,
    plugins: [
        'link', 'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons', 'code'
    ],
    toolbar: false
    // toolbar: 'link | undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | code blockquote emoticons table help'
});

// Handle click event on toolbar items
$('.tox-tbtn').click(function () {
    // Get the current editor instance
    var editor = tinyMCE.activeEditor;

    // Close any open toolbar dropdowns
    tinymce.ui.Factory.each(function (ctrl) {
        if (ctrl.type === 'toolbarbutton' && ctrl.settings.toolbar) {
            if (ctrl !== this && ctrl.settings.toolbar === 'toolbox') {
                ctrl.panel.hide();
            }
        }
    }, editor);

    // Execute the action associated with the clicked toolbar item
    editor.execCommand('mceInsertContent', false, 'Clicked!');
});


$(document).on('click', '.restore-default', function (e) {
    e.preventDefault();
    var form = $(this).closest('form');

    var type = form.find('input[name="type"]').val();
    var name = form.find('input[name="name"]').val();
    var textarea = type + '_' + name;

    $('#restore_default_modal').modal('show'); // show the confirmation modal
    $('#restore_default_modal').off('click', '#confirmRestoreDefault');
    $('#restore_default_modal').on('click', '#confirmRestoreDefault', function () {
        $('#confirmRestoreDefault').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: '/settings/get-default-template',
            type: 'POST',
            data: { type: type, name: name },
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            dataType: 'json',
            success: function (response) {
                $('#confirmRestoreDefault').html(label_yes).attr('disabled', false);
                $('#restore_default_modal').modal('hide');
                if (response.error == false) {
                    tinymce.get(textarea).setContent(response.content);
                    toastr.success(response.message);
                } else {
                    toastr.error(response.message);
                }
            }
        });
    });
});

$(document).on('click', '.sms-restore-default', function (e) {
    e.preventDefault();
    var form = $(this).closest('form');

    var type = form.find('input[name="type"]').val();
    var name = form.find('input[name="name"]').val();
    var textarea = type + '_' + name;

    $('#restore_default_modal').modal('show'); // show the confirmation modal
    $('#restore_default_modal').off('click', '#confirmRestoreDefault');
    $('#restore_default_modal').on('click', '#confirmRestoreDefault', function () {
        $('#confirmRestoreDefault').html(label_please_wait).attr('disabled', true);
        $.ajax({
            url: '/settings/get-default-template',
            type: 'POST',
            data: { type: type, name: name },
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            dataType: 'json',
            success: function (response) {
                $('#confirmRestoreDefault').html(label_yes).attr('disabled', false);
                $('#restore_default_modal').modal('hide');
                if (response.error == false) {
                    $('#' + textarea).val(response.content);
                    toastr.success(response.message);
                } else {
                    toastr.error(response.message);
                }
            }
        });
    });
});

$('.modal').on('hidden.bs.modal', function () {
    var modalId = $(this).attr('id');
    var $form = $(this).find('form'); // Find the form inside the modal
    $form.trigger('reset'); // Reset the form
    $form.find('.error-message').html('');
    var partialLeaveCheckbox = $('#partialLeave');
    if (partialLeaveCheckbox.length) {
        partialLeaveCheckbox.trigger('change');
    }
    var leaveVisibleToAllCheckbox = $form.find('.leaveVisibleToAll');
    if (leaveVisibleToAllCheckbox.length) {
        leaveVisibleToAllCheckbox.trigger('change');
    }
    var defaultColor = modalId == 'create_note_modal' || modalId == 'edit_note_modal' ? 'success' : 'primary';
    var colorSelect = $form.find('select[name="color"]');
    if (colorSelect.length) {
        var classes = colorSelect.attr('class').split(' ');
        var currentColorClass = classes.filter(function (className) {
            return className.startsWith('select-');
        })[0];
    }
    colorSelect.removeClass(currentColorClass).addClass('select-bg-label-' + defaultColor)
    $form.find('.js-example-basic-multiple').trigger('change');
    if ($('.selectTaskProject[name="project"]').length) {
        $form.find($('.selectTaskProject[name="project"]')).trigger('change');
    }
    if ($('.selectLruser[name="user_id"]').length) {
        $form.find($('.selectLruser[name="user_id"]')).trigger('change');
    }
    if ($('#users_associated_with_project').length) {
        $('#users_associated_with_project').text('');
    }
    if ($('#task_update_users_associated_with_project').length) {
        $('#task_update_users_associated_with_project').text('');
    }
    resetDateFields($form); // Pass the form as an argument to resetDateFields()
});

$(document).ready(function () {
    $('.selectTaskProject[name="project"]').on('change', function (e) {
        var projectId = $(this).val();
        if (projectId) {
            $.ajax({
                url: "/projects/get/" + projectId,
                type: 'GET',
                success: function (response) {
                    $('#users_associated_with_project').html('(' + label_users_associated_with_project + ' <strong>' + response.project.title + '</strong>)');
                    var usersSelect = $('.js-example-basic-multiple[name="user_id[]"]');
                    usersSelect.empty(); // Clear existing options
                    // Check if task_accessibility is 'project_users'
                    $.each(response.users, function (index, user) {
                        var option = $('<option>', {
                            value: user.id,
                            text: user.first_name + ' ' + user.last_name,
                        });
                        usersSelect.append(option);
                    });
                    if (response.project.task_accessibility == 'project_users') {
                        var taskUsers = response.users.map(user => user.id);
                        usersSelect.val(taskUsers);
                    } else {
                        usersSelect.val(authUserId);
                    }
                    usersSelect.trigger('change');
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }
    });
});


$(document).on('click', '.edit-task', function () {
    var id = $(this).data('id');
    $('#edit_task_modal').modal('show');
    $.ajax({
        url: "/tasks/get/" + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedStartDate = moment(response.task.start_date).format(js_date_format);
            var formattedEndDate = moment(response.task.end_date).format(js_date_format);
            $('#task_update_users_associated_with_project').html('(' + label_users_associated_with_project + ' <strong>' + response.project.title + '</strong>)');
            $('#id').val(response.task.id)
            $('#title').val(response.task.title)
            $('#project_status_id').val(response.task.status_id).trigger('change')
            $('#priority_id').val(response.task.priority_id ? response.task.priority_id : 0)
            $('#update_start_date').val(formattedStartDate);
            $('#update_end_date').val(formattedEndDate);
            initializeDateRangePicker('#update_start_date, #update_end_date');
            $('#update_project_title').val(response.project.title);
            var description = response.task.description !== null ? response.task.description : '';
            $('#edit_task_modal').find('#task_description').val(description);
            $('#taskNote').val(response.task.note);


            // Populate project users in the multi-select dropdown
            var usersSelect = $('#edit_task_modal').find('.js-example-basic-multiple[name="user_id[]"]');
            usersSelect.empty(); // Clear existing options
            $.each(response.project.users, function (index, user) {
                var option = $('<option>', {
                    value: user.id,
                    text: user.first_name + ' ' + user.last_name
                });

                usersSelect.append(option);
            });

            // Preselect task users if they exist
            var taskUsers = response.task.users.map(user => user.id);
            usersSelect.val(taskUsers);
            usersSelect.trigger('change'); // Trigger change event to update select2
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});

$(document).on('click', '.edit-project', function () {
    var id = $(this).data('id');
    $('#edit_project_modal').modal('show');
    $.ajax({
        url: "/projects/get/" + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedStartDate = moment(response.project.start_date).format(js_date_format);
            var formattedEndDate = moment(response.project.end_date).format(js_date_format);
            $('#project_id').val(response.project.id)
            $('#project_title').val(response.project.title)
            $('#project_status_id').val(response.project.status_id).trigger('change')
            $('#project_priority_id').val(response.project.priority_id ? response.project.priority_id : 0)
            $('#project_budget').val(response.project.budget)
            $('#update_start_date').val(formattedStartDate);
            $('#update_end_date').val(formattedEndDate);
            initializeDateRangePicker('#update_start_date, #update_end_date');
            $('#task_accessiblity').val(response.project.task_accessiblity);
            $('#projectNote').val(response.project.note);
            var description = response.project.description !== null ? response.project.description : '';
            $('#edit_project_modal').find('#project_description').val(description);

            // Populate project users in the multi-select dropdown
            var usersSelect = $('#edit_project_modal').find('.js-example-basic-multiple[name="user_id[]"]');

            // Preselect project users if they exist
            var projectUsers = response.users.map(user => user.id);
            usersSelect.val(projectUsers);
            usersSelect.trigger('change'); // Trigger change event to update select2


            var clientsSelect = $('#edit_project_modal').find('.js-example-basic-multiple[name="client_id[]"]');
            var projectClients = response.clients.map(client => client.id);
            clientsSelect.val(projectClients);
            clientsSelect.trigger('change'); // Trigger change event to update select2

            var tagsSelect = $('#edit_project_modal').find('[name="tag_ids[]"]');
            var projectTags = response.tags.map(tag => tag.id);
            // Select old tags
            tagsSelect.val(projectTags);
            // Trigger change event to update Select2
            tagsSelect.trigger('change.select2');

        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});

$(document).on('click', '.edit-priority', function () {
    var id = $(this).data('id');
    $('#edit_priority_modal').modal('show');
    var classes = $('#priority_color').attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    $.ajax({
        url: '/priority/get/' + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#priority_id').val(response.priority.id)
            $('#priority_title').val(response.priority.title)
            $('#priority_color').val(response.priority.color).removeClass(currentColorClass).addClass('select-bg-label-' + response.priority.color)
        },

    });
});

$(document).on('click', '.edit-workspace', function () {
    var id = $(this).data('id');
    $('#editWorkspaceModal').modal('show');
    $.ajax({
        url: "/workspaces/get/" + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            $('#workspace_id').val(response.workspace.id);
            $('#workspace_title').val(response.workspace.title);

            var usersSelect = $('#editWorkspaceModal').find('.js-example-basic-multiple[name="user_ids[]"]');
            var workspaceUsers = response.workspace.users.map(user => user.id);
            usersSelect.val(workspaceUsers);
            usersSelect.trigger('change'); // Trigger change event to update select2

            var clientsSelect = $('#editWorkspaceModal').find('.js-example-basic-multiple[name="client_ids[]"]');
            var workspaceClients = response.workspace.clients.map(client => client.id);
            clientsSelect.val(workspaceClients);
            clientsSelect.trigger('change'); // Trigger change event to update select2
            if(response.workspace.is_primary==1){
                $('#editWorkspaceModal').find('#updatePrimaryWorkspace').prop('checked', true).prop('disabled', true);
            }else{
                $('#editWorkspaceModal').find('#updatePrimaryWorkspace').prop('checked', false).prop('disabled', false);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});

$(document).on('click', '.edit-meeting', function () {
    var id = $(this).data('id');
    $('#editMeetingModal').modal('show');
    $.ajax({
        url: "/meetings/get/" + id,
        type: 'get',
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
        },
        dataType: 'json',
        success: function (response) {
            var formattedStartDate = moment(response.meeting.start_date).format(js_date_format);
            var formattedEndDate = moment(response.meeting.end_date).format(js_date_format);
            var startDateInput = $('#editMeetingModal').find('[name="start_date"]');
            var endDateInput = $('#editMeetingModal').find('[name="end_date"]');
            $('#meeting_id').val(response.meeting.id);
            $('#meeting_title').val(response.meeting.title);
            startDateInput.val(formattedStartDate);
            endDateInput.val(formattedEndDate);
            $('#meeting_start_time').val(response.meeting.start_time);
            $('#meeting_end_time').val(response.meeting.end_time);

            var usersSelect = $('#editMeetingModal').find('.js-example-basic-multiple[name="user_ids[]"]');
            var meetingUsers = response.meeting.users.map(user => user.id);
            usersSelect.val(meetingUsers);
            usersSelect.trigger('change'); // Trigger change event to update select2

            var clientsSelect = $('#editMeetingModal').find('.js-example-basic-multiple[name="client_ids[]"]');
            var meetingClients = response.meeting.clients.map(client => client.id);
            clientsSelect.val(meetingClients);
            clientsSelect.trigger('change'); // Trigger change event to update select2
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});


$(document).on('change', '#statusSelect', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var statusId = this.value;
    var type = $(this).data('type') || 'project';
    var reload = $(this).data('reload') || false;
    var select = $(this);
    var originalStatusId = $(this).data('original-status-id');
    var originalColorClass = $(this).data('original-color-class');
    var classes = $(this).attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    var selectedOption = $(this).find('option:selected');
    var selectedOptionClasses = selectedOption.attr('class').split(' ');
    var newColorClass = 'select-' + selectedOptionClasses[1];
    select.removeClass(currentColorClass).addClass(newColorClass);
    $.ajax({
        url: '/' + type + 's/get/' + id,
        type: 'GET',
        success: function (response) {
            if (response.error == false) {
                $('#confirmUpdateStatusModal').modal('show'); // show the confirmation modal
                $('#confirmUpdateStatusModal').off('click', '#confirmUpdateStatus');
                if (type == 'task' && response.task) {
                    $('#statusNote').val(response.task.note);
                    originalStatusId = response.task.status_id;
                } else if (type == 'project' && response.project) {
                    $('#statusNote').val(response.project.note);
                    originalStatusId = response.project.status_id;
                }
                $('#confirmUpdateStatusModal').on('click', '#confirmUpdateStatus', function (e) {
                    $('#confirmUpdateStatus').html(label_please_wait).attr('disabled', true);
                    // Send AJAX request to update status
                    $.ajax({
                        type: 'POST',
                        url: '/update-' + type + '-status',
                        headers: {
                            'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
                        },
                        data: {
                            id: id,
                            statusId: statusId,
                            note: $('#statusNote').val()
                        },
                        success: function (response) {
                            $('#confirmUpdateStatus').html(label_yes).attr('disabled', false);
                            if (response.error == false) {
                                setTimeout(function () {
                                    if (reload) {
                                        window.location.reload(); // Reload the current page
                                    }
                                }, 3000);
                                $('#confirmUpdateStatusModal').modal('hide');
                                var tableSelector = type == 'project' ? 'projects_table' : 'task_table';
                                var $table = $('#' + tableSelector);

                                if ($table.length) {
                                    $table.bootstrapTable('refresh');
                                }
                                toastr.success(response.message);
                            } else {
                                select.removeClass(newColorClass).addClass(originalColorClass);
                                select.val(originalStatusId);
                                toastr.error(response.message);
                            }
                        },
                        error: function (xhr, status, error) {
                            $('#confirmUpdateStatus').html(label_yes).attr('disabled', false);
                            // Handle error
                            select.removeClass(newColorClass).addClass(originalColorClass);
                            select.val(originalStatusId);
                            toastr.error('Something Went Wrong');
                        }
                    });
                });
            } else {
                $('#confirmUpdateStatus').html(label_yes).attr('disabled', false);
                select.val(originalStatusId);
                toastr.error(response.message);
            }
        },
        error: function (xhr, status, error) {
            // Handle error
            toastr.error('Something Went Wrong');
        }
    });
    // Handle modal close event
    $('#confirmUpdateStatusModal').off('click', '.btn-close, #declineUpdateStatus');
    $('#confirmUpdateStatusModal').on('click', '.btn-close, #declineUpdateStatus', function (e) {
        // Set original status when modal is closed without confirmation
        select.val(originalStatusId);
        select.removeClass(newColorClass).addClass(originalColorClass);
    });
});

$(document).on('change', '#prioritySelect', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var priorityId = this.value;
    var type = $(this).data('type') || 'project';
    var reload = $(this).data('reload') || false;
    var select = $(this);
    var originalPriorityId = $(this).data('original-priority-id') || 0;
    var originalColorClass = $(this).data('original-color-class');
    var classes = $(this).attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    var selectedOption = $(this).find('option:selected');
    var selectedOptionClasses = selectedOption.attr('class').split(' ');
    var newColorClass = 'select-' + selectedOptionClasses[1];
    select.removeClass(currentColorClass).addClass(newColorClass);

    $('#confirmUpdatePriorityModal').modal('show'); // show the confirmation modal
    $('#confirmUpdatePriorityModal').off('click', '#confirmUpdatePriority');

    $('#confirmUpdatePriorityModal').on('click', '#confirmUpdatePriority', function (e) {
        $('#confirmUpdatePriority').html(label_please_wait).attr('disabled', true);
        $.ajax({
            type: 'POST',
            url: '/update-' + type + '-priority',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            data: {
                id: id,
                priorityId: priorityId
            },
            success: function (response) {
                $('#confirmUpdatePriority').html(label_yes).attr('disabled', false);
                if (response.error == false) {
                    setTimeout(function () {
                        if (reload) {
                            window.location.reload(); // Reload the current page
                        }
                    }, 3000);
                    $('#confirmUpdatePriorityModal').modal('hide');
                    toastr.success(response.message);

                    var tableSelector = type == 'project' ? 'projects_table' : 'task_table';
                    var $table = $('#' + tableSelector);

                    if ($table.length) {
                        $table.bootstrapTable('refresh');
                    }

                } else {
                    select.removeClass(newColorClass).addClass(originalColorClass);
                    select.val(originalPriorityId);
                    toastr.error(response.message);
                }
            },
            error: function (xhr, status, error) {
                $('#confirmUpdatePriority').html(label_yes).attr('disabled', false);
                // Handle error
                select.removeClass(newColorClass).addClass(originalColorClass);
                select.val(originalPriorityId);
                toastr.error('Something Went Wrong');
            }
        });
    });
    // Handle modal close event
    $('#confirmUpdatePriorityModal').off('click', '.btn-close, #declineUpdatePriority');
    $('#confirmUpdatePriorityModal').on('click', '.btn-close, #declineUpdatePriority', function (e) {
        // Set original priority when modal is closed without confirmation
        select.val(originalPriorityId);
        select.removeClass(newColorClass).addClass(originalColorClass);
    });
});


$(document).on('click', '.quick-view', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var type = $(this).data('type') || 'task';
    $('#type').val(type);
    $('#typeId').val(id);
    $.ajax({
        url: '/' + type + 's/get/' + id,
        type: 'GET',
        success: function (response) {
            if (response.error == false) {
                $('#quickViewModal').modal('show');
                if (type == 'task' && response.task) {
                    $('#quickViewTitlePlaceholder').text(response.task.title);
                    $('#quickViewDescPlaceholder').html(response.task.description);
                } else if (type == 'project' && response.project) {
                    $('#quickViewTitlePlaceholder').text(response.project.title);
                    $('#quickViewDescPlaceholder').html(response.project.description);
                }
                $('#typePlaceholder').text(type == 'task' ? label_task : label_project);
                $('#usersTable').bootstrapTable('refresh');
                $('#clientsTable').bootstrapTable('refresh');

            } else {
                toastr.error(response.message);
            }
        },
        error: function (xhr, status, error) {
            // Handle error
            toastr.error('Something Went Wrong');
        }
    });

});

$('#partialLeave, #updatePartialLeave').on('change', function () {
    var $form = $(this).closest('form'); // Get the closest form element
    var isChecked = $(this).prop('checked');
    if (isChecked) {
        // If the checkbox is checked
        $form.find('.leave-from-date-div').removeClass('col-5').addClass('col-3');
        $form.find('.leave-to-date-div').removeClass('col-5').addClass('col-3');
        $form.find('.leave-from-time-div, .leave-to-time-div').removeClass('d-none');
    } else {
        // If the checkbox is unchecked, revert the changes
        $form.find('input[name="from_time"]').val('');
        $form.find('input[name="to_time"]').val('');
        $form.find('.leave-from-date-div').removeClass('col-3').addClass('col-5');
        $form.find('.leave-to-date-div').removeClass('col-3').addClass('col-5');
        $form.find('.leave-from-time-div, .leave-to-time-div').addClass('d-none');
    }
});

$('.leaveVisibleToAll').on('change', function () {
    var $form = $(this).closest('form'); // Get the closest form element
    var isChecked = $(this).prop('checked');
    if (isChecked) {
        // If the checkbox is checked
        $form.find('.leaveVisibleToDiv').addClass('d-none');
        var visibleToSelect = $form.find('.js-example-basic-multiple[name="visible_to_ids[]"]');
        visibleToSelect.val(null).trigger('change');
    } else {
        // If the checkbox is unchecked, revert the changes
        $form.find('.leaveVisibleToDiv').removeClass('d-none');
    }
});
$(document).ready(function () {
    var upcomingBDCalendarInitialized = false;
    var upcomingWACalendarInitialized = false;
    var membersOnLeaveCalendarInitialized = false;

    // Add event listener for tab shown event
    $('.nav-tabs .nav-item').on('shown.bs.tab', function (event) {
        var tabId = $(event.target).attr('data-bs-target');

        if (tabId == '#navs-top-upcoming-birthdays-calendar' && !upcomingBDCalendarInitialized) {
            initializeUpcomingBDCalendar();
            upcomingBDCalendarInitialized = true;
        } else if (tabId == '#navs-top-upcoming-work-anniversaries-calendar' && !upcomingWACalendarInitialized) {
            initializeUpcomingWACalendar();
            upcomingWACalendarInitialized = true;
        } else if (tabId == '#navs-top-members-on-leave-calendar' && !membersOnLeaveCalendarInitialized) {
            initializeMembersOnLeaveCalendar();
            membersOnLeaveCalendarInitialized = true;
        }
    });
});

function initializeUpcomingBDCalendar() {
    var upcomingBDCalendar = document.getElementById('upcomingBirthdaysCalendar');

    // Check if the calendar element exists
    if (upcomingBDCalendar) {
        var BDcalendar = new FullCalendar.Calendar(upcomingBDCalendar, {
            plugins: ['interaction', 'dayGrid', 'list'],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listYear'
            },
            editable: true,
            events: function (fetchInfo, successCallback, failureCallback) {
                // Make AJAX request to fetch dynamic data
                $.ajax({
                    url: '/home/upcoming-birthdays-calendar',
                    type: 'GET',
                    success: function (response) {
                        // Parse and format dynamic data for FullCalendar
                        var events = response.map(function (event) {
                            return {
                                title: event.title,
                                start: event.start,
                                end: event.start,
                                backgroundColor: event.backgroundColor,
                                borderColor: event.borderColor,
                                textColor: event.textColor,
                                userId: event.userId
                            };
                        });

                        // Invoke success callback with dynamic data
                        successCallback(events);
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                        // Invoke failure callback if there's an error
                        failureCallback(error);
                    }
                });
            },
            eventClick: function (info) {
                if (info.event.extendedProps && info.event.extendedProps.userId) {
                    var userId = info.event.extendedProps.userId;
                    var url = '/users/profile/' + userId;
                    window.open(url, '_blank'); // Open in a new tab
                }
            }
        });
        BDcalendar.render();
    }
}
function initializeUpcomingWACalendar() {
    var upcomingWACalendar = document.getElementById('upcomingWorkAnniversariesCalendar');
    // Check if the calendar element exists
    if (upcomingWACalendar) {
        var WAcalendar = new FullCalendar.Calendar(upcomingWACalendar, {
            plugins: ['interaction', 'dayGrid', 'list'],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listYear'
            },
            editable: true,
            height: 'auto',
            events: function (fetchInfo, successCallback, failureCallback) {
                // Make AJAX request to fetch dynamic data
                $.ajax({
                    url: '/home/upcoming-work-anniversaries-calendar',
                    type: 'GET',
                    success: function (response) {
                        // Parse and format dynamic data for FullCalendar
                        var events = response.map(function (event) {
                            return {
                                title: event.title,
                                start: event.start,
                                end: event.start,
                                backgroundColor: event.backgroundColor,
                                borderColor: event.borderColor,
                                textColor: event.textColor,
                                userId: event.userId
                            };
                        });

                        // Invoke success callback with dynamic data
                        successCallback(events);
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                        // Invoke failure callback if there's an error
                        failureCallback(error);
                    }
                });
            },
            eventClick: function (info) {
                if (info.event.extendedProps && info.event.extendedProps.userId) {
                    var userId = info.event.extendedProps.userId;
                    var url = '/users/profile/' + userId;
                    window.open(url, '_blank'); // Open in a new tab
                }
            }
        });
        WAcalendar.render();
    }
}

function initializeMembersOnLeaveCalendar() {
    var membersOnLeaveCalendar = document.getElementById('membersOnLeaveCalendar');
    // Check if the calendar element exists
    if (membersOnLeaveCalendar) {
        var MOLcalendar = new FullCalendar.Calendar(membersOnLeaveCalendar, {
            plugins: ['interaction', 'dayGrid', 'list'],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listYear'
            },
            editable: true,
            displayEventTime: true,
            events: function (fetchInfo, successCallback, failureCallback) {
                // Make AJAX request to fetch dynamic data
                $.ajax({
                    url: '/home/members-on-leave-calendar',
                    type: 'GET',
                    success: function (response) {
                        // Parse and format dynamic data for FullCalendar
                        var events = response.map(function (event) {
                            var eventData = {
                                title: event.title,
                                start: event.start,
                                end: moment(event.end).add(1, 'days').format('YYYY-MM-DD'),
                                backgroundColor: event.backgroundColor,
                                borderColor: event.borderColor,
                                textColor: event.textColor,
                                userId: event.userId
                            };

                            // Check if the event is partial and has start and end times
                            if (event.startTime && event.endTime) {
                                // Include start and end times directly in the event data
                                eventData.extendedProps = {
                                    startTime: event.startTime,
                                    endTime: event.endTime
                                };
                            }
                            return eventData;
                        });

                        // Invoke success callback with dynamic data
                        successCallback(events);
                    },

                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                        // Invoke failure callback if there's an error
                        failureCallback(error);
                    }
                });
            },
            eventClick: function (info) {
                if (info.event.extendedProps && info.event.extendedProps.userId) {
                    var userId = info.event.extendedProps.userId;
                    var url = '/users/profile/' + userId;
                    window.open(url, '_blank'); // Open in a new tab
                }
            }
        });
        MOLcalendar.render();
    }
}

// Preprocess permissions to avoid redundant checks
var permissionSet = new Set(permissions);

$(document).ready(function () {
    // Loop through classes starting with 'action-'
    $('[class*="action_"]').each(function () {
        // Extract the part of class name after "action-"
        var className = $(this).attr('class');
        var permission = className.substring(className.indexOf("action_") + "action_".length);
        // console.log(permission);
        // Check if the user is not an admin and if the permission does not exist
        if ((typeof isAdmin == 'undefined' || !isAdmin) && !permissionSet.has(permission)) {
            $(this).addClass('d-none');
        }
    });
});

$(document).on('click', '.save-column-visibility', function (e) {
    e.preventDefault();
    var tableName = $(this).data('table');
    var type = $(this).data('type');
    type = type.replace('-', '_');
    $('#confirmSaveColumnVisibility').modal('show');
    $('#confirmSaveColumnVisibility').off('click', '#confirm');
    $('#confirmSaveColumnVisibility').on('click', '#confirm', function () {
        $('#confirmSaveColumnVisibility').find('#confirm').html(label_please_wait).attr('disabled', true);
        var visibleColumns = [];
        $('#' + tableName).bootstrapTable('getVisibleColumns').forEach(column => {
            if (!column.checkbox) {
                visibleColumns.push(column.field);
            }
        });

        // Send preferences to the server
        $.ajax({
            url: '/save-column-visibility',
            type: 'POST',
            data: {
                type: type,
                visible_columns: JSON.stringify(visibleColumns)
            },
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
            },
            success: function (response) {
                $('#confirmSaveColumnVisibility').find('#confirm').html(label_yes).attr('disabled', false);
                if (response.error == false) {
                    $('#confirmSaveColumnVisibility').modal('hide');
                    toastr.success(response.message);
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (data) {
                $('#confirmSaveColumnVisibility').find('#confirm').html(label_yes).attr('disabled', false);
                $('#confirmSaveColumnVisibility').modal('hide');
                toastr.error(label_something_went_wrong);
            }
        });
    });
});

$(document).on('click', '.viewAssigned', function (e) {
    e.preventDefault();
    var projectsUrl = '/projects/listing';
    var tasksUrl = '/tasks/list';
    var id = $(this).data('id');
    var type = $(this).data('type');
    var user = $(this).data('user');
    projectsUrl = projectsUrl + (id ? '/' + id : '');
    tasksUrl = tasksUrl + (id ? '/' + id : '');
    $('#viewAssignedModal').modal('show');
    var projectsTable = $('#viewAssignedModal').find('#projects_table');
    var tasksTable = $('#viewAssignedModal').find('#task_table');
    if (type === 'tasks') {
        $('.nav-link[data-bs-target="#navs-top-view-assigned-tasks"]').tab('show');
        $('.nav-link[data-bs-target="#navs-top-view-assigned-projects"]').removeClass('active');
        $('#navs-top-view-assigned-projects').removeClass('show active');
        $('#navs-top-view-assigned-tasks').addClass('show active');
    } else {
        $('.nav-link[data-bs-target="#navs-top-view-assigned-projects"]').tab('show');
        $('.nav-link[data-bs-target="#navs-top-view-assigned-tasks"]').removeClass('active');
        $('#navs-top-view-assigned-tasks').removeClass('show active');
        $('#navs-top-view-assigned-projects').addClass('show active');
    }
    $('#userPlaceholder').text(user);

    $(projectsTable).bootstrapTable('refresh', {
        url: projectsUrl
    });
    $(tasksTable).bootstrapTable('refresh', {
        url: tasksUrl
    });

});

$(document).on('click', '.openCreateStatusModal', function (e) {
    e.preventDefault();
    $('#create_status_modal').modal('show');
});

$(document).on('click', '.openCreatePriorityModal', function (e) {
    e.preventDefault();
    $('#create_priority_modal').modal('show');
});

$(document).on('click', '.openCreateTagModal', function (e) {
    e.preventDefault();
    $('#create_tag_modal').modal('show');
});

$(document).on('click', '.openCreateContractTypeModal', function (e) {
    e.preventDefault();
    $('#create_contract_type_modal').modal('show');
});

$(document).on('click', '.openCreatePmModal', function (e) {
    e.preventDefault();
    $('#create_pm_modal').modal('show');
});

$(document).on('click', '.openCreateAllowanceModal', function (e) {
    e.preventDefault();
    $('#create_allowance_modal').modal('show');
});

$(document).on('click', '.openCreateDeductionModal', function (e) {
    e.preventDefault();
    $('#create_deduction_modal').modal('show');
});

$(document).ready(function () {
    function formatTag(tag) {
        if (!tag.id) {
            return tag.text;
        }
        var color = $(tag.element).data('color');
        var $tag = $('<span class="badge bg-label-' + color + '">' + tag.text + '</span>');
        return $tag;
    }

    function formatStatus(status) {
        if (!status.id) {
            return status.text;
        }
        var color = $(status.element).data('color');
        var $status = $('<span class="badge bg-label-' + color + '">' + status.text + '</span>');
        return $status;
    }

    $('.tagsDropdown').select2({
        templateResult: formatTag,
        templateSelection: formatTag,
        escapeMarkup: function (markup) {
            return markup;
        }
    });

    $('.statusDropdown').each(function () {
        var $this = $(this);
        $this.select2({
            dropdownParent: $this.closest('.modal'),
            templateResult: formatStatus,
            templateSelection: formatStatus,
            escapeMarkup: function (markup) {
                return markup;
            }
        });
    });

    $('.selectTaskProject,.selectLruser').each(function () {
        var $this = $(this);
        $this.select2({
            dropdownParent: $this.closest('.modal')
        });
    });
});
$(document).on('change', 'select[name="color"]', function (e) {
    e.preventDefault();
    var select = $(this);
    var classes = $(this).attr('class').split(' ');
    var currentColorClass = classes.filter(function (className) {
        return className.startsWith('select-');
    })[0];
    var selectedOption = $(this).find('option:selected');
    var selectedOptionClasses = selectedOption.attr('class').split(' ');
    var newColorClass = 'select-' + selectedOptionClasses[1];
    select.removeClass(currentColorClass).addClass(newColorClass);
});
function toggleChatIframe() {
    var iframeContainer = document.getElementById("chatIframeContainer");
    if (iframeContainer.style.display === "none" || iframeContainer.style.display === "") {
        iframeContainer.style.display = "block";
    } else {
        iframeContainer.style.display = "none";
    }
}

$(document).ready(function () {
    if ($('#selectAllPreferences').length) {
        // Check initial state of checkboxes and update selectAllPreferences checkbox
        updateSelectAll();

        // Select/deselect all checkboxes when the selectAllPreferences checkbox is clicked
        $('#selectAllPreferences').click(function () {
            var isChecked = $(this).prop('checked');
            $('input[name="enabled_notifications[]"]:not(:disabled)').prop('checked', isChecked);
        });

        // Update the selectAllPreferences checkbox state based on the checkboxes' status
        $('input[name="enabled_notifications[]"]').change(function () {
            updateSelectAll();
        });

        // Function to update selectAllPreferences checkbox based on checkboxes' status
        function updateSelectAll() {
            var allChecked = $('input[name="enabled_notifications[]"]:not(:disabled)').length === $('input[name="enabled_notifications[]"]:not(:disabled):checked').length;
            $('#selectAllPreferences').prop('checked', allChecked);
        }
    }
});

$(window).on('load', function () {

    // Select the elements and replace the text
    $('.pagination-info').each(function () {
        var text = $(this).text();
        text = text.replace("Showing", label_showing)
            .replace("to", label_to_for_pagination)
            .replace("of", label_of)
            .replace("rows", label_rows);
        $(this).text(text);
    });

    $('.page-list').each(function () {
        var text = $(this).html();
        text = text.replace("rows per page", label_rows_per_page);
        $(this).html(text);
    });
});

$('#internal_client').change(function () {
    var isChecked = $(this).prop('checked');

    $('#password, #password_confirmation').val('');
    $('#passDiv, #confirmPassDiv, #statusDiv, #requireEvDiv').toggleClass('d-none', isChecked);

    $('#client_deactive').prop('checked', true);
    $('#require_ev_' + (isChecked ? 'no' : 'yes')).prop('checked', true);

    $('#password').next('.error-message').remove();
    $('#password_confirmation').next('.error-message').remove();
});

$('#update_internal_client').change(function () {
    var isChecked = $(this).prop('checked');

    $('#password, #password_confirmation').val('');
    $('#passDiv, #confirmPassDiv, #statusDiv, #requireEvDiv').toggleClass('d-none', isChecked);

    // Remove .error-message elements next to #password and #password_confirmation
    $('#password').next('.error-message').remove();
    $('#password_confirmation').next('.error-message').remove();
});