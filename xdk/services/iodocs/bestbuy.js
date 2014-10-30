(function (credentials, helpers) {
  var exports = {};
  var baseUrl="http://api.remix.bestbuy.com/v1/";
  var endUrl="?format=json&show=sku,name,salePrice&apiKey="+credentials.apiKey;
  /* Data Feed Function */
  exports.search = function (params) {
    var url=makeUrl("products","(manufacturer="+params.manufacturer+")");

    return $.ajax({url: url});
  };

  exports.productInfo = function(params){
    var url=makeUrl("products","/"+params.sku);
    url=url.replace("?format=json&",".json?");
    return $.ajax({url: url});
  };

  exports.reviews = function (params) {
    var url=makeUrl("reviews","(sku="+params.sku+")");
    url=url.replace("&show=sku,name,salePrice","&show=all");
    return $.ajax({url: url});
  };


  function makeUrl(apiCall,params){
    return baseUrl+apiCall+params+endUrl;
  }
  return exports;
})