document.addEventListener("deviceready",function(){
    intel.xdk.device.hideSplashScreen();


});

$.ui.ready(function(){
    //doSearch("Intel");
});


function doSearch(man){
    intel.xdk.services.bestbuysearch({"manufacturer":man})
  .then(function (response) {
    var data=response.products;
    var html="";

    for(var i=0;i<data.length;i++){
      html+="<li><a href='#info/"+data[i].sku+"'>"+data[i].name+"</a></li>";
    }
    $("#plist").html(html);

  });
}

$("#searcher").on("click",function(){

    doSearch($("#manval").val());
});

$("#info").on("loadpanel",function(e){
    $.ui.showMask("Loading...");
    var sku=document.location.hash.toString();
    sku=sku.replace("#info/","");
    intel.xdk.services.bestbuyproductInfo({"sku":sku})
    .then(function (response) {

        $("#ptitle").html(response.name);
        $("#pcost").html("$"+response.salePrice);
        $("#psku").html("SKU: "+response.sku);
        //load reviews

        intel.xdk.services.bestbuyreviews({"sku":sku})
        .then(function (resp2) {
             if(resp2.reviews.length===0){
                $("#reviews").html("No Reviews");
                return;
             }
             var html="";
             for(var i=0;i<resp2.reviews.length;i++){
                var info=resp2.reviews[i];
                html+="<b>"+info.reviewer[0].name+" ("+info.title+")</b><br><br>";
                html+="Rating: "+info.rating+"<br><br>";
                html+=info.comment+"<hr>";
             }
             $("#reviews").html(html);
             $.ui.hideMask();
        });

    });
    setTimeout(function(){
        $.ui.hideMask();
    },3000);
     $.ui.scrollingDivs['info'].scrollToTop();
});
alert("parsed or something");