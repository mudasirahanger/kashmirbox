jQuery(document).ready(function(n){function e(n){return(n=parseInt(n))>=0&&n<=9?"0"+n:n}function t(n){return n?e(23-n.getHours())+" : "+e(59-n.getMinutes())+" : "+e(59-n.getSeconds()):""}setInterval(function(){n("#deal-countdown").html(t(new Date))},1e3)});
//# sourceMappingURL=home.js.map
