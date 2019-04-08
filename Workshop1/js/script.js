
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];

// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }

}

$(function () {
    loadBookData();
});
var inputbookname;
var addwindow = $("#insbk");

$(document).ready(function () {
    $("#book_category").kendoDropDownList();
    $("#bought_datepicker").kendoDatePicker();
    $("#delivered_datepicker").kendoDatePicker();
    $("#book_price").kendoNumericTextBox();
    $("#book_amount").kendoNumericTextBox();




    addwindow.kendoWindow({
       
        width:"600",
        title:"新增書籍",
        actions: [
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center().close();
    
    // $("#res").kendoButton(); /*測試功能*/
    // $("#Disable").kendoButton(); /*測試功能*/
    // $("#Enable").kendoButton(); /*測試功能*/

    $("#book_grid").kendoGrid({

        toolbar: kendo.template($("#template").html()),

        dataSource:
        {
            data: bookDataFromLocalStorage,
        },

        height: 600,
        sortable: true,/*允許排序*/

        pageable: {
            input: true,
            numeric: false,/*跳轉頁面按鈕*/
            pageSize: 20,
            messages: {
                page: "頁",
                of: "共 {0}",
                display: "顯示條目 {0}-{1} 共 {2}"
            }
        },
        columns: [
            {
                // command: [{name:"刪除",click: function (e) {"destroy"} }],width:20
                command: [{ name: "destroy", text: "刪除" }], width: 21
            },

            {
                field: "BookId",
                title: "書籍<br>編號",
                width: 15
            },

            {
                field: "BookName",
                title: "書籍<br>名稱",
                width: 45
            },
            {
                field: "BookCategory",
                title: "書籍<br>種類",
                values: [
                    /*書籍種類顯示中文*/
                    { text: "資料庫", value: "database", src: "image/database.jpg" },
                    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
                    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
                    { text: "家庭保健", value: "home", src: "image/home.jpg" },
                    { text: "語言", value: "language", src: "image/language.jpg" }],
                /*書籍種類顯示中文參考資料https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.values*/
                css: "right-align",
                width: 20
            },
            {
                field: "BookAuthor",
                title: "作者",
                width: 25
            },
            {
                field: "BookBoughtDate",
                title: "購買<br>日期",
                width: 15,
                format: "{0:yyyy-MM-dd}"
            },
            {
                field: "BookDeliveredDate",
                title: "送達<br>狀態",
                width: 15,
               
            },
            {
                field: "BookPrice",
                title: "金額",
                width: 15,
                format: "{0:N0}",/*千分位,三位一撇https://docs.microsoft.com/zh-tw/dotnet/standard/base-types/standard-numeric-format-strings*/
                attributes: { "class": "right-align", style: "text-align: right" }/*靠右顯示*/
            },
            {
                field: "BookAmount",
                title: "數量",
                width: 15,
                format: "{0:N0}",
                attributes: { "class": "right-align", style: "text-align: right" }/*靠右顯示*/
            },
            {

                field: "BookTotal",
                title: "總計",
                width: 20,
                format: "{0:N0}元",
                attributes: { "class": "right-align", style: "text-align: right" }

            }],
        editable: {/*刪除時給訊息https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/editable.confirmation*/
            confirmation: function (e) {
                return "確定刪除「" + e.BookName + "」嗎?";
            }
        },
        //dataBound: OndataBound

    });

    $("#slcbook").on("input", function () { /* 取得輸入資料*/
        inputbookname = $(this).val();
        $("#h1_text").text(inputbookname);
        alert(inputbookname);
    });
     
});

// function OndataBound(e) {
//     var grid = $('#book_grid').data('kendoGrid');

//     grid.tbody.find('>tr').each(function () {
//         var dataItem = grid.dataItem(this);   
            
//             $(this).find('>td').each(function(){
//               if(this.innerText==' '){
//                   $(this).addClass('fas fa-wheelchair');
//                     alert(this.innerText);}
//               else (this.innerText=='')
//                   $(this).addClass('');
//             });               

//     })
// }



function onClose(){
    $("#add_book").fadeIn();
    // $("#add_book").enable(true);
}

/* 新增書籍Button*/
$("#add_book").click(function(){
    addwindow.data("kendoWindow").open();
    $("#add_b；ook").fadeOut();
    // $("#add_book").enable(false);
});



// $("#res").click(function () {/*輸入欄清空*/
//     $("#inpt").val("");
// });

// $("#inpt").on("input", function () { /*輸入文字連動顯示*/
//      bkn = $("slcbook").val();
//     $("#h1_text").text($(this).val());

// });

// $("#Disable").click(function () {/*禁用按鈕*/
//     $("#Disable").data("kendoButton").enable(false);
//     alert(bkn);
// });
// $("#Enable").click(function () {/*啟用按鈕*/
//     $("#Disable").data("kendoButton").enable(true);
// });

//$(".demo-input").on("input", function () { $("#h1_text").text($(this).val()); });

// var aler = function(){ /*設變數以開啟函數*/
// alert("123");
// };




/*https://blog.darkthread.net/blog/kendo-ui-grid/ */