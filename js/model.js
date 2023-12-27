let jsonData;
let getFilesData = function(){
    let activeFile = "/save/active.json";

    $.ajax({
        url: activeFile,
        type: "GET",
        async: false, // Set async to false for synchronous request
        success: function(data) {
            // Modify the variable inside the callback
            jsonData = data;
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });
}