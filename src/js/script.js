// slider elements
var images = ["image/layers1.svg", "image/layers2.svg", "image/layers3.svg"]
var headerSlider = ["Şirkət strukturu", "Əməkdaşlar", "İş rejimi"]
var sliderText = [
    "Şirkət strukturu dummy text of the printing typesetting industry. Lorem Ipsum hasbeen the industry standard dummy text ever 1500s, when unknown access to admin.",
    "Əməkdaşlar is simply dummy text of the printing typesetting industry. Lorem Ipsum hasbeen the industry standard dummy text ever 1500s, when unknown access to admin.",
    "İş rejimi is simply dummy text of the printing typesetting industry. Lorem Ipsum hasbeen the industry standard dummy text ever 1500s, when unknown access to admin."
]
// $(document).ready(function () {  }

//pass next page buttons which  1,2,3 
$(".pageButon").click(function () {
    var indexPage = $(".pageButon").index($(this));
    passPage(indexPage);
})
//pass next page buttons which  "novbeti sehife"
$("#right1Next,#right3Prev").click(function () {
    passPage(1);
});
$("#right2Prev").click(function () {
    passPage(0);
});
$("#right2Next").click(function () {
    passPage(2);
});
//   pass next page function
function passPage(count) {
    $(".pageButon").removeClass("activePageButton")
    $(".pageButon")[count].classList.add("activePageButton");
    $(".right").css("display", "none");            //all section none
    $(".right")[count].style.display = "block";               //block secton which index = clicked button index
    $("#logo").attr('src', images[count]);           //image change   
    $("#headerSlider").text(headerSlider[count]);
    $("#textSlider").text(sliderText[count]);
    $(".slide_button div").removeClass("activeSlide");
    $(".slide_button div")[count].classList.add("activeSlide");
}
//    end  pass next page functoion

// ***slider 
$(".slide_button div").click(function () {
    var slide_index = $(".slide_button div").index($(this));
    $(".slide_button div").removeClass("activeSlide");
    $(this).addClass("activeSlide");
    $("#logo").attr('src', images[slide_index]);
    $("#headerSlider").text(headerSlider[slide_index]);
    $("#textSlider").text(sliderText[slide_index]);
})
// end slider 

//-----------------------------------   page 1   -------------------------
$("#js_addButtonDep").click(function () {
    addFunc($("#newDep"), $("#tableDepartment tbody"));
    tdSort($("#tableDepartment tr td:first-child"));
    commonAddClick($("#tableDepartment tr:last-child td .js_editButton"),
        $("#tableDepartment tr:last-child td .js_deleteButton"),
        $("#tableDepartment tr td:first-child"));
});

//-----------------------------------   page 2   -------------------------
// all edit and delete button click func
commonAddClick($(".js_editButton"), $(".js_deleteButton"), $("#tablePerson tr td:first-child"));

//add button click function
$("#js_addButton").click(function () {
    addFunc($("#newPerson"), $("#tablePerson tbody"));
    tdSort($("#tablePerson tr td:first-child"));
    commonAddClick($("#tablePerson tr:last-child td .js_editButton"),
        $("#tablePerson tr:last-child td .js_deleteButton"),
        $("#tablePerson tr td:first-child"));
});

// edit and delete function 
function commonAddClick(elem1, elem2, tabTd) {
    //edit button 
    elem1.click(function () {
        if ($(this).hasClass("fa-pencil")) {
            $(this).removeClass("fa-pencil").addClass("fa-check")
                .parent().children(".js_editInput").prop("readonly", false).focus();
        } else {
            $(this).removeClass("fa-check").addClass("fa-pencil")
                .parent().children(".js_editInput").prop("readonly", true);
        }
    })
    //delete button click function
    elem2.click(function () {
        var deletrB = $(this).closest("table")
        $(this).parent().parent().remove();
        tdSort(deletrB.find("tr td:first-child"));
    })
}
// add function   ( department and person table) 
function addFunc(inputId, tabId) {
    tabId.append("\
        <tr>\
        <td> </td> \
        <td>\
        <input class='js_editInput' readonly value=''>\
        <i class='js_editButton fa fa-pencil'></i>\
        <i class='js_deleteButton fa fa-trash-o'></i>\
        </td>\
        </tr>"
    );
    tabId.find("tr:last-child .js_editInput").val(inputId.val())
    inputId.val("");
}

