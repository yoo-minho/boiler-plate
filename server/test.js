function getList(){

    //...100줄

    var _PG_NO = 1;
    var _PG_PER_CNT = 20;

    var b_dev = true;

    //... 300줄

    if(b_dev){
        _PG_NO = 1;
        _PG_PER_CNT = 30;
    } else{
        //done
    }

    //... 50줄

    $.ajax({
        url:'/FLOW_API.act',
        async:true,
        type:'POST', 
        data: {
            pgNo:_PG_NO,
            pgPerCnt:_PG_PER_CNT
        },// 전송할 데이터
        dataType:'json',
        beforeSend:function(jqXHR) {},
        success:function(jqXHR) {},
        error:function(jqXHR) {},
        complete:function(jqXHR) {}
    });

}