import qs from 'querystring'

$(function () {
    $.Grid();
})

import {setGrim} from "../plugin/utils"

$.extend($, {
    Grid(){
        $("#Grim>li").each(function(i,o){
            $(o).css(setGrim(i+1));
        })
    },
    utils:{
        qs
    }
})

