/**
 * Created by yw on 3/18/16.
 */
var READER;
/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        READER = new FileReader();
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

/**
 * read text input
 */
function readText(filePath) {
    var output = "";
    if(filePath.files && filePath.files[0]) {
        READER.onload = function (e) {
            output = e.target.result;
            displayContents(output);
        };
        READER.readAsText(filePath.files[0]);
    }
    else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
        try {
            READER = new ActiveXObject("Scripting.FileSystemObject");
            var file = READER.OpenTextFile(filePath, 1); //ActiveX File Object
            output = file.ReadAll(); //text contents of file
            file.Close();              //close file "input stream"
            displayContents(output);
        } catch (e) {
            if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' +
                    'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                    'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
            }
        }
    }
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }
    return true;
}

/**
 * display content using a basic HTML replacement
 */
function displayContents(txt) {
    loading.show();
    setTimeout(function(){drawChart.draw(txt)}, 300);
}