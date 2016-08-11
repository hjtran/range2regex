function split_to_patterns(min, max) {
    patterns = new Array();

    var start = min;
    var stops = split_to_ranges(min,max);
    for (var i=0;i<stops.length;i++){
        patterns.push( range_to_pattern(start,stops[i]) );
        start = stops[i] + 1;
    }
    return patterns;

}

function split_to_ranges(min, max){
    var stops = [max];

    var nines_count = 1;
    var stop = fill_by_nines(min, nines_count);
    while (min <= stop && stop < max) {
        stops.push( stop );

        nines_count += 1;
        stop = fill_by_nines(min, nines_count);
        console.log(stops);
    }

    var zeros_count = 1;
    stop = fill_by_zeros(max+1, zeros_count) - 1;
    while (min < stop && stop <= max) {
        stops.push(stop);

        zeros_count += 1;
        stop = fill_by_zeros(max+1, zeros_count) - 1;
    }
    stops_with_dupes = stops.sort(function(a,b){return a-b});

    // remove duplicates and return
    stops = [stops_with_dupes[0]];
    for (var i = 1; i < stops_with_dupes.length; i++) {
        if (stops[ stops.length-1 ] != stops_with_dupes[i])
            stops.push(stops_with_dupes[i]);
    }

    return stops;

}

function fill_by_nines(integer, nines_count){
    var ret_string = integer.toString().slice(0,integer.toString().length-nines_count);
    for (var i = 0; i < nines_count; i++) {
        ret_string += '9';
    }
    return parseInt(ret_string);
}

function fill_by_zeros(integer, zeros_count){
    return integer - ( integer % ( Math.pow(10,zeros_count) ) );
}

function range_to_pattern(start, stop) {
    var start_str = start.toString();
    var stop_str = stop.toString();
    var pattern = '';
    var any_digit_count = 0

    for (var i=0; i<start_str.length; i++) {
        if (start_str[i] == stop_str[i]) {
            pattern += start_str[i];
        }
        else if (start_str[i] != '0' || stop_str[i] != '9') {
            pattern += '[' + start_str[i] + '-' + stop_str[i] + ']';
        }
        else {
            any_digit_count += 1;
        }
    }
    
    for (var i=0; i<any_digit_count; i++){
        pattern += '\\d';
    }
    return pattern;
}
