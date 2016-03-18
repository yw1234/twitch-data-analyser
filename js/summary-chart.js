/**
 * Created by yw on 3/15/16.
 */
var monthMap = {"Jan":0, "Feb":1, "Mar":2, "Apr":3, "May":4, "June":5,
    "July":6, "Aug":7, "Sept":8, "Oct":9, "Nov":10, "Dec":11};

var DATASET = [];

google.charts.load('current', {'packages':['annotationchart']});

var drawChart = {
    draw : function(dataset){
        var lines = dataset.split("\n")
        for(var i = 0 ; i < lines.length; i++){
            var sub_res = [];

            var line = lines[i].split("\t"),
                channels = line[0],
                viewers = line[1],
                date = line[2];

            sub_res.push(parseDate(date));
            sub_res.push(Number(channels));
            sub_res.push(Number(viewers));

            DATASET.push(sub_res);
        }

        this._doDraw();
    },
    _doDraw : function () {
        var c_data = new google.visualization.DataTable(), v_data = new google.visualization.DataTable();

        c_data.addColumn('date', 'Date');
        c_data.addColumn('number', 'Channels');

        v_data.addColumn('date', 'Date');
        v_data.addColumn('number', 'Viewers');

        var channels_data = [], viewers_data = [];
        for(var i = 0; i < DATASET.length; i++){
            var channel_elem = [], viewer_elem = [];

            channel_elem.push(DATASET[i][0]);
            channel_elem.push(DATASET[i][1]);
            channels_data.push(channel_elem);

            viewer_elem.push(DATASET[i][0]);
            viewer_elem.push(DATASET[i][2]);
            viewers_data.push(viewer_elem);
        }

        c_data.addRows(channels_data);
        v_data.addRows(viewers_data);

        var c_chart = new google.visualization.AnnotationChart(document.getElementById('chart_div_channels')),
            v_chart = new google.visualization.AnnotationChart(document.getElementById('chart_div_viewers'));

        c_chart.draw(c_data, {
            displayAnnotations: true
        });

        v_chart.draw(v_data, {
            displayAnnotations: true,colors: ['red']
        });

        loading.hide();
    }
}

function parseDate(date){
    var details = String(date).split(" ");

    var w = details[0],
        m = details[1],
        d = details[2],
        T = details[3],
        y = details[5];

    var time = String(T).split(":"),
        hh = time[0],
        mm = time[1];

    return new Date(y, monthMap[m], d, hh, mm);
}

var loading = {
    show: function(){
        $("#loading").show();
    },
    hide: function(){
        $("#loading").hide();
    }
};