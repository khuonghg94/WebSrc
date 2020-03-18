
/*
 Written by Mopicus
 Posted on mopicus.com
 */

(function ($)
{
    //global properties, depending on current language
//    var MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MonthNames = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    var FirstDayOfWeek = 0;

    //leverage jQuery plugin mechanism
    $.fn.mopCalendar = function (idName)
    {
        return this.each(function ()
        {
            var $this = $(this);
            var selectedDate = null;
            selectedDate = new Date();

            var selectedMonth = null;
            selectedMonth = selectedDate.getMonth();

            var selectedYear = null;
            selectedYear = selectedDate.getFullYear();

            //alert(selectedDate + " " + selectedMonth + " " + selectedYear + " " + idName);

            var getValue = function ()
            {
                return selectedDate;

//                //Sun Jun 24 2012 00:00:00 GMT+0700 (SE Asia Standard Time) date
//                var temp = selectedDate.toDateString(); // <=> Sun Jun 24 2012
//                var date = temp.split(" ");
//
//                var mnths = {
//                    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
//                    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
//                };
//
//                //var b = "1+2=3".split(/[+=]/) // Delimiter is a regular expression
//                //for (var i = 0; i < b.length; i++)
//                //{alert(b[i])}
//                
//                //alert(selectedDate +" "+ selectedDate.toDateString());
//                //alert([date[2], mnths[date[1]], date[3]].join("/"));
//                if (idName !== "")
//                    document.getElementById(idName).value = [date[2], mnths[date[1]], date[3]].join("/");
            };

            var setValue = function (date)
            {
                if (date === null)
                {
                    selectedDate = null;
                    return;
                } else {

                    //alert("setValue 1 : " + date.getFullYear() + " " + date.getMonth() + " " + date.getDate());

                    selectedDate = null;
                    selectedMonth = null;
                    selectedYear = null;

                    selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                    //alert("setValue 2 : " + selectedDate);

                    selectedMonth = getMonth();
                    selectedYear = getYear();

                    refreshMonthTitle();
                    refreshDayTable();
                }
            };

            var getDay = function ()
            {
                return selectedDate.getDate();
            };

            var getWeekDay = function ()
            {
                return selectedDate.getDay();
            };

            var getMonth = function ()
            {
                return selectedDate.getMonth();
            };

            var getYear = function ()
            {
                return selectedDate.getFullYear();
            };

            var setSelectedMonth = function (monthNum)
            {
                if (monthNum === -1 && selectedMonth === 0)
                {
                    selectedYear--;
                    selectedMonth = 11;
                } else if (monthNum === 12 && selectedMonth === 11)
                {
                    selectedYear++;
                    selectedMonth = 0;
                } else if (monthNum >= 0 && monthNum <= 11)
                    selectedMonth = monthNum;
                else
                    return;

                refreshMonthTitle();
                refreshDayTable();
            };

            var setSelectedYear = function (yearNum)
            {
                selectedYear = yearNum;
                refreshMonthTitle();
                refreshDayTable();
            };

            var getContentTable = function () {
                return $this.find('table');
            };

            var refreshMonthTitle = function ()
            {
                var monthTitle = $('.mopCalendarMonth').text(MonthNames[selectedMonth] + ', ' + selectedYear);
            };

            var refreshDayTable = function () {
                var table = null;
                table = getContentTable();

                var month = selectedMonth;
                var year = selectedYear;
                var day_ = selectedDate;

                var startd = new Date(year, month, 1);
                var d1 = FirstDayOfWeek;
                var d2 = startd.getDay();
                var diff = d1 < d2 ? d2 - d1 : d1 + 7;
                startd.setDate(startd.getDate() - diff);

                for (var j = 1; j < 7; j++) {
                    var row = table[0].rows[j];
                    for (var i = 0; i < 7; i++) {
                        var dy = 0;
                        var wd = 0;
                        var md = 0;

                        dy = startd.getDate();
                        wd = startd.getDay();
                        md = startd.getMonth();

                        var cell = $(row.cells[i]).text(dy);
                        cell.removeClass();

                        if (startd.valueOf() === day_.valueOf())
                            cell.addClass('mopCalendarDaySelected');
                        else if (md !== month)
                            cell.addClass('mopCalendarDayOdd');
                        else if (wd === 0 || wd === 6)
                            cell.addClass('mopCalendarDayRed');

                        dy++;
                        startd.setDate(dy);
                    }
                }
            };

            var onHeaderClick = function (e)
            {
                if (e.target)
                {
                    var target = $(e.target);
                    if (target.hasClass('mopCalendarBtnFirst'))
                        setSelectedYear(selectedYear - 1);
                    else if (target.hasClass('mopCalendarBtnPrevious'))
                        setSelectedMonth(selectedMonth - 1);
                    else if (target.hasClass('mopCalendarBtnNext'))
                        setSelectedMonth(selectedMonth + 1);
                    else if (target.hasClass('mopCalendarBtnLast'))
                        setSelectedYear(selectedYear + 1);
                }
                return false;
            };

            var onBodyClick = function (e)
            {
                var rowIndex = null;
                var month = null;
                var year = null;
                var day = null;

                if (e.target && e.target.tagName === 'TD' && idName !== "")
                {
                    rowIndex = e.target.parentElement.rowIndex;
                    month = selectedMonth;
                    year = selectedYear;
                    day = parseInt($(e.target).text());

                    if (rowIndex <= 1 && day >= 20)
                        month--;
                    else if (rowIndex >= 5 && day <= 15)
                        month++;

                    setValue(new Date(year, month, day));

                    //alert("L2 : " + rowIndex + " " + day + " " + selectedMonth + " " + selectedYear + " " + selectedMonth);
                    //Sun Jun 24 2012 00:00:00 GMT+0700 (SE Asia Standard Time) date
                    var temp = selectedDate.toDateString(); // <=> Sun Jun 24 2012
                    var date = temp.split(" ");

                    var mnths = {
                        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
                        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
                    };

                    //var b = "1+2=3".split(/[+=]/) // Delimiter is a regular expression
                    //for (var i = 0; i < b.length; i++)
                    //{alert(b[i])}

                    //alert(selectedDate +" "+ selectedDate.toDateString());
                    //alert("setValue 3 : " + [date[2], mnths[date[1]], date[3]].join("/"));

                    //14.12.2015
                    var tempType = document.getElementById(idName);
//                    alert(tempType.tagName + " sol " + tempType.name + " sol " + tempType.target);
//                    tempType = tempType.tagName.toString();
//                    tempType = tempType.toLowerCase();

                    tempType = tempType.type //alert(tempType);
                    if (tempType.localeCompare("undefined") === 0) // Label
                        document.getElementById(idName).innerHTML = [date[2], mnths[date[1]], date[3]].join("/");
                    else
                        document.getElementById(idName).value = [date[2], mnths[date[1]], date[3]].join("/");

                    idName = "";
                    $this.hide();
                }
            };

            var onFooterClick = function (e)
            {
                if (e.target && e.target.tagName == 'BUTTON')
                {
                    var $target = $(e.target);
                    if ($target.hasClass('mopCalendarBtnToday'))
                        setValue(new Date());
                    else if ($target.hasClass('mopCalendarClose'))
                    {
                        idName = "";
                        $this.hide();
                    }
                }
                return false;
            };

            //attach click events to the different section
            $('.mopCalendarHeader').on('click', onHeaderClick);
            $('.mopCalendarBody').on('click', onBodyClick);
            //$('.mopCalendarBody').on('dblclick', ondblclick);
            $('.mopCalendarFooter').on('click', onFooterClick);

            //disable drag
            $this.on('selectstart dragstart', function (e) {
                e.preventDefault();
            });

            //public method call
            this.setValue = (function (value) {
                //alert("public method call : " + value);
                setValue(value);
            })(selectedDate);

        });
    };
}(jQuery));