//for table first td sort  ( department and person table) 
function tdSort(tabTd) {
    tabTd.each(function () {
        var tdIndex = tabTd.index($(this));
        $(this).text(tdIndex + 1);
    });
}

//---------------------------------   page 3   -------------------------
// ***working hour icon
$(".js_icon").click(function () {
    if ($(this).hasClass("fa-window-close")) {
        $(this).removeClass("fa-window-close")
            .parent().children(".js_changeInput").addClass("active")
            .parent().children(".spanText").removeClass("active");
    } else {
        $(this).addClass("fa-window-close")
            .parent().children(".js_changeInput").removeClass("active")
            .parent().children(".spanText").addClass("active");
    }
});

//   active   day 
$(".switch").click(function () {
    if ($(this).children("input").is(':checked')) {
        $(this).parent().children(".spanText").css("display", "none")
            .parent().children(".timeInput").fadeIn();
    } else {
        $(this).parent().children(".timeInput").css("display", "none")
            .parent().children(".spanText").fadeIn();
    }
})

// common input value  equalize 
$($(".iconSpan")).click(function () {
    $(".iconSpan").removeClass("opacitySpan")
    if ($(".iconSpan").index($(this)) == 0) {
        for (var i = 0; i < $(".time_input").length; i++) {
            switch (i % 4) {
                case 0:
                    $($(".time_input")[i]).val($($(".time_input")[0]).val())
                    break;
                case 1:
                    $($(".time_input")[i]).val($($(".time_input")[1]).val())
                    break;
                default:
                    break;
            }
        }
    }
    else if ($(".iconSpan").index($(this)) == 1) {
        for (var i = 0; i < $(".time_input").length; i++) {
            switch (i % 4) {
                case 2:
                    $($(".time_input")[i]).val($($(".time_input")[2]).val())
                    break;
                case 3:
                    $($(".time_input")[i]).val($($(".time_input")[3]).val())
                    break;
                default:
                    break;
            }
        }
    }
    else if ($(".iconSpan").index($(this)) == 2) {
        var j = 0;
        var sumTime1 = 0;
        var sumTime2 = 0;
        var check = false;
        for (var i = 0; i < $(".workTime").length; i) {
            for (; j < $(".time_input").length; j++) {
                if (j % 2 == 0) {
                    sumTime1 = parseInt($($(".time_input")[j]).val()[0] + $($(".time_input")[j]).val()[1])
                }
                else {
                    if (parseInt($($(".time_input")[j]).val()[0] + $($(".time_input")[j]).val()[1]) < sumTime1) {
                        check = true;
                    }
                    if (j % 4 == 3) {
                        sumTime2 -= parseInt($($(".time_input")[j]).val()[0] + $($(".time_input")[j]).val()[1]) - sumTime1;
                    }
                    else {
                        sumTime2 = parseInt($($(".time_input")[j]).val()[0] + $($(".time_input")[j]).val()[1]) - sumTime1;
                    }
                }
                if (j % 4 == 3) {
                    if (sumTime2 < 0) {
                        sumTime2 = 0;
                    }
                    $($(".workTime")[i]).text(sumTime2)
                    i++;
                    sumTime2 = 0;
                }
            }
            if (check) {
                alert("Zaman aralığın düzgün daxil edin");
                $(".workTime").text("-");
                break;
            }
        }
    }
})

$(".time_input").focus(function () {
    $(".iconSpan").addClass("opacitySpan")
});