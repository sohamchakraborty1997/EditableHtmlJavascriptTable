/*Adding buttons to all rows of the corresponding table*/
$(document).ready(function(){
    $('.editTable thead tr').append('<th id="buttonOptions">Options</th>')
    $('.editTable tbody tr').each(function(){
        $(this).append('<td class="buttons"><button class="btn btn-success add">+</button>&nbsp;<button class="btn btn-info edit">Edit</button>&nbsp;<button class="btn btn-danger delete">-</button>&nbsp;<button class="btn btn-primary done">Done</button></td>')
    })
})

/*On Editing*/
$(document).on("click",".edit",function(){
    let clicked_row = $(this).parent().parent();
    $(clicked_row).css('textarea','margin')
    $(clicked_row).find('td').each(function(){
        if($(this).attr("class")===undefined)
            $(this).replaceWith($('<textarea cols="28" style="margin:5px">'+this.innerHTML+'</textarea>&nbsp;&nbsp;'))
    })
    $(this).css('display','none')
    $(this).parent().find('.done').css('display','block')
    $(this).parent().find('.add').css('display','none')
    $(this).parent().find('.delete').css('display','none')
})

/*On Completion of Editing*/
$(document).on("click",".done",function(){
    let clicked_row = $(this).parent().parent();
    $(clicked_row).find('textarea').each(function(){
        if($(this).attr("class")===undefined){
            let data = $(this).val()
            $(this).replaceWith($('<td>'+data+'</td>'))
        }
    })
    $(this).css('display','none')
    $(this).parent().find('.add').css('display','inline')
    $(this).parent().find('.edit').css('display','inline')
    $(this).parent().find('.delete').css('display','inline')
})





/*Maintain sequence of any column with serials*/
function autoSequence(col_index){
    let counter = 1;
    $('.editTable tbody tr').each(function(){
        let each_row = $(this).find(':nth-child('+col_index+')')[0]
        $(each_row).html(counter);
        counter++;
    })
}




/*Deleting Row*/
$(document).on('click','.delete',function(){
    let clicked_row = $(this).parent().parent();
    $(clicked_row).fadeOut(250,function(){
        $(clicked_row).remove();
    })
    setTimeout(function(){
        autoSequence(col_index);
    },280)
})






$(document).on('click','.add',function(){
    let clicked_row = $(this).parent().parent();
    let html_string = "<tr>"
    let num_of_cols = $('.editTable thead tr th').length;
    for(let i=0;i<num_of_cols-1;i++)
        html_string += "<td></td>"
    html_string += '<td class="buttons"><button class="btn btn-success add">+</button>&nbsp;<button class="btn btn-info edit">Edit</button>&nbsp;<button class="btn btn-danger delete">-</button>&nbsp;<button class="btn btn-primary done">Done</button></td>'
    let new_row = $(html_string)
    $(clicked_row).after(new_row)
    autoSequence(col_index);
})